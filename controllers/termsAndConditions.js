const express = require('express');
const router = express.Router();
const termsAndConditionsModel = require('../models/termsandconditionsModel'); // Adjust the path as necessary

// POST /api/terms-and-conditions - Create new terms and conditions
const createtermsAndConditions = async (req, res) => {
    try {
        const createdTerms = await termsAndConditionsModel.create(req.body);
        res.status(201).json(createdTerms);
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



// // GET /api/terms-and-conditions/:id - Get terms and conditions by ID
// const gettermsAndConditionsById = async (req, res) => {
//     try {
//         const terms = await termsAndConditionsModel.findById(req.params.id);
//         if (!terms) {
//             return res.status(404).json({ error: 'Terms and conditions not found' });
//         }
//         res.status(200).json(terms);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// PUT /api/terms-and-conditions/:id - Update terms and conditions by ID
const addtermsAndConditionsById = async (req, res) => {
    try {
        const { id } = req.params;
        const { fieldName, stringValue } = req.body;

        // Validate if fieldName is one of the allowed fields
        const allowedFields = ['Eligibility', 'Voting_Process', 'Winner_selection', 'Gift_Vocher', 'Privacy', 'Reporting_Issues'];
        if (!allowedFields.includes(fieldName)) {
            return res.status(400).json({ error: `Invalid field name: ${fieldName}` });
        }

        const terms = await termsAndConditionsModel.findById(id);

        //terms.fieldName.push({ para:stringValue });

        if (!terms) {
            return res.status(404).json({ error: 'Terms and conditions not found' });
        }

        if (!terms[fieldName]) {
            // If the array doesn't exist, initialize it
            terms[fieldName] = [];
        }

        // Push the new object into the array
        terms[fieldName].push({ para: stringValue });

        // Save the updated document back to the database
        const updatedTerms = await terms.save();

        res.status(200).json(updatedTerms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// DELETE /api/terms-and-conditions/:id - Delete terms and conditions by ID
// const deletetermsAndConditionsById = async (req, res) => {
//     try {
//         const deletedTerms = await termsAndConditionsModel.findByIdAndDelete(req.params.id);
//         if (!deletedTerms) {
//             return res.status(404).json({ error: 'Terms and conditions not found' });
//         }
//         res.status(200).json(deletedTerms);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports ={
    createtermsAndConditions,
    gettermsAndConditions,
    addtermsAndConditionsById,
};