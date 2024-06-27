const express = require('express');
const logger = require('../middleware/logger')
const router = express.Router();
const processsModel = require('../models/process'); // Adjust the path as necessary

// POST /api/terms-and-conditions - Create new terms and conditions
const createprocess = async (req, res) => {
    try {
        logger.info('Received request to create new process', req.body);
        console.log(req.body);
        const existingTerms = await processsModel.findOne();

        if (existingTerms) {
            const updatedTerms = await processsModel.findOneAndUpdate(
                {},
                req.body,
                { new: true }
            );
            logger.info('Updated process successfully', updatedProcess);
            res.status(200).json(updatedTerms);
        } else {
            const createdterms = await processsModel.create(req.body);
            logger.info('Created new process successfully', createdProcess);
            console.log(createdterms);
            res.status(201).json(createdterms);
        }
    } catch (error) {
        logger.error('Error creating process', error);
        res.status(500).json({ error: error.message });
    }
};

// GET /api/terms-and-conditions - Get all terms and conditions
const getprocess = async (req, res) => {
    try {
        logger.info('Fetching all processes');
        const allTerms = await processsModel.find();
        //res.status(200).json(allTerms);
        if(allTerms.length === 0)
            {
                logger.warn('No processes found');
                res.status(200).json({message:"data not found"});
                
            }
            else{
                logger.info('Fetched all processes successfully', allProcesses);
                res.status(200).json(allTerms);
            }
    } catch (error) {
        logger.error('Error fetching processes', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports ={
    createprocess,
    getprocess
};