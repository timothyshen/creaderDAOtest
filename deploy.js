const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./complier');

const provider = HDWalletProvider(
    'xxx',
        ''
);

const web3 = new Web3(provider);

const deploy = async () =>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [''] })
        .send({gas: '1000000', from: accounts[0]});
    
};
deploy()
