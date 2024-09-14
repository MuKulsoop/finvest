import express from "express";
import { signup, login, getProfile, refreshToken, logout } from '../controllers/user.controller.js';
import { authenticateJWT } from "../middleware/authenticate.js";
import { upload } from "../middleware/multer.js";
import { createProject,  getProjectById, getAllProjects } from "../controllers/Project.controller.js";


const router = express.Router();


// Signup and Login Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateJWT, getProfile);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);


// Project Routes

router.post('/project/create', upload.single('image'), createProject);
router.get('/project/getAllProjects',  getAllProjects);
router.get('/project/:projectId',  getProjectById); 

export default router;
