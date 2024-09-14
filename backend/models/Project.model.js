import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
    title: String,
    description: String,
    completionDate: Date,
    amountRequired: String,
    upvotes: Number,
    downvotes: Number
});

const communityFeedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User model
    feedback: String
});

const contributionSchema = new mongoose.Schema({
    donatedAt: Date,
    donor: String,
    // { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    network: String,
    amount: Number,
    usdValue: Number
});

const projectSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    title: String,
    description: String,
    creator: String,
    avatar: String,
    image: String,
    amountRaised: String,
    contributors: Number,
    upvotes: Number,
    minimumDonation: String,
    milestones: [milestoneSchema],
    communityFeedback: [communityFeedbackSchema],
    contributions: [contributionSchema],
    category: String
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
