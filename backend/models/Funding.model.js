import mongoose from 'mongoose';

const fundingSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true }
});

const funding = mongoose.model('funding', fundingSchema);

export default funding;
