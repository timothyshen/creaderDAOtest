import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json"

const App = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;
    const [allWaves, setAllWaves] = useState([]);
    const [tweetValue, setTweetValue] = React.useState("");

    const getAllWaves = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                /*
                 * Call the getAllWaves method from your Smart Contract
                 */
                const waves = await wavePortalContract.getAllWaves();


                /*
                 * We only need address, timestamp, and message in our UI so let's
                 * pick those out
                 */
                let wavesCleaned = [];
                waves.forEach(wave => {
                    wavesCleaned.push({
                        address: wave.waver,
                        timestamp: new Date(wave.timestamp * 1000),
                        message: wave.message
                    });
                });

                /*
                 * Store our data in React State
                 */
                setAllWaves(wavesCleaned);
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
                getAllWaves();
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Implement your connectWallet method here
     */
    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    const wave = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                const waveTxn = await wavePortalContract.wave(tweetValue,{gasLimit:300000})

                //  const waveTxn = await wavePortalContract.wave();
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);

                count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

            } else {
                console.log("Ethereum object doesn't exist!");
                alert("Have you connected Metamask yet ? Click on connect wallet.");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected().then(r => {
            console.log("Checked if wallet is connected", r);
        });
    }, [])

    return (
        <div className="mainContainer">
            <div className="dataContainer">

                <div className="header">
                    👋 Hey there!
                </div>

                <div className="bio">
                    I am tim
                </div>

                {
                    currentAccount ? (<textarea name="tweetArea"
                                                placeholder="Enter a message"
                                                type="text"
                                                id="tweet"
                                                value={tweetValue}
                                                onChange={e => setTweetValue(e.target.value)} />) : null
                }

                <button className="waveButton" onClick={wave}>
                    Wave at Me
                </button>

                {/*
                * If there is no currentAccount render this button
                */}
                {!currentAccount && (
                    <button className="waveButton" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                )}

                {allWaves.map((wave, index) => {
                    return (
                        <div class="userInput">
                            <div class="input">Address: {wave.address}</div>
                            <div class="input">Time: {wave.timestamp.toString()}</div>
                            <div class="input">Message: {wave.message}</div>
                        </div>)
                })}



            </div>

        </div>
    );
}

export default App
