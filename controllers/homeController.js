const express = require('express');
const router = express.Router();
const homeModel = require('../models/homeModel'); // Adjust the path as necessary

// POST /api/home - Create new home content
const createHome = async (req, res) => {
    try {
        const createdHome = await homeModel.create(req.body);
        res.status(201).json(createdHome);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/home - Get all home content
const getAllHome = async (req, res) => {
    try {
        const allHome = await homeModel.find();
        if(allHome.length === 0)
            {
                res.status(200).json({message:"there is no data in Home to show"});
                
            }
            else{
                res.status(200).json(allHome);
            }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addHomeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { stringValue } = req.body; // Assuming only 'stringValue' is passed

        const homeDoc = await homeModel.findById(id);

        if (!homeDoc) {
            return res.status(404).json({ error: 'Home document not found' });
        }

        // Push the new object into the 'content' array
        homeDoc.content.push({ para: stringValue });

        // Save the updated document back to the database
        const updatedHomeDoc = await homeDoc.save();

        res.status(200).json(updatedHomeDoc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// // GET /api/home/:id - Get home content by ID
// const getHomeById = async (req, res) => {
//     try {
//         const homeContent = await homeModel.findById(req.params.id);
//         if (!homeContent) {
//             return res.status(404).json({ error: 'Home content not found' });
//         }
//         res.status(200).json(homeContent);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // PUT /api/home/:id - Update home content by ID
// const updateHomeById = async (req, res) => {
//     try {
//         const updatedHome = await homeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedHome) {
//             return res.status(404).json({ error: 'Home content not found' });
//         }
//         res.status(200).json(updatedHome);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // DELETE /api/home/:id - Delete home content by ID
// const deleteHomeById = async (req, res) => {
//     try {
//         const deletedHome = await homeModel.findByIdAndDelete(req.params.id);
//         if (!deletedHome) {
//             return res.status(404).json({ error: 'Home content not found' });
//         }
//         res.status(200).json(deletedHome);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = {
    createHome,
    getAllHome,
    addHomeById,
    // updateHomeById,
    // deleteHomeById
};