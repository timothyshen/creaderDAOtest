# Copyright protection contract

This project contains all the code for runing and deploying the contract.

To start the project first run the following command.
```shell
npm install

```
Then run the following command to interact with hardhat. 
```shell
npx hardhat compile

npx hardhat test

npx hardhat run scripts/deploy.js

```
# File structure
## .env.example
The example file fore .env, this is a global environment configuration file for the project

## contracts
This folder contains all the contracts for the project

## scripts
This folder contains the deployment scripts operate by hardhat

## Test

This folder contains all the test cases for the contracts.
