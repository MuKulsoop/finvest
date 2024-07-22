
//Libraries
import Token from "../models/token.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

//Other components
import investor from "../models/Investor.model.js"
import funding from "../models/Funding.model.js"




dotenv.config();


export const addInvestor = async (request, response) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const userbody = {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password : hashedPassword
        };
        const newUser = new investor(userbody);
        await newUser.save();
        
        return response.status(200).json({msg: "Investor saved successfully"})
    } catch (error) {
        return response.status(500).json({msg: "Error occured while saving Investor ", error})
    }
}

export const addFunding = async (request, response) => {
    try{
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const userbody = {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password : hashedPassword
        };
        const newUser = new funding(userbody);
        await newUser.save();
        
        return response.status(200).json({msg: "Investor saved successfully"})
    } catch (error) {
        return response.status(500).json({msg: "Error occured while saving Investor ", error})
    }
}

export const loginInvestor = async ( request, response ) => {
    const user = await investor.findOne({ username : request.body.username })
    if ( !user ) {
        return response.status(400).json({msg : "usename does not matches"})
    }
    try{    
        let match = await bcrypt.compare(request.body.password, user.password);
        if( match ){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY , { expiresIn : '15m'} );
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
            const newToken = new Token( { token : refreshToken })
            await newToken.save()
            return response.status(200).json({ accessToken : accessToken , refreshToken : refreshToken , name : user.name , username : user.username})
        } 
        else{
            return response.status(400).json({ msg : "Password does not match "})
        }


    } catch(error) {
        response.status(500).json({ msg : "Error while logining in user "})
    }
}
export const loginFunding = async ( request, response ) => {
    const user = await funding.findOne({ username : request.body.username })
    if ( !user ) {
        return response.status(400).json({msg : "usename does not matches"})
    }
    try{    
        let match = await bcrypt.compare(request.body.password, user.password);
        if( match ){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY , { expiresIn : '15m'} );
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
            const newToken = new Token( { token : refreshToken })
            await newToken.save()
            return response.status(200).json({ accessToken : accessToken , refreshToken : refreshToken , name : user.name , username : user.username})
        } 
        else{
            return response.status(400).json({ msg : "Password does not match "})
        }


    } catch(error) {
        response.status(500).json({ msg : "Error while logining in user "})
    }
}
