const State = require('../models/stateModel');

const createState = async (req, res) => {
  try {
    const { name } = req.body;
    const newState = new State({ name });
    await newState.save();
    res.status(201).json(newState);
  } catch (err) {
    console.error('Error creating state:', err);
    res.status(500).send('Server Error');
  }
};

const getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (err) {
    console.error('Error retrieving states:', err);
    res.status(500).send('Server Error');
  }
};

module.exports = { createState, getAllStates };
