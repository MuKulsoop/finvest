import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    description: String,
    recipient: String,
    amount: Number,
    approved: Boolean,
    approvalCount: Number,
    approvals: { type: Map, of: Boolean }
});

const ngoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalDonations: { type: Number, default: 0 },
    totalTasks: { type: Number, default: 0 },
    donations: { type: Map, of: Number },
    tasks: [taskSchema]
});

const Ngo = mongoose.model('Ngo', ngoSchema);
export default Ngo;
