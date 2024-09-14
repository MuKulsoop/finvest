import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    id: Number,
    avatar: String,
    name: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
    id: Number,
    avatar: String,
    name: String,
    date: { type: Date, default: Date.now },
    image: String,
    description: String,
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: [commentSchema], 
});

const Post = mongoose.model('Post', postSchema);

export default Post;
