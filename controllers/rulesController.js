const logger = require('../middleware/logger')
const rulesModel = require('../models/rulesModel'); // Adjust the path as necessary

// POST /api/rules - Create new rules
const createRules = async (req, res) => {
    try {
        const existingRules = await rulesModel.findOne();

        if (existingRules) {
            const updatedRules = await rulesModel.findOneAndUpdate(
                {},
                req.body,
                { new: true }
            );
            logger.info('Updated existing rules:', { updatedRules });
            res.status(200).json(updatedRules);
        } else {
            const createdRules = await rulesModel.create(req.body);
            logger.info('Created new rules:', { createdRules });
            res.status(201).json(createdRules);
        }
    } catch (error) {
        logger.error('Error creating/updating rules:', { error: error.message });
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
                logger.warn('No rules found in database');
                res.status(200).json({message:"there is no data in Rules to show"});
                
            }
            else{
                logger.info('Fetched all rules:', { count: allRules.length });
                res.status(200).json(allRules);
            }
    } catch (error) {
        logger.error('Error retrieving rules:', { error: error.message });
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createRules,
    getAllRules,


};