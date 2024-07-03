// const District = require('../models/districtModel'); // Ensure the path is correct
// const logger = require('../middleware/logger')
// const createDistrict = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const newDistrict = new District({ name });
//     await newDistrict.save();


//     // Log successful district creation
//     logger.info('District created successfully', { districtId: newDistrict._id });

//     res.status(201).json(newDistrict);
//   } catch (err) {
//     logger.error('Error creating district:', { error: error.message });
//     console.error('Error creating district:', err);
//     res.status(500).send('unable to add district');
//   }
// };

// const getAllDistricts = async (req, res) => {
//   try {
//     const districts = await District.find();

//         // Log successful retrieval of districts
//         logger.info('Districts retrieved successfully', { count: districts.length });

//     res.status(200).json(districts);
//   } catch (err) {

//     logger.error('Error retrieving districts:', { error: error.message });

//     console.error('Error retrieving districts:', err);
//     res.status(500).send('unable to get records');
//   }
// };

// module.exports = { createDistrict, getAllDistricts };
const District = require('../models/districtModel'); // Ensure the path is correct
// const mongoose = require('mongoose');
// const State = require('../models/stateModel');


const createDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const state = req.params.id

    const newDistrict = new District({ name, state });

    await newDistrict.save();

    res.status(201).json({
        message: 'District created successfully',
        district: newDistrict,
    });
} catch (error) {
    console.error('Error creating district:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};

const getDistrictsByState = async (req, res) => {
try {
    const { id } = req.params;
  console.log(id);
    const districts = await District.find({ state: id }).populate('state', 'name');
  console.log(districts);
    res.status(200).json(districts);
} catch (error) {
    console.error('Error retrieving districts:', error);
    res.status(500).json({ error: error.message });
}
};

const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.status(200).json(districts);
  } catch (err) {
    console.error('Error retrieving districts:', err);
    res.status(500).send({error: err.message});
  }
};

// const getDistrictsByState = async (req, res) => {
//   try {
//     const { stateCode } = req.params;

//     // Find the state by its code
//     const state = await State.findOne({ code: stateCode });

//     if (!state) {
//         return res.status(404).json({ error: 'State not found' });
//     }

//     // Find all districts with the given state ID
//     const districts = await District.find({ stateCode: state._id });

//     res.status(200).json({ state: state.name, districts });
// } catch (error) {
//     console.error('Error fetching districts:', error);
//     res.status(500).json({ error: 'Server error' });
// }
// };

module.exports = { createDistrict, getAllDistricts, getDistrictsByState };