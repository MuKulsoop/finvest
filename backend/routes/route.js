import express from "express";
import { addInvestor, addFunding, loginInvestor, loginFunding } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/signup/create-investor', addInvestor);
router.post('/signup/create-funding', addFunding);
router.post('/login/investor', loginInvestor);
router.post('/login/funding', loginFunding);

export default router;
