// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./NewCopyright.sol";
import "hardhat/console.sol";

contract AccessToken is ERC721URIStorage, ERC721Enumerable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private copyrightContract;
    string private coverTitle;

    // ============ Structs ============

    struct Membership {
        uint256 id;
        uint256 coverId;
        // The maximum number of tokens that can be sold.
        uint256 quantity;
        // The price at which each token will be sold, in ETH.
        uint256 price;
        // The number of tokens sold so far.
        uint256 numSold;
        // The account that will receive sales revenue.
        address payable fundingRecipient;

    }

    // ============ Immutable Storage ============
    // The URI for the API that serves the content for each token.
    // Note: Strings cannot be literally immutable.
    string internal baseURI;

    // ============ Mutable Storage ============
    // Mapping of membership id to descriptive data.
    mapping(uint256 => Membership) public memberships;
    // Mapping of token id to membership id.
    mapping(uint256 => uint256) public tokenToMembership;

    // The amount of funds that have already been withdrawn for a given cover.
    mapping(uint256 => uint256) public withdrawnForMembership;
    // Membership start at 1, in order that unsold tokens don't map to the first cover.
    uint256 private nextMembershipId = 1;

    // ============ Events ============

    event MembershipCreated(
        uint256 quantity,
        uint256 price,
        address fundingRecipient,
        uint256 indexed MembershipId
    );

    event MembershipPurchased(
        uint256 indexed MembershipId,
        uint256 indexed tokenId,
    // `numSold` at time of purchase represents the "serial number" of the NFT.
        uint256 numSold,
    // The account that paid for and received the NFT.
        address indexed buyer
    );
    // ============ modifier ============
    modifier correctId(uint id, uint256 _tokenId) {
        require(id <= memberships[_tokenId].numSold && id > 0, "Invalid id");
        _;
    }
    modifier OnlyOwner(uint256 _id) {
        NewCopyright _newCopyright = NewCopyright(copyrightContract);
        address ownerOfCover = _newCopyright.getAuthor(_id);
        require( ownerOfCover == msg.sender, "Caller is not the owner");
        _;
    }
    // ============ Constructor ============

    constructor( address _copyrightContract, string memory baseURI_, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        baseURI = baseURI_;
        copyrightContract = _copyrightContract;
    }

    // ============ Cover Methods ============

    function createMemberships(
        uint256 coverId,
    // The number of tokens that can be minted and sold.
        uint256 quantity,
    // The price to purchase a token.
        uint256 price,
    // The account that should receive the revenue.
        address payable fundingRecipient
    ) external OnlyOwner(coverId) {
        /*
        Create a new membership.
        */
        require(quantity > 0, "Quantity must be greater than 0");
        require(price > 0, "Price must be greater than 0");
        require(fundingRecipient != address(0), "Recipient must be non-zero address");

        memberships[nextMembershipId] = Membership({
        id : nextMembershipId,
        coverId : coverId,
        quantity : quantity,
        price : price,
        fundingRecipient : fundingRecipient,
        numSold : 0
        });

        emit MembershipCreated(quantity, price, fundingRecipient, nextMembershipId);

        nextMembershipId++;
    }


    function buyMembership(uint256 membershipId) external payable {
        /* Purchase the membership. */
        // Check that the membership exists. Note: this is redundant
        // with the next check, but it is useful for clearer error messaging.
        require(memberships[membershipId].quantity > 0, "Membership does not exist");
        // Check that there are still tokens available to purchase.
        require(
            memberships[membershipId].numSold < memberships[membershipId].quantity,
            "This membership is already sold out."
        );
        // Check that the sender is paying the correct amount.
        require(
            msg.value == memberships[membershipId].price,
            "Must send enough to purchase the membership."
        );
        NewCopyright _newCopyright = NewCopyright(copyrightContract);
        coverTitle = _newCopyright.getTitle(memberships[membershipId].coverId);

        uint256 newTokenId = _tokenIds.current();
        _tokenIds.increment();
        // Increment the number of tokens sold for this membership.
        memberships[membershipId].numSold++;
        // Mint a new token for the sender, using the `_tokenIds`.
        _safeMint(msg.sender, newTokenId);
        // Store the mapping of token id to the membership being purchased.
        tokenToMembership[newTokenId] = membershipId;

        _setTokenURI(newTokenId, getTokenURI(newTokenId));
        // set token URI
        emit MembershipPurchased(
            membershipId,
            newTokenId, memberships[membershipId].numSold,
            msg.sender
        );

    }

    // ============ Operational Methods ============

    function withdrawFunds(uint256 membershipId) external {
        // Compute the amount available for withdrawing from this membership.
        uint256 remainingForMembership =
        // Compute total amount of revenue that has been generated for the membership so far.
        (memberships[membershipId].price * memberships[membershipId].numSold) -
        // Subtract the amount that has already been withdrawn.
        withdrawnForMembership[membershipId];

        // Update that amount that has already been withdrawn for the membership.
        withdrawnForMembership[membershipId] += remainingForMembership;
        // Send the amount that was remaining for the membership, to the funding recipient.
        _sendFunds(memberships[membershipId].fundingRecipient, remainingForMembership);
    }


    // ============ NFT Methods ============

    function getMembership(uint _coverId) public view returns (Membership memory) {
        /*
        * @dev Get membership of a cover
        * @param _coverId The id of the cover
        * @return Membership
        */
        Membership memory membership;
        for (uint i = 1; i < nextMembershipId; i++) {
            if (memberships[i].coverId == _coverId) {
                membership = memberships[i];
            }
        }
        return membership;
    }


    function totalSupply(uint id) public view returns (uint256) {
        /*
        * @dev Get total supply of a specific membership
        * @param id The id of the membership
        * @return uint256 total supply for a specific membership
        */
        return memberships[id].quantity;
    }

    function isOwner(address _owner, uint _coverId) public view returns (bool) {
        /*
        * @dev Check if an address is the owner of a cover
        * @param _owner The address of the owner
        * @param _coverId The id of the cover
        * @return bool
        */
        uint256 membershipId = getMembership(_coverId).id;
        uint256 totalIdCount = _tokenIds.current();
        for (uint i = 0; i < totalIdCount; i++) {
            if (tokenToMembership[i] == membershipId && _owner == ownerOf(i)) {
                return true;
            }
        }
        return false;
    }

    function generateMembershipImage(uint256 _tokenId) public view returns (string memory) {
        /*
        * @dev Generate a membership image
        * @param _tokenId The id of the token
        * @return string Encoded image abi
        */
        bytes memory MembershipImage = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',"Title: ", coverTitle ,'</text>',
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">', "Membership ID: #", _tokenId.toString() ,'</text>',
            '</svg>'
        );
        console.log("MembershipImage", string(MembershipImage));
        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(MembershipImage))
        );
    }

    function getTokenURI(uint tokenId) public view returns (string memory) {
        /*
        * @dev Get token URI
        * @param tokenId The id of the token
        * @return string Token URI
        */
        uint quality = memberships[tokenToMembership[tokenId]].quantity;
        bytes memory dataURI = abi.encodePacked(
            '{',
            '"name": "Membership ', coverTitle, ' #', tokenId.toString(), '",',
            '"description": "This is a collection of ',quality,' NFT for book ',coverTitle,' mainly to represent early contributors and early supports. With the token you can freely access the book and other loyalty benefits",',
            '"image": "', generateMembershipImage(tokenId), '"',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    // ============ Private Methods ============

    function _sendFunds(address payable recipient, uint256 amount) private {
        require(
            address(this).balance >= amount,
            "Insufficient balance for send"
        );

        (bool success,) = recipient.call{value : amount}("");
        require(success, "Unable to send value: recipient may have reverted");
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
