import Token from "../models/Token.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Investor from "../models/Investor.model.js";
import Funding from "../models/Funding.model.js";

dotenv.config();

export const addInvestor = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const userBody = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: hashedPassword,
        };
        const newUser = new Investor(userBody);
        await newUser.save();
        return response.status(200).json({ msg: "Investor saved successfully" });
    } catch (error) {
        return response.status(500).json({ msg: "Error occurred while saving Investor", error });
    }
};

export const addFunding = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const userBody = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: hashedPassword,
        };
        const newUser = new Funding(userBody);
        await newUser.save();
        return response.status(200).json({ msg: "Funding user saved successfully" });
    } catch (error) {
        return response.status(500).json({ msg: "Error occurred while saving Funding user", error });
    }
};
export const loginInvestor = async (request, response) => {
    try {
        const user = await Investor.findOne({ email: request.body.email });
        if (!user) {
            return response.status(400).json({ msg: "Email does not match" });
        }

        const match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            return response.status(200).json({ accessToken, refreshToken, name: user.firstName, email: user.email });
        } else {
            return response.status(400).json({ msg: "Password does not match" });
        }
    } catch (error) {
        console.error("Error during login:", error); // Add detailed logging here
        return response.status(500).json({ msg: "Error while logging in user", error: error.message });
    }
};

export const loginFunding = async (request, response) => {
    try {
        const user = await Funding.findOne({ email: request.body.email });
        if (!user) {
            return response.status(400).json({ msg: "Email does not match" });
        }

        const match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            return response.status(200).json({ accessToken, refreshToken, name: user.firstName, email: user.email });
        } else {
            return response.status(400).json({ msg: "Password does not match" });
        }
    } catch (error) {
        console.error("Error during login:", error); // Add detailed logging here
        return response.status(500).json({ msg: "Error while logging in user", error: error.message });
    }
};
