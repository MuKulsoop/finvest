// controllers/userSetting.controller.js
import UserSetting from '../models/UserSetting.js';

// Get user settings
export const getUserSettings = async (req, res) => {
    try {
        const userSettings = await UserSetting.findOne({ userId: req.user.id });
        if (!userSettings) {
            return res.status(404).json({ msg: 'User settings not found' });
        }
        res.json(userSettings);
    } catch (error) {
        console.error('Error fetching user settings:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Create or update user settings
export const upsertUserSettings = async (req, res) => {
    const { username, bio, contact, category, category1, motive } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        let userSettings = await UserSetting.findOne({ userId: req.user.id });

        if (userSettings) {
            userSettings = await UserSetting.findOneAndUpdate(
                { userId: req.user.id },
                { username, bio, contact, category, category1, image, motive },
                { new: true }
            );
            return res.json(userSettings);
        }

        userSettings = new UserSetting({
            userId: req.user.id,
            username,
            bio,
            contact,
            category,
            category1,
            image,
            motive
        });
        await userSettings.save();
        res.json(userSettings);
    } catch (error) {
        console.error('Error saving user settings:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete user settings
export const deleteUserSettings = async (req, res) => {
    try {
        const userSettings = await UserSetting.findOneAndDelete({ userId: req.user.id });
        if (!userSettings) {
            return res.status(404).json({ msg: 'User settings not found' });
        }
        res.json({ msg: 'User settings deleted' });
    } catch (error) {
        console.error('Error deleting user settings:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};
