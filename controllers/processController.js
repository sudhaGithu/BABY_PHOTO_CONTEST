const express = require('express');
const router = express.Router();
const processsModel = require('../models/process'); // Adjust the path as necessary

// POST /api/terms-and-conditions - Create new terms and conditions
const createprocess = async (req, res) => {
    try {
        console.log(req.body);
        const existingTerms = await processsModel.findOne();

        if (existingTerms) {
            const updatedTerms = await processsModel.findOneAndUpdate(
                {},
                req.body,
                { new: true }
            );
            res.status(200).json(updatedTerms);
        } else {
            const createdterms = await processsModel.create(req.body);
            console.log(createdterms);
            res.status(201).json(createdterms);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/terms-and-conditions - Get all terms and conditions
const getprocess = async (req, res) => {
    try {
        const allTerms = await processsModel.find();
        //res.status(200).json(allTerms);
        if(allTerms.length === 0)
            {
                res.status(200).json({message:"data not found"});
                
            }
            else{
                res.status(200).json(allTerms);
            }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports ={
    createprocess,
    getprocess
};