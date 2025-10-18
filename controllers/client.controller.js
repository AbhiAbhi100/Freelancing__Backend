import { Client } from "../models/client.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerClient = async (req, res) => {
    try {
        const { clientName } = req.body;
        if (!clientName) {
            return res.status(400).json({
                message: "Client name is required.",
                success: false
            });
        }
        let client = await Client.findOne({ name: clientName });
        if (client) {
            return res.status(400).json({
                message: "You can't register same client.",
                success: false
            })
        };
        client = await Client.create({
            name: clientName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Client registered successfully.",
            client,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getClient = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const clients = await Client.find({ userId });
        if (!clients) {
            return res.status(404).json({
                message: "Clients not found.",
                success: false
            })
        }
        return res.status(200).json({
            clients,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get client by id
export const getClientById = async (req, res) => {
    try {
        const clientId = req.params.id;
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({
                message: "Client not found.",
                success: false
            })
        }
        return res.status(200).json({
            client,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateClient = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const client = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!client) {
            return res.status(404).json({
                message: "Client not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Client information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}