const {expect} = require("chai");
const {ethers} = require("hardhat");


// describe("Copyright", function () {
//     let copyright
//
//     let author;
//     let title
//     let shortDescription;
//     let longDescription;
//     let image;
//
//     beforeEach(async function () {
//         author = ethers.getSigner();
//         const CopyrightContract = await ethers.getContractFactory("Copyright");
//         copyright = await CopyrightContract.deploy();
//         await copyright.deployed();
//     });
//
//
//     describe("novel Creation", function () {
//         it("Should create a novel", async function () {
//             await expect(
//                 copyright.createNovel(
//                     title,
//                     image,
//                     shortDescription,
//                     longDescription,
//                 )
//             ).to.not.be.reverted;
//         });
//     });
//
//     describe("Get Author novel", function () {
//         it("Should get the novel", async function () {
//             await expect(copyright.getAuthorNovels(
//                     author.address,
//                     title
//                 )
//             ).to.not.be.reverted;
//         });
//     });
//
//     describe("Get all novel", function () {
//         it("Should get all novel", async function () {
//             await expect(copyright.getAllNovels(
//                     title,
//                 )
//             ).to.not.be.reverted;
//         })
//     });
// });
