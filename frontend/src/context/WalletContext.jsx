import React, { createContext, useState } from 'react';
import { ethers } from 'ethers';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState({
        address: '',
        balance: '',
        provider: null,
        signer: null,
    });

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                throw new Error("MetaMask is not installed");
            }

            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Create a new provider
            const provider = new ethers.BrowserProvider(window.ethereum);

            // Get the signer
            const signer = await provider.getSigner();

            // Get user address and balance
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            const formattedBalance = ethers.formatEther(balance);

            // Update state
            setWallet({
                address,
                balance: formattedBalance,
                provider,
                signer,
            });

            console.log(wallet);
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    };

    return (
        <WalletContext.Provider value={{ wallet, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};
