import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

dotenv.config();

const PORT = 8000;
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use('/', router);

Connection();

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
