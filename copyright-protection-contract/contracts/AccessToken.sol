// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";



contract AccessToken is ERC721 {


    // ============ Structs ============

    struct Membership {
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
    // Mapping of user id to token id.
    mapping(address => uint256) internal userToToken;
    // The amount of funds that have already been withdrawn for a given cover.
    mapping(uint256 => uint256) public withdrawnForMembership;
    // `nextTokenId` increments with each token purchased, globally across all covers.
    uint256 private nextTokenId;
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

    // ============ Constructor ============

    constructor(string memory baseURI_, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        baseURI = baseURI_;
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
    ) external {

        memberships[nextMembershipId] = Membership({
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
        // Increment the number of tokens sold for this membership.
        memberships[membershipId].numSold++;
        // Mint a new token for the sender, using the `nextTokenId`.
        _mint(msg.sender, nextTokenId);
        // Store the mapping of token id to the membership being purchased.
        tokenToMembership[nextTokenId] = membershipId;
        // Store the mapping of the sender to the token id.
        userToToken[msg.sender] = nextTokenId;

        emit MembershipPurchased(
            membershipId,
            nextTokenId, memberships[membershipId].numSold,
            msg.sender
        );

        nextTokenId++;
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

    // Returns e.g. https://creader.io/membership/[membershipId]/[tokenId]
    function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
    {
        // If the token does not map to an memberships, it'll be 0.
        require(tokenToMembership[tokenId] > 0, "Token has not been sold yet");
        // Concatenate the components, baseURI, membershipsId and tokenId, to create URI.
        return
        string(
            abi.encodePacked(
                baseURI,
                Strings.toString(tokenToMembership[tokenId]),
                "/",
                Strings.toString(tokenId)
            )
        );
    }

    // Returns e.g. https://creader.io/memberships/metadata
    function contractURI() public view returns (string memory) {
        // Concatenate the components, baseURI, membershipsId and tokenId, to create URI.
        return string(abi.encodePacked(baseURI, "metadata"));
    }

    function totalSupply(uint id) public view returns (uint256) {
        return memberships[id].quantity;
    }


   function checkOwnership(uint256 MembershipId, uint256 tokenId) public view returns (bool) {
        require(tokenToMembership[tokenId] == MembershipId, "Token has not been sold yet");
        return userToToken[msg.sender] == tokenId;
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
}
