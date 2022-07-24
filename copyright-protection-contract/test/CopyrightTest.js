const {expect} = require("chai");
const {parseEther} = require('ethers/lib/utils');
const {waffle, ethers} = require("hardhat");

describe("Copyright contract", function () {
    let Copyright;
    let copyrightContract;
    let owner;
    let user1;
    let user2;
    let addrs;

    beforeEach(async function () {
        // Setup some wallet
        [owner, user1, user2, ...addrs] = await ethers.getSigners();

        // Create the Copyright contract
        Copyright = await ethers.getContractFactory("Copyright", owner);
        copyrightContract = await Copyright.deploy();
    });

    describe("Check default value at deployement", function () {


        it("Total covers should be 0", async function () {
            expect(await copyrightContract.numCovers()).to.equal(0);
        });

        it("Total chapters should be 0", async function () {
            expect(await copyrightContract.numChapters()).to.equal(0);
        });
    })

    describe("Check cover creation", function () {
        it("Should create a new cover", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            expect(await copyrightContract.numCovers()).to.equal(1);
        }).timeout(10000);

        it("Should get specific cover", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            expect(await copyrightContract.getCopyright(0)).to.be.an("array").that.include("Test cover");
        }).timeout(10000);

        it("Should get all covers", async function () {
            for (let i = 0; i < 10; i++) {
                await copyrightContract.createCopyright(`Test cover ${i}`, "Test author");
            }
            expect(await copyrightContract.numCovers()).to.equal(10);
            expect(await copyrightContract.getAllCoypright()).to.have.lengthOf(10);
            expect(await copyrightContract.getCopyright(6)).to.be.an("array").that.include("Test cover 6");
        });

        it("Should only return covers created by owner", async function () {
            for (let i = 0; i < 5; i++) {
                await copyrightContract.createCopyright(`Test cover ${i}`, "Test author");
            }
            expect(await copyrightContract.getAuthorCover()).to.have.lengthOf(5);
        });

        it("Should not return covers not created by owner", async function () {
            await copyrightContract.connect(user1).createCopyright("Test cover", "Test author");
            expect(await copyrightContract.getAuthorCover()).to.have.lengthOf(0);
        });

        it("Should allow owner to update cover", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            await copyrightContract.connect(owner).updateCover(0, "Test cover updated", "Test author updated");
            expect(await copyrightContract.getCopyright(0)).to.be.an("array").that.include("Test cover updated");
        });

        it("Should not allow non-owner to update cover", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            await expect(
                copyrightContract.connect(user1).updateCover(0, "Test cover updated", "Test author updated")
            ).to.be.revertedWith("Caller is not the owner");
        });

    });

    describe("Check chapter creation", function () {
        it("Should create a new chapter", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            await copyrightContract.createChapter(0, "Test chapter", "Test author");
            expect(await copyrightContract.numChapters()).to.equal(1);
        }).timeout(10000);

        it("Should get specific chapter", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            await copyrightContract.createChapter(0, "Test chapter", "Test author");
            expect(await copyrightContract.getChapter(0)).to.be.an("array").that.include("Test chapter");
        });

        it("Should get all chapters", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            for (let i = 0; i < 10; i++) {
                await copyrightContract.createChapter(0, `Test chapter ${i}`, "Test author");
            }
            expect(await copyrightContract.numChapters()).to.equal(10);
            expect(await copyrightContract.getChapters(0)).to.have.lengthOf(10);
        });

        it("Should only allow owner to create chapter", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            await expect(
                copyrightContract.connect(user1).createChapter(0, "Test chapter", "Test author")
            ).to.be.revertedWith("Caller is not the owner");
        });

        it("Should only allow owner to update chapter", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            await copyrightContract.createChapter(0, "Test chapter", "Test author");
            await  copyrightContract.updateChapter(0, "Test chapter updated", "Test author updated");
            expect(await copyrightContract.getChapter(0)).to.be.an("array").to.include.members(["Test chapter updated", "Test author updated"]);
        });

        it("Should only allow owner to update chapter", async function () {
            await copyrightContract.createCopyright("Test cover", "Test author");
            await copyrightContract.createChapter(0, "Test chapter", "Test author");
            await expect(
                copyrightContract.connect(user1).updateChapter(0, "Test chapter updated", "Test author updated")
            ).to.be.revertedWith("Caller is not the owner");
        });
    });
});
