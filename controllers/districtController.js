const District = require('../models/districtModel'); // Ensure the path is correct

const createDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const newDistrict = new District({ name });
    await newDistrict.save();
    res.status(201).json(newDistrict);
  } catch (err) {
    console.error('Error creating district:', err);
    res.status(500).send('unable to add district');
  }
};

const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.status(200).json(districts);
  } catch (err) {
    console.error('Error retrieving districts:', err);
    res.status(500).send('unable to get records');
  }
};

module.exports = { createDistrict, getAllDistricts };
