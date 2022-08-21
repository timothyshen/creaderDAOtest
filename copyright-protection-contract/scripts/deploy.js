// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });

async function NFTcontract() {
    const metadata = "ipfs://bafkreihdl5mexbqpc7yn5bcjfd7qdzqtoicynujp3gfvbhpvusdua3quue"
    const ContractFactory = await hre.ethers.getContractFactory("NewCopyright");
    const contract = await ContractFactory.deploy(metadata,"CreaderDAO Copyright", "CRD");
    const address = contract.address;
    await contract.deployed();
    console.log("Copyright NFT contract address: " + address);
    fs.copyFileSync(
        path.join(__dirname, "../artifacts/contracts/" + "NewCopyright" + ".sol/" + "NewCopyright" + ".json"), //source
        path.join(__dirname, "../../copyright-protection-frontend/src/api/" + "NewCopyright" + ".json") // destination
    );
    return address;
}

async function AccessToken(nftAddress) {
    const metadata = "ipfs://bafkreihdl5mexbqpc7yn5bcjfd7qdzqtoicynujp3gfvbhpvusdua3quue"
    const ContractFactory = await hre.ethers.getContractFactory("AccessToken");
    const contract = await ContractFactory.deploy(nftAddress, metadata,"CreaderDAOAccess", "CRDAT");
    const address = contract.address;
    await contract.deployed();
    console.log("AccessToken NFT contract address: " + address);
    fs.copyFileSync(
        path.join(__dirname, "../artifacts/contracts/" + "AccessToken" + ".sol/" + "AccessToken" + ".json"), //source
        path.join(__dirname, "../../copyright-protection-frontend/src/api/" + "AccessToken" + ".json") // destination
    );

    await sleep(30000);

    // Verify the contract after deploying
    await hre.run("verify:verify", {
        address: contract.address,
        constructorArguments: [nftAddress, metadata,"CreaderDAOAccess", "CRDAT"],
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    let NFTaddress = await NFTcontract();
    await AccessToken(NFTaddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
