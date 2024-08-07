// const State = require('../models/stateModel');
// const logger = require('../middleware/logger')

// const createState = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const newState = new State({ name });
//     await newState.save();
//     logger.info('Created new state:', { state: newState });
//     res.status(201).json(newState);
//   } catch (err) {
//     logger.error('Error creating state:', { error: err.message });
//     console.error('Error creating state:', err);
//     res.status(500).send('unable to add state');
//   }
// };

// const getAllStates = async (req, res) => {
//   try {
//     const states = await State.find();
//     logger.info('Fetched all states:', { count: states.length });
//     res.status(200).json(states);
//   } catch (err) {
//     logger.error('Error retrieving states:', { error: err.message });
//     console.error('Error retrieving states:', err);
//     res.status(500).send('unable to get records');
//   }
// };

// module.exports = { createState, getAllStates };
const State = require('../models/stateModel');

const createState = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name ) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const newState = new State({ name });
    await newState.save();

    res.status(201).json({ message: 'State created successfully', state: newState });
} catch (error) {
    console.error('Error creating state:', error);
    res.status(500).json({ error: error.message });
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



module.exports = { createState, getAllStates,  };