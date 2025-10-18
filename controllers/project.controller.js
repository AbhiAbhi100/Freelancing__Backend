import { Project } from "../models/project.model.js";

// client post krega project
export const postProject = async (req, res) => {
    try {
        const { title, description, requirements, budget, location, projectType, experience, duration, clientId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !budget || !location || !projectType || !experience || !duration || !clientId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const project = await Project.create({
            title,
            description,
            requirements: requirements.split(","),
            budget: Number(budget),
            location,
            projectType,
            experienceLevel: experience,
            duration,
            client: clientId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New project created successfully.",
            project,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// freelancer k liye
export const getAllProjects = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const projects = await Project.find(query).populate({
            path: "client"
        }).sort({ createdAt: -1 });
        if (!projects) {
            return res.status(404).json({
                message: "Projects not found.",
                success: false
            })
        };
        return res.status(200).json({
            projects,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// freelancer
export const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId).populate({
            path:"proposals"
        });
        if (!project) {
            return res.status(404).json({
                message: "Project not found.",
                success: false
            })
        };
        return res.status(200).json({ project, success: true });
    } catch (error) {
        console.log(error);
    }
}
// client kitne project create kra hai abhi tk
export const getClientProjects = async (req, res) => {
    try {
        const clientId = req.id;
        const projects = await Project.find({ created_by: clientId }).populate({
            path:'client',
            createdAt:-1
        });
        if (!projects) {
            return res.status(404).json({
                message: "Projects not found.",
                success: false
            })
        };
        return res.status(200).json({
            projects,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
