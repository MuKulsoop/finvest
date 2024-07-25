import Token from "../models/Token.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Investor from "../models/Investor.model.js";
import Funding from "../models/Funding.model.js";

dotenv.config();

const createUser = async (userBody, userType) => {
    const hashedPassword = await bcrypt.hash(userBody.password, 10);
    const newUser = userType === "Investor" ? new Investor({ ...userBody, password: hashedPassword }) : new Funding({ ...userBody, password: hashedPassword });
    await newUser.save();
    return newUser;
};

const findUserByEmail = async (email, userType) => {
    return userType === "Investor" ? await Investor.findOne({ email }) : await Funding.findOne({ email });
};

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET_KEY);
    return { accessToken, refreshToken };
};

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, accountType } = req.body;
        const userBody = { firstName, lastName, email, password, accountType };
        const newUser = await createUser(userBody, accountType);
        return res.status(200).json({ msg: `${accountType} user saved successfully`, user: newUser });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ msg: "Error occurred while saving user", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, accountType } = req.body;
        const user = await findUserByEmail(email, accountType);

        if (!user) {
            return res.status(400).json({ msg: "Email does not match" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const { accessToken, refreshToken } = generateTokens(user._id);
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            return res.status(200).json({ accessToken, refreshToken, name: user.firstName, email: user.email, accountType });
        } else {
            return res.status(400).json({ msg: "Password does not match" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: "Error while logging in user", error: error.message });
    }
};
