import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import wavePortal from '../../artifacts/contracts/WavePortal.sol/WavePortal.json';

const App = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [allWaves, setAllWaves] = useState([]);
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const getAllWaves = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, wavePortal.abi, signer);

                const waves = await wavePortalContract.getAllWaves();

                let wavesCleaned = [];
                waves.forEach(wave => {
                    wavesCleaned.push({
                        address: wave.waver,
                        timestamp: new Date(wave.timestamp * 1000),
                        message: wave.message
                    });
                });

                setAllWaves(wavesCleaned);

                wavePortalContract.on("NewWave", (from, timestamp, message) => {
                    console.log("NewWave", from, timestamp, message);

                    setAllWaves(prevState => [...prevState, {
                        address: from,
                        timestamp: new Date(timestamp * 1000),
                        message: message
                    }]);
                });
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
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                const wavePortalContract = new ethers.Contract(contractAddress, wavePortal.abi, signer);

                let count = await waveportalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                const waveTxn = await wavePortalContract.wave();
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);

                count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">
                    👋 Hey there!
                </div>

                <div className="bio">
                    I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
                </div>

                <button className="waveButton" onClick={wave}>
                    Wave at Me
                </button>

                {!currentAccount && (
                    <button className="waveButton" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                )}

                {allWaves.map((wave, index) => {
                    return (
                        <div style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
                            <div>Address: {wave.address}</div>
                            <div>Time: {wave.timestamp.toString()}</div>
                            <div>Message: {wave.message}</div>
                        </div>)
                })}
            </div>
        </div>
    );
}

export default App
