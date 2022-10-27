require("dotenv").config({ path: ".env" });

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-ganache");


// const ALCHEMY_API_RINKEBY = process.env.ALCHEMY_API_KEY_URL_RINKEBY;
const ALCHEMY_API_MUMBAI = process.env.ALCHEMY_API_KEY_URL_MUMBAI;
const RINKEBY_PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGONSCAN_KEY = process.env.POLYGON_API_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: ALCHEMY_API_MUMBAI,
      accounts: [RINKEBY_PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD"
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_KEY
    }
  }
};
// rinkeby: {
//   url: process.env.ALCHEMY_API_KEY_URL_RINKEBY,
//       accounts: [process.env.PRIVATE_KEY]
// },

// networks: {
//   ganache: {
//     url:"HTTP://127.0.0.1:7545",
//         gasLimit: 6000000000,
//         defaultBalanceEther: 10
//   },
// //   rinkeby: {
// //   url: process.env.ALCHEMY_API_KEY_URL_RINKEBY,
// //       accounts: [process.env.PRIVATE_KEY]
// // },
//   mumbai: {
//     url: process.env.ALCHEMY_API_KEY_URL_MUMBAI,
//         accounts: [process.env.PRIVATE_KEY]
//   },
//   goerli: {
//     url: process.env.ALCHEMY_API_KEY_URL_GOERLI,
//         accounts: [process.env.PRIVATE_KEY]
//   }
// },
