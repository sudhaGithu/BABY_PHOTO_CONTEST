const express = require('express');
const router = express.Router();
const homeModel = require('../models/homeModel'); // Adjust the path as necessary

// POST /api/home - Create new home content
const createHome = async (req, res) => {
    try {
        const existingHome = await homeModel.findOne();

        if (existingHome) {
            const updatedhome= await homeModel.findOneAndUpdate(
                {},
                req.body,
                { new: true }
            );
            res.status(200).json(updatedhome);
        } else {
            const createdHome = await homeModel.create(req.body);
            res.status(201).json(createdHome);
        }
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




module.exports = {
    createHome,
    getAllHome,
    // updateHomeById,
    // deleteHomeById
};