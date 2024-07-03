const express = require('express');
const router = express.Router();
const districtController = require('../controllers/districtController');
const authUser = require('../middleware/authenticateToken')

router.get('/districts/:id', authUser, districtController.getDistrictsByState);

module.exports = router;
