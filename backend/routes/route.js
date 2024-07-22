import express from "express"



// Importing Controllers
import { loginFunding, loginInvestor } from "../controllers/user.controller.js";
import { addInvestor, addFunding } from "../controllers/user.controller.js";

const route = express.Router();

route.post('/signup/create-investor', addInvestor )
route.post('/signup/create-funding', addFunding )
// route.post('/create-post', createNewPost )
route.post('/login/investor', loginInvestor)
route.post('login/funding', loginFunding)





export default route;