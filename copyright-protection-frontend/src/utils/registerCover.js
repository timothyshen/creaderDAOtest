import { ethers } from "ethers";
import { abi } from "src/api/Copyright.json";

const address = '0xD74554760Adc11bB290E28BA7fc07C33923693ef'

function registerTheCover(address, title, shortDes, LongDes, coverLink) {
    return new Promise((resolve, reject) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let contract_signer = new ethers.Contract(
            address,
            abi,
            provider.getSigner()
        );
        // contract_signer.novelCreated().then((tx) =>{
        //     resolve(tx);
        // }).catch(({ error }) => {
        //     reject(error.message + ` (proof=${JSON.stringify(proof)})`);
        // });
    });
}

export { registerTheCover };
