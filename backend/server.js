import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
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

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const systemInstruction = fs.readFileSync('./systemInstructions.txt', 'utf-8');

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: systemInstruction,
});

const generationConfig = {
    temperature: 0.4,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2000,
};

// Endpoint to generate content
app.post('/generate-content', async (req, res) => {
    const { prompt, language } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                      {text: "genrate me some content related to completion of the table purchase for the office"},
                    ],
                  },
                  {
                    role: "model",
                    parts: [
                      {text: "##  🎉  New Office Table - Let's Get Productive! 🎉\n\nIt's official! We've finally completed the purchase of our new office table. Let's give a round of applause to [mention team member(s) who spearheaded the purchase] for their hard work! \n\nThis new table will provide us with a [mention specific benefits, e.g., spacious and collaborative work area, ergonomic setup, etc.]  We're excited to see how this will [mention positive impacts, e.g., boost productivity, enhance team collaboration, improve workflow, etc.].\n\n**Here are a few things to look forward to:**\n\n* **[Mention specific features of the table, e.g., adjustable height, cable management system, etc.]**\n* **[Mention any plans for the table, e.g., team lunch, celebratory gathering, etc.]**\n* **[Mention any actions needed for setup, e.g.,  unpacking, assembly, etc.]**\n\nWe can't wait to get settled in and start working in our new, improved space! \n\n**Let's make the most of our new office table and continue to [mention company goal or value, e.g., grow together, achieve our goals, etc.]!**\n"},
                    ],
                  },
                  {
                    role: "user",
                    parts: [
                      {text: "i have created the software which is able to detecct emotiond and it will finally be out in 3 days make the post in 50 words and make it user interactive"},
                    ],
                  },
                  {
                    role: "model",
                    parts: [
                      {text: "Get ready to connect on a deeper level! 🤯 Our emotion detection software launches in 3 days!  \n\nAre you excited to understand emotions better? \nTell us what you're most looking forward to using it for! 👇 \n#EmotionAI #TechLaunch #3DaysToGo \n"},
                    ],
                  },
                  {
                    role: "user",
                    parts: [
                      {text: "our team complete milestone 1 and her eis the progress the food supply to last the orpanage 1 yr is done and all the kids are happs and there tummy is full , post in 60 words "},
                    ],
                  },
                  {
                    role: "model",
                    parts: [
                      {text: "🎉 Milestone 1 achieved! 🎉  We've successfully secured a year's worth of food for the orphanage!  Seeing the happy faces and full tummies of these amazing kids makes it all worthwhile.  ❤️  Thank you to everyone who contributed to this incredible achievement! #MakingADifference #OrphanageSupport #MilestoneReached \n"},
                    ],
                  },
            ],
        });

        let result = await chatSession.sendMessage(prompt);
        let text = await result.response.text();

        // If translation to another language is required
        // if (language && language !== 'en') {
        //     const translationPrompt = `Translate the following text to ${language}: ${text}`;
        //     result = await chatSession.sendMessage(translationPrompt);
        //     text = await result.response.text();
        // }

        res.json({ generatedText: text });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

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
