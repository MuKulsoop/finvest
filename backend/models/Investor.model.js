import mongoose from "mongoose"

const investorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    LastName: {
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

const investor = mongoose.model("investor", investorSchema)

export default investor