// import * as constant from "../constant";
import axios from "axios";
const apiKey = import.meta.env.VITE_ALCHEMY_RINKEBY_API_KEY;
const baseURL = `https://eth-rinkeby.alchemyapi.io/v2/${apiKey}/getNFTs`;
export const getAlchemy = async (owner, contractAddress, retryAttempt) => {
    if (retryAttempt > 0) {
        return await getAlchemy(owner, contractAddress, retryAttempt - 1);
    }
    if (owner) {
        let data;
        try {
            if(contractAddress) {
                await axios.get(`${baseURL}/?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`)
                    .then(res => {
                        data = res.data;
                    });
            } else {
                await axios.get(`${baseURL}/?owner=${owner}`)
                    .then(res => {
                        data = res.data;
                    });
            }
            return data
        }catch (e) {
            console.log(e);
        }
    }
}
