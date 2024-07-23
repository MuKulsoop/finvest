import Ngo from "../models/NGO.model.js";

export const registerNGO = async (req, res) => {
    const { name } = req.body;
    try {
        const newNGO = new Ngo({ name });
        await newNGO.save();
        res.status(201).json(newNGO);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const donateToNGO = async (req, res) => {
    const { ngoId } = req.params;
    const { amount, donor } = req.body;
    try {
        const ngo = await Ngo.findById(ngoId);
        if (!ngo) return res.status(404).json({ error: 'NGO not found' });

        ngo.totalDonations += amount;
        ngo.donations.set(donor, (ngo.donations.get(donor) || 0) + amount);
        await ngo.save();
        res.status(200).json(ngo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addNGOTask = async (req, res) => {
    const { ngoId } = req.params;
    const { description, recipient, amount } = req.body;
    try {
        const ngo = await Ngo.findById(ngoId);
        if (!ngo) return res.status(404).json({ error: 'NGO not found' });

        ngo.tasks.push({ description, recipient, amount, approved: false, approvalCount: 0, approvals: new Map() });
        ngo.totalTasks++;
        await ngo.save();
        res.status(201).json(ngo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const approveNGOTask = async (req, res) => {
    const { ngoId, taskId } = req.params;
    const { donor } = req.body;
    try {
        const ngo = await Ngo.findById(ngoId);
        if (!ngo) return res.status(404).json({ error: 'NGO not found' });

        const task = ngo.tasks.id(taskId);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        if (!task.approvals.get(donor)) {
            task.approvals.set(donor, true);
            task.approvalCount++;
        }
        await ngo.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const finalizeNGOTask = async (req, res) => {
    const { ngoId, taskId } = req.params;
    try {
        const ngo = await Ngo.findById(ngoId);
        if (!ngo) return res.status(404).json({ error: 'NGO not found' });

        const task = ngo.tasks.id(taskId);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        if (task.approvalCount > ngo.donations.size / 2) {
            task.approved = true;
            await ngo.save();
            res.status(200).json(task);
        } else {
            res.status(400).json({ error: 'Insufficient approvals' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNGODetails = async (req, res) => {
    const { ngoId } = req.params;
    try {
        const ngo = await Ngo.findById(ngoId);
        if (!ngo) return res.status(404).json({ error: 'NGO not found' });

        res.status(200).json(ngo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
