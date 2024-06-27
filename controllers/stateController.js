const State = require('../models/stateModel');
const logger = require('../middleware/logger')

const createState = async (req, res) => {
  try {
    const { name } = req.body;
    const newState = new State({ name });
    await newState.save();
    logger.info('Created new state:', { state: newState });
    res.status(201).json(newState);
  } catch (err) {
    logger.error('Error creating state:', { error: err.message });
    console.error('Error creating state:', err);
    res.status(500).send('unable to add state');
  }
};

const getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    logger.info('Fetched all states:', { count: states.length });
    res.status(200).json(states);
  } catch (err) {
    logger.error('Error retrieving states:', { error: err.message });
    console.error('Error retrieving states:', err);
    res.status(500).send('unable to get records');
  }
};

module.exports = { createState, getAllStates };
