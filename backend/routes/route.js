import express from "express";
import { signup, login } from "../controllers/user.controller.js";
import {
    registerNGO,
    donateToNGO,
    addNGOTask,
    approveNGOTask,
    finalizeNGOTask,
    getNGODetails
} from '../controllers/NGO.controller.js';

import {
    registerStartup,
    addMilestone,
    investInMilestone,
    approveMilestone,
    finalizeMilestone,
    getStartupDetails
} from '../controllers/Startup.controller.js';

import { createProject,  getProjectById, getAllProjects } from "../controllers/Project.controller.js";
import { upload } from "../middleware/multer.js"
import { authenticateToken } from "../middleware/authenticate.js";


const router = express.Router();

// NGO Routes
router.post('/ngo/register', authenticateToken, registerNGO);
router.post('/ngo/donate/:ngoId', authenticateToken, donateToNGO);
router.post('/ngo/add-task/:ngoId', authenticateToken, addNGOTask);
router.post('/ngo/approve-task/:ngoId/:taskId', authenticateToken, approveNGOTask);
router.post('/ngo/finalize-task/:ngoId/:taskId', authenticateToken, finalizeNGOTask);
router.get('/ngo/:ngoId', authenticateToken, getNGODetails);

// Startup Routes
router.post('/startup/register', authenticateToken, registerStartup);
router.post('/startup/add-milestone/:startupId', authenticateToken, addMilestone);
router.post('/startup/invest/:startupId/:milestoneId', authenticateToken, investInMilestone);
router.post('/startup/approve-milestone/:startupId/:milestoneId', authenticateToken, approveMilestone);
router.post('/startup/finalize-milestone/:startupId/:milestoneId', authenticateToken, finalizeMilestone);
router.get('/startup/:startupId', authenticateToken, getStartupDetails);

// Signup and Login Routes
router.post('/signup', signup);
router.post('/login', login);


// Project Routes

router.post('/project/create', upload.single('image'), createProject);
router.get('/project/getAllProjects',  getAllProjects);
router.get('/project/:projectId',  getProjectById); 

export default router;
