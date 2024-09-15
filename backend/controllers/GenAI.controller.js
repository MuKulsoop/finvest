import { generateContent } from "../genrativeAI.js";

/**
 * Controller to handle AI content generation
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const generateAiContent = async (req, res) => {
    const { prompt } = req.body; // Extract the prompt from the request body

    try {
        if (!prompt || prompt.trim() === "") {
            return res.status(400).json({ message: "Prompt is required." });
        }

        // Call the function to generate content
        const aiResponse = await generateContent(prompt);

        // Send the AI-generated content back to the client
        res.status(200).json({ content: aiResponse });
    } catch (error) {
        console.error("Error in generateAiContent controller:", error);
        res.status(500).json({ message: "Failed to generate content" });
    }
};
