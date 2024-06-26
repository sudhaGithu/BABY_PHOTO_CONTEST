const express = require('express');
const router = express.Router();
const termsAndConditionsModel = require('../models/termsandconditionsModel'); // Adjust the path as necessary

// POST /api/terms-and-conditions - Create new terms and conditions
const createtermsAndConditions = async (req, res) => {
    try {
        const existingTerms = await termsAndConditionsModel.findOne();

        if (existingTerms) {
            const updatedTerms = await termsAndConditionsModel.findOneAndUpdate(
                {},
                req.body,
                { new: true }
            );
            res.status(200).json(updatedTerms);
        } else {
            const createdterms = await termsAndConditionsModel.create(req.body);
            res.status(201).json(createdterms);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/terms-and-conditions - Get all terms and conditions
const gettermsAndConditions = async (req, res) => {
    try {
        const allTerms = await termsAndConditionsModel.find();
        //res.status(200).json(allTerms);
        if(allTerms.length === 0)
            {
                res.status(200).json({message:"there is no data in Terms and Conditions to show"});
                
            }
            else{
                res.status(200).json(allTerms);
            }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports ={
    createtermsAndConditions,
    gettermsAndConditions
};