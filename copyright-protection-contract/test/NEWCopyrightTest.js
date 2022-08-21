const {expect} = require("chai");
const {parseEther} = require('ethers/lib/utils');
const {waffle, ethers} = require("hardhat");
const hre = require("hardhat");
const {BigNumber} = require("ethers");

describe("New Copyright contract", function () {
    let contract;
    let copyrightContract;
    let owner;
    let user1;
    let user2;
    let addrs;
    const metadata = "ipfs://bafkreihdl5mexbqpc7yn5bcjfd7qdzqtoicynujp3gfvbhpvusdua3quue;"

    beforeEach(async function () {
        [owner, user1, user2, ...addrs] = await ethers.getSigners();
        const metadata = "ipfs://bafkreihdl5mexbqpc7yn5bcjfd7qdzqtoicynujp3gfvbhpvusdua3quue;"
        // Create the Copyright contract
        ContractFactory = await ethers.getContractFactory("NewCopyright", owner);
        contract = await ContractFactory.deploy(metadata, "CreaderDAO Copyright", "CRD");
    });

    describe("Check default value at deployment", function () {
        it("Total covers should be 0", async function () {
            expect(await contract._coverIds()).to.equal(BigNumber.from(0));
            console.log(await contract._coverIds());
        });

        it("Name should be same as preset", async function () {
           expect(await contract.name()).to.equal("CreaderDAO Copyright");
        });

        it("Symbol should be same as preset", async function () {
              expect(await contract.symbol()).to.equal("CRD");
        });

        it("Cover id should start from 1", async function () {
            expect(await contract._coverIds()).to.equal(0);
        });
    })

    describe("Check cover creation", function () {
        it("Should create a new cover", async function () {
            await contract.createCopyright("Test cover", "Test author", "Active");
            expect(await contract._coverIds()).to.equal(1);
            it("Should create a NFT", async function () {
                expect(await contract.tokenToCover(1)).to.equal(1);
            });
        });
        it("Should get specific cover", async function () {
            await contract.createCopyright("Test cover", "Test author", "Active");
            expect(await contract.getCover(1)).to.be.an("array").that.include("Test cover");
        });

        it("should get all covers", async function () {
            for (let i = 0; i < 10; i++) {
                await contract.createCopyright("Test cover", "Test author", "Active");
            }
            expect(await contract.getAllCoypright()).to.have.lengthOf(10);
        });

        it("should get all covers by author", async function () {
            for (let i = 0; i < 10; i++) {
                await contract.createCopyright("Test cover", "Test author", "Active");
                await contract.connect(user1).createCopyright("Test cover", "user1", "Active");
            }
            expect(await contract.getAuthorCover()).to.have.lengthOf(10);
        });

        it("should get all NFTs", async function () {
            await contract.createCopyright("Test cover", "Test author", "Active");
            await contract.createCopyright("cover", "author", "Active");
            expect(await contract.tokenURI(1)).to.exist;
        });

        it("should get cover by NFT id", async function () {
            await contract.createCopyright("Test cover", "Test author", "Active");
            await contract.createCopyright("cover", "author", "Active");
            expect(await contract.getCoverByToken(2)).to.be.an("array").that.include("cover");
        });
    });
});
