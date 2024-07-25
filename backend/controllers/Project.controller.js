import Project from '../models/Project.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Create a new project
export const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            creator,
            avatar,
            amountRaised,
            contributors,
            upvotes,
            minimumDonation,
            milestones,
            communityFeedback,
            contributions,
            category
        } = req.body;

        // Ensure an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'Image file is required' });
        }

        const imageFilePath = req.file.path;

        // Upload the image to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(imageFilePath);
        const imageUrl = cloudinaryResponse ? cloudinaryResponse.secure_url : '';

        // Helper function to safely parse JSON
        const safeJsonParse = (data) => {
            try {
                return data ? JSON.parse(data) : [];
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return [];
            }
        };

        // Get the highest existing ID and increment it
        const lastProject = await Project.findOne().sort({ id: -1 });
        const newId = lastProject ? lastProject.id + 1 : 1;

        // Create and save the new project
        const newProject = new Project({
            id: newId,
            title,
            description,
            creator,
            avatar,
            image: imageUrl,
            amountRaised,
            contributors,
            upvotes,
            minimumDonation,
            milestones: safeJsonParse(milestones),
            communityFeedback: safeJsonParse(communityFeedback),
            contributions: safeJsonParse(contributions),
            category
        });

        await newProject.save();
        return res.status(201).json({ msg: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Validate if projectId is a number
        if (isNaN(projectId)) {
            return res.status(400).json({ msg: 'Invalid project ID' });
        }

        // Convert projectId to a number
        const id = Number(projectId);

        const project = await Project.findOne({ id: id });

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error('Error retrieving project:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};
