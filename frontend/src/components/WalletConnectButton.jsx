// components/WalletConnectButton.js
import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const WalletConnectButton = () => {
    const [provider, setProvider] = useState(null);

    const connectWallet = async () => {
        try {
            const web3Modal = new Web3Modal({
                cacheProvider: true, // optional
                providerOptions: {}, // required
            });

            const instance = await web3Modal.connect();
            const ethersProvider = new ethers.providers.Web3Provider(instance);
            setProvider(ethersProvider);
        } catch (error) {
            console.error("Failed to connect to wallet:", error);
        }
    };

    return (
        <button
            onClick={connectWallet}
            className=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Connect Wallet
        </button>
    );
};

export default WalletConnectButton;
