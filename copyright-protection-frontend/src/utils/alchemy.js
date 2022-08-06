// import * as constant from "../constant";
import fetch from 'node-fetch';
const apiKey = "BN9DWbX52YhckOSzkE6A8MM73TgemvrP";
const endpoint = `https://eth-rinkeby.alchemyapi.io/v2/${apiKey}`;
export const fetchNFTs = async (owner, contractAddress, retryAttempt) => {
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`)
                    .then(data => data.json())
                    .then(data => JSON.stringify(data, null, 2))
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`)
                    .then(data => data.json())
                    .then(data => JSON.stringify(data, null, 2))
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            }
        } catch (e) {
            console.log(e);
        }
        return data
    }
}

