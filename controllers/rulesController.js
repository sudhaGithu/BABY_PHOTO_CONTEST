
const rulesModel = require('../models/rulesModel'); // Adjust the path as necessary

// POST /api/rules - Create new rules
const createRules = async (req, res) => {
    try {
       const createdRules = await rulesModel.create(req.body);
        res.status(201).json(createdRules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /api/rules - Get all rules
const getAllRules = async (req, res) => {
    try {
        const allRules = await rulesModel.find();
        //res.status(200).json(allRules);

        if(allRules.length === 0)
            {
                res.status(200).json({message:"there is no data in Rules to show"});
                
            }
            else{
                res.status(200).json(allRules);
            }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addRuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { fieldName, stringValue } = req.body;

        // Validate if fieldName is one of the allowed fields
        const allowedFields = ['Voting_Frequency', 'Voting_Period', 'Duplicate_Voting', 'Suspicious_Activity', 'Winner_Selection', 'Gift_Voucher_Delivery', 'Testimonial_Requirement', 'Privacy_Assurance'];
        if (!allowedFields.includes(fieldName)) {
            return res.status(400).json({ error: `Invalid field name: ${fieldName}` });
        }

        const terms = await rulesModel.findById(id); // Assuming 'rules' is your model for these fields

        if (!terms) {
            return res.status(404).json({ error: 'Rule not found' });
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

// GET /api/rules/:id - Get rules by ID
// const getRuleById = async (req, res) => {
//     try {
//         const rules = await rulesModel.findById(req.params.id);
//         if (!rules) {
//             return res.status(404).json({ error: 'Rules not found' });
//         }
//         res.status(200).json(rules);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // PUT /api/rules/:id - Update rules by ID
// const updateRuleById = async (req, res) => {
//     try {
//         const updatedRules = await rulesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedRules) {
//             return res.status(404).json({ error: 'Rules not found' });
//         }
//         res.status(200).json(updatedRules);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // DELETE /api/rules/:id - Delete rules by ID
// const deleteRuleById = async (req, res) => {
//     try {
//         const deletedRules = await rulesModel.findByIdAndDelete(req.params.id);
//         if (!deletedRules) {
//             return res.status(404).json({ error: 'Rules not found' });
//         }
//         res.status(200).json(deletedRules);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = {
    createRules,
    getAllRules,
    // getRuleById,
    // updateRuleById,
    // deleteRuleById,
    addRuleById
};