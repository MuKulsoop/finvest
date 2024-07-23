import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    completed: Boolean,
    approvalCount: Number,
    approvals: { type: Map, of: Boolean }
});

const startupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    founder: { type: String, required: true },
    totalMilestones: { type: Number, default: 0 },
    milestones: [milestoneSchema]
});

const Startup = mongoose.model('Startup', startupSchema);
export default Startup;
