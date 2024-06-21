const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');

router.post('/addstate', stateController.createState);
router.get('/states', stateController.getAllStates);

module.exports = router;
