import Project from '../models/Project.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Create a new project
export const createProject = async (req, res) => {
    try {
        console.log(req.body)
        const {
            title,
            description,
            creator,
            avatar,
            amountRaised,
            contributors,
            upvotes,
            minimumDonation,
            milestones
        } = req.body;

        // Ensure an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'Image file is required' });
        }

        const imageFilePath = req.file.path;

        // Upload the image to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(imageFilePath);
        const imageUrl = cloudinaryResponse ? cloudinaryResponse.secure_url : '';

        // Create and save the new project
        const newProject = new Project({
            title,
            description,
            creator,
            avatar, // Directly from frontend
            image: imageUrl, // URL from Cloudinary
            amountRaised,
            contributors,
            upvotes,
            minimumDonation,
            milestones: JSON.parse(milestones) // Parse JSON string to array
        });

        await newProject.save();
        return res.status(201).json({ msg: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json(projects);
    } catch (error) {
        console.error('Error retrieving projects:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        return res.status(200).json(project);
    } catch (error) {
        console.error('Error retrieving project:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
};
