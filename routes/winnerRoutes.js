const winnerController=require('../controllers/winnerController')
// require('dotenv').config();
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/getallwinners', winnerController.getAllWinners)

module.exports = router;