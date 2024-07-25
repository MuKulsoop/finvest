import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
    title: String,
    description: String,
    completionDate: Date,
    amountRequired: String
}, { _id: false });

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    avatar: String,
    image: String,
    amountRaised: String,
    contributors: Number,
    upvotes: Number,
    minimumDonation: String,
    milestones: [milestoneSchema]
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
