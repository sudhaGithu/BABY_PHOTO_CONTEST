const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');
const authUser = require('../middleware/authenticateToken')
const processController = require('../controllers/processController')
const adminAuth = require('../middleware/auth')


router.get('/gethomeCount', homePageController.gethomeCount );
router.get('/getrecentwinner', homePageController.getMostRecentWinner)
router.get('/getcountbystates', homePageController.getParticpantsByState)

// by process controller
router.post('/createprocess', adminAuth, processController.createprocess)
router.get('/getprocess',  processController.getprocess)

// subscription
router.post('/createsubscription',homePageController.createsubscription )

module.exports = router;
