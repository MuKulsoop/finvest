import { ethers } from 'ethers';
import { Contract } from 'ethers';

import FinvestABI from './FinvestABI.json'; // Import your contract ABI

const CONTRACT_ADDRESS = '0x0cd118073a8ff6026ae465621664b277e32e2843'; // Update with your deployed contract address

// Function to get the contract instance
export const getContract = async (signer) => {
    return new Contract(CONTRACT_ADDRESS, FinvestABI, signer);
};

// Function to create a project on blockchain
export const createProjectOnBlockchain = async (signer, totalAmount, milestones) => {
    try {
        const contract = await getContract(signer);
        const transaction = await contract.createProject(totalAmount, milestones);
        const txReceipt = await transaction.wait(); // Wait for transaction confirmation
        return txReceipt.transactionHash; // Return the transaction hash
    } catch (error) {
        console.error("Error creating project on blockchain:", error);
        throw new Error('Blockchain project creation failed');
    }
};

// Function to contribute to a project
export const contributeToProject = async (signer, projectId, amount) => {
    try {
        const contract = await getContract(signer);
        const transaction = await contract.contribute(projectId, { value: ethers.utils.parseEther(amount) });
        const txReceipt = await transaction.wait(); // Wait for transaction confirmation
        return txReceipt.transactionHash; // Return the transaction hash
    } catch (error) {
        console.error("Error contributing to project on blockchain:", error);
        throw new Error('Blockchain contribution failed');
    }
};

// Add other blockchain interaction functions here if needed
