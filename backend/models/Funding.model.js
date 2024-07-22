import mongoose from "mongoose"

const fundingSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const funding = mongoose.model("funding", fundingSchema);

export default funding;