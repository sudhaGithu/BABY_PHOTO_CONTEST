const winnerController=require('../controllers/winnerController')
// require('dotenv').config();
const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authenticateToken')

router.use(express.json());

router.get('/getallwinners', authUser, winnerController.getAllWinners)

module.exports = router;