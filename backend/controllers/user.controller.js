import Token from "../models/Token.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Investor from "../models/Investor.model.js";
import Funding from "../models/Funding.model.js";

dotenv.config();

export const addInvestor = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userBody = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        };
        const newUser = new Investor(userBody);
        await newUser.save();
        return res.status(200).json({ msg: "Investor saved successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Error occurred while saving Investor", error });
    }
};

export const addFunding = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const userBody = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        };
        const newUser = new Funding(userBody);
        await newUser.save();
        return res.status(200).json({ msg: "Funding user saved successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Error occurred while saving Funding user", error });
    }
};

export const loginInvestor = async (req, res) => {
    try {
        const user = await Investor.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: "Email does not match" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            return res.status(200).json({ accessToken, refreshToken, name: user.firstName, email: user.email });
        } else {
            return res.status(400).json({ msg: "Password does not match" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: "Error while logging in user", error: error.message });
    }
};

export const loginFunding = async (req, res) => {
    try {
        const user = await Funding.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: "Email does not match" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            return res.status(200).json({ accessToken, refreshToken, name: user.firstName, email: user.email });
        } else {
            return res.status(400).json({ msg: "Password does not match" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ msg: "Error while logging in user", error: error.message });
    }
};
