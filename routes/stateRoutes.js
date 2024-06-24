const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const authUser = require('../middleware/authenticateToken')

router.post('/addstate',authUser, stateController.createState);
router.get('/states',authUser, stateController.getAllStates);

module.exports = router;
