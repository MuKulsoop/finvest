import React, { createContext, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    const connectWallet = async () => {
        try {
            // Initialize Web3Modal and open the wallet modal
            const web3Modal = new Web3Modal();
            const instance = await web3Modal.connect();

            // Create a provider using ethers.js
            const ethersProvider = new ethers.providers.Web3Provider(instance);

            // Get the signer for sending transactions
            const userSigner = ethersProvider.getSigner();

            // Get the user's wallet address
            const address = await userSigner.getAddress();
            setWalletAddress(address);
            setProvider(ethersProvider);
            setSigner(userSigner);
            console.log(address);

        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    const disconnectWallet = () => {
        setWalletAddress('');
        setProvider(null);
        setSigner(null);
    };

    return (
        <WalletContext.Provider
            value={{
                walletAddress,
                provider,
                signer,
                connectWallet,
                disconnectWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
