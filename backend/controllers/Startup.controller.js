import Startup from '../models/Startup.model.js';

export const registerStartup = async (req, res) => {
    const { name, founder } = req.body;
    try {
        const newStartup = new Startup({ name, founder });
        await newStartup.save();
        res.status(201).json(newStartup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addMilestone = async (req, res) => {
    const { startupId } = req.params;
    const { description, amount } = req.body;
    try {
        const startup = await Startup.findById(startupId);
        if (!startup) return res.status(404).json({ error: 'Startup not found' });

        startup.milestones.push({ description, amount, completed: false, approvalCount: 0, approvals: new Map() });
        startup.totalMilestones++;
        await startup.save();
        res.status(201).json(startup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const investInMilestone = async (req, res) => {
    const { startupId, milestoneId } = req.params;
    const { amount, investor } = req.body;
    try {
        const startup = await Startup.findById(startupId);
        if (!startup) return res.status(404).json({ error: 'Startup not found' });

        const milestone = startup.milestones.id(milestoneId);
        if (!milestone) return res.status(404).json({ error: 'Milestone not found' });

        milestone.approvals.set(investor, (milestone.approvals.get(investor) || 0) + amount);
        milestone.approvalCount += amount;
        await startup.save();
        res.status(200).json(milestone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const approveMilestone = async (req, res) => {
    const { startupId, milestoneId } = req.params;
    const { investor } = req.body;
    try {
        const startup = await Startup.findById(startupId);
        if (!startup) return res.status(404).json({ error: 'Startup not found' });

        const milestone = startup.milestones.id(milestoneId);
        if (!milestone) return res.status(404).json({ error: 'Milestone not found' });

        if (!milestone.approvals.get(investor)) {
            milestone.approvals.set(investor, true);
            milestone.approvalCount++;
        }
        await startup.save();
        res.status(200).json(milestone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const finalizeMilestone = async (req, res) => {
    const { startupId, milestoneId } = req.params;
    try {
        const startup = await Startup.findById(startupId);
        if (!startup) return res.status(404).json({ error: 'Startup not found' });

        const milestone = startup.milestones.id(milestoneId);
        if (!milestone) return res.status(404).json({ error: 'Milestone not found' });

        if (milestone.approvalCount > startup.milestones.size / 2) {
            milestone.completed = true;
            await startup.save();
            res.status(200).json(milestone);
        } else {
            res.status(400).json({ error: 'Insufficient approvals' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getStartupDetails = async (req, res) => {
    const { startupId } = req.params;
    try {
        const startup = await Startup.findById(startupId);
        if (!startup) return res.status(404).json({ error: 'Startup not found' });

        res.status(200).json(startup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
