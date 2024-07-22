
//Libraries
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

//Functions
import Connection from "./database/db.js"

const app = express();

app.use(cors());

Connection();

const PORT = process.env.SERVER_PORT

app.listen(PORT, () =>{
    console.log(`App is listening on the port ${PORT}`)
})


