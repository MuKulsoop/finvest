import Project from '../models/Project.model.js';
import Transaction from '../models/Transaction.model.js';

// Function to find contributor ID by wallet address
const findContributorByWalletAddress = async (walletAddress) => {
    const project = await Project.findOne({
        "contributions.donor": walletAddress
    });

    if (project) {
        const contribution = project.contributions.find(contrib => contrib.donor === walletAddress);
        return contribution ? contribution._id : null; // Assuming each contribution has a unique _id
    }
    return null;
};

// Function to update the contributors list
const updateContributorsList = async (projectId, contributorAddress) => {
    const project = await Project.findById(projectId);

    if (project && !project.contributors.includes(contributorAddress)) {
        project.contributors.push(contributorAddress);
        await project.save();
    }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
    const { project, contributor, amount, transactionHash, network, status } = req.body;

    try {
        // Find the contributor ID by wallet address
        const contributorId = await findContributorByWalletAddress(contributor);

        if (!contributorId) {
            // Update the contributors list if the contributor is not found
            await updateContributorsList(project, contributor);
        }

        const transaction = new Transaction({
            project,
            contributor: contributorId || contributor, // Fallback to wallet address if ID is not found
            amount,
            transactionHash,
            network,
            status,
        });

        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
