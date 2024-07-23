import { ethers } from 'ethers';
import abi from './contractAbi.json';

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

export const sendTransaction = async (recipient, amount) => {
    try {
        const tx = await contract.sendFunds(recipient, ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        return tx.hash;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw new Error('Blockchain transaction failed');
    }
};
