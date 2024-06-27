const District = require('../models/districtModel'); // Ensure the path is correct
const logger = require('../middleware/logger')
const createDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const newDistrict = new District({ name });
    await newDistrict.save();


    // Log successful district creation
    logger.info('District created successfully', { districtId: newDistrict._id });

    res.status(201).json(newDistrict);
  } catch (err) {
    logger.error('Error creating district:', { error: error.message });
    console.error('Error creating district:', err);
    res.status(500).send('unable to add district');
  }
};

const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();

        // Log successful retrieval of districts
        logger.info('Districts retrieved successfully', { count: districts.length });

    res.status(200).json(districts);
  } catch (err) {

    logger.error('Error retrieving districts:', { error: error.message });

    console.error('Error retrieving districts:', err);
    res.status(500).send('unable to get records');
  }
};

module.exports = { createDistrict, getAllDistricts };
