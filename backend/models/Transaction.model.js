import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    contributor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    transactionHash: { type: String, required: true },
    network: { type: String, required: true }, // e.g., Ethereum, Sepolia
    status: { type: String, enum: ["pending", "confirmed", "failed"], required: true },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
