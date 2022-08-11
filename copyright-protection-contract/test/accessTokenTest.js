const {expect} = require("chai");
const {parseEther} = require('ethers/lib/utils');
const {waffle, ethers} = require("hardhat");
const hre = require("hardhat");


describe("Copyright contract", function () {
    let Membership;
    let membershipContract;
    let owner;
    let user1;
    let user2;
    let addrs;
    let metadata;

    beforeEach(async function () {
        // Setup some wallet
        [owner, user1, user2, ...addrs] = await ethers.getSigners();
        metadata = "ipfs://bafkreihdl5mexbqpc7yn5bcjfd7qdzqtoicynujp3gfvbhpvusdua3quue;"
        // Create the Copyright contract
        Membership = await ethers.getContractFactory("AccessToken", owner);
        membershipContract = await Membership.deploy(metadata, "CreaderDAOAccess", "CRDAT");

    });

    // describe("Check default value at deployement", function () {
    //     it("Total Membership should be 0", async function () {
    //         expect(membershipContract.memberships()).to.have.lengthOf(0);
    //     });
    //     it("BaseURI should be same as preset", async function () {
    //         expect(await membershipContract.contractURI()).to.include(metadata);
    //     });
    //
    //     it("Name should be same as preset", async function () {
    //         expect(await membershipContract.name()).to.equal("CreaderDAOAccess");
    //     });
    //
    //     it("Symbol should be same as preset", async function () {
    //         expect(await membershipContract.symbol()).to.equal("CRDAT");
    //     });
    //
    //     // it("Membership id should start from 1", async function () {
    //     //     expect(await membershipContract.nextMembershipId()).to.equal(1);
    //     // });
    //
    //
    // });

    describe("Check Membership creation", function () {
        // should create a new membership
        it("Should create a new membership", async function () {
            await membershipContract.createMemberships(1, 1000, 10000000, owner.address);
            expect(await membershipContract.memberships(1))
        });

        it("Should get specific membership", async function () {
            await membershipContract.createMemberships(1, 1000, 10000000, owner.address);
            console.log(await membershipContract.memberships(1));
            expect(await membershipContract.memberships(1)).to.be.an("array").that.include("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        });

        it("should get membership via cover", async function () {
            await membershipContract.createMemberships(1, 1000, 10000000, owner.address);
            expect(await membershipContract.getMembership(1)).to.be.an("array").that.include(owner.address);
        });

        it("should allow user to purchase membership", async function () {
            let etherUnit = parseEther("1");
            await membershipContract.createMemberships(1, 1000, etherUnit, owner.address);
            await membershipContract.connect(user1).buyMembership(1, {value: parseEther("1")});
            expect(await membershipContract.ownerOf(1)).is.equal(user1.address);
        });

        it("should prevent user purchase membership do not exists", async function () {
            await expect(membershipContract.connect(user1).buyMembership(1, {value: parseEther("1")}))
                .to.be.revertedWith("Membership does not exist");
        });

        it('should prevent user purchase membership when sold out', async function () {
            await membershipContract.createMemberships(1, 1000, etherUnit, owner.address);
            await membershipContract.connect(user1).buyMembership(1, {value: parseEther("1")});
            await expect(membershipContract.connect(user2).buyMembership(1, {value: parseEther("1")}))
                .to.be.revertedWith("This membership is already sold out");

        });

        it("should allow user to access after purchase", async function () {
            let etherUnit = parseEther("1");
            await membershipContract.createMemberships(1, 1000, etherUnit, owner.address);
            await membershipContract.connect(user1).buyMembership(1, {value: parseEther("1")});
            expect(await membershipContract.connect(user1).isOwner(1, user1.address)).to.be.true;
        });

    });
});
