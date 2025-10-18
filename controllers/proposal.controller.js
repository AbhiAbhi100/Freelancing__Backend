import { Proposal } from "../models/proposal.model.js";
import { Project } from "../models/project.model.js";

export const submitProposal = async (req, res) => {
    try {
        const userId = req.id;
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(400).json({
                message: "Project id is required.",
                success: false
            })
        };
        // check if the user has already submitted proposal for the project
        const existingProposal = await Proposal.findOne({ project: projectId, freelancer: userId });

        if (existingProposal) {
            return res.status(400).json({
                message: "You have already submitted a proposal for this project",
                success: false
            });
        }

        // check if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({
                message: "Project not found",
                success: false
            })
        }
        // create a new proposal
        const newProposal = await Proposal.create({
            project:projectId,
            freelancer:userId,
        });

        project.proposals.push(newProposal._id);
        await project.save();
        return res.status(201).json({
            message:"Proposal submitted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getSubmittedProposals = async (req,res) => {
    try {
        const userId = req.id;
        const proposals = await Proposal.find({freelancer:userId}).sort({createdAt:-1}).populate({//newwest proposals first isiliye sort kiya
            path:'project',
            options:{sort:{createdAt:-1}},
            populate:{// project ke andar client ki details bhi chahiye isiliye populate kiya
                path:'client',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!proposals){
            return res.status(404).json({
                message:"No Proposals",
                success:false
            })
        };
        return res.status(200).json({
            proposals,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// client dekhega kitna freelancers ne proposal submit kiya hai
export const getProposalsForProject = async (req,res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId).populate({
            path:'proposals',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'freelancer'
            }
        });
        if(!project){
            return res.status(404).json({
                message:'Project not found.',
                success:false
            })
        };
        return res.status(200).json({
            project, 
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const proposalId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the proposal by proposal id
        const proposal = await Proposal.findOne({_id:proposalId});
        if(!proposal){
            return res.status(404).json({
                message:"Proposal not found.",
                success:false
            })
        };

        // update the status
        proposal.status = status.toLowerCase();
        await proposal.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}