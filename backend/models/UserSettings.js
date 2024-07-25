
import mongoose from 'mongoose';

const UserSettingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    contact: {
        type: String,
    },
    category: {
        type: String,
    },
    category1: {
        type: String,
    },
    image: {
        type: String,
    },
    motive: {
        type: String,
    },
}, { timestamps: true });

const UserSetting = mongoose.model('UserSetting', UserSettingSchema);

export default UserSetting;
