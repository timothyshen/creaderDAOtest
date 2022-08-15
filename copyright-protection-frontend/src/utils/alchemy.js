// import * as constant from "../constant";

const endpoint = import.meta.env.VITE_ALCHEMY_RINKEBY_API_KEY_URL;


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

