// import * as constant from "../constant";
const apiKey = "BN9DWbX52YhckOSzkE6A8MM73TgemvrP";
const endpoint = `https://eth-rinkeby.alchemyapi.io/v2/${apiKey}`;

export const fetchNFTs = async (owner, contractAddress, retryAttempt) => {
    console.log(`fetchNFTs: ${owner} ${contractAddress} ${retryAttempt}`);
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`)
                    .then(data => data.json());

            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`)
                    .then(data => data.json());
            }
        } catch (e) {
            console.log(e);
        }
        return data
    }
}

