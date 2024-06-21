const express = require('express');
const router = express.Router();
const districtController = require('../controllers/districtController');

router.post('/adddistrict', districtController.createDistrict);
router.get('/districts', districtController.getAllDistricts);

module.exports = router;
