const express = require('express');
const router = express.Router();
const logger = require('../middleware/logger')
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

            logger.info('Updated existing home content', { updatedhome });

            res.status(200).json(updatedhome);
        } else {
            const createdHome = await homeModel.create(req.body);
            logger.info('Created new home content', { createdHome });
            res.status(201).json(createdHome);
        }
    } catch (error) {
        logger.error('Error creating or updating home content:', { error: error.message });
        res.status(500).json({ error: error.message });
    }
};

// GET /api/home - Get all home content
const getAllHome = async (req, res) => {
    try {
        const allHome = await homeModel.find();
        if(allHome.length === 0)
            {
                logger.info('No data found in Home collection');
                res.status(200).json({message:"there is no data in Home to show"});
                
            }
            else{
                logger.info('Retrieved all home content', { count: allHome.length });
                res.status(200).json(allHome);
            }
        
    } catch (error) {
        logger.error('Error retrieving home content:', { error: error.message });
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    createHome,
    getAllHome
};