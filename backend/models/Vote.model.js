import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Project.milestones', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true }
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
