import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import axios from 'axios';
import cookieParser from "cookie-parser";

// Initialize Express app
const app = express();

dotenv.config();

// Port configuration
const PORT = 8000;

// Middleware setup
// app.options('*', cors()); // Enable pre-flight for all routes
app.use(cors({ origin : 'http://localhost:5173', credentials: true })); //In production localhost has to be changed to the frontend url

app.use(cookieParser())
app.use(bodyParser.json({ extended: true }));
app.use('/', router);

// Database connection
Connection();

// Ping service URL
const SERVICE_URL = 'https://finvest-backend.onrender.com';

// Function to ping the service
const pingService = () => {
    axios.get(SERVICE_URL)
        .then(response => console.log('Service pinged successfully:', response.status))
        .catch(error => console.error('Error pinging service:', error.message));
};

// Function to set a random interval between min and max
const setRandomInterval = (func, min, max) => {
    const randomDelay = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(() => {
        func();
        setRandomInterval(func, min, max); // Recursively set the next random interval
    }, randomDelay);
};

// Start pinging the service at random intervals between 1 and 5 minutes
setRandomInterval(pingService, 1 * 60 * 1000, 5 * 60 * 1000);

// Start the server
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));