const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminCotroller');
const termsAndConditionsController = require('../controllers/termsAndConditions')
const rulesController = require('../controllers/rulesController')
const homeController = require('../controllers/homeController')
const adminAuth = require('../middleware/auth');
const winnerController = require('../controllers/winnerController')


router.post('/addadmin', adminController.createAdmin );
router.post('/adminlogin', adminController.loginAdmin);
router.get('/dashboard' ,adminController.dashboardforadmin)

// routes for terms and conditions
router.post('/createTermsAndConditions',termsAndConditionsController.createtermsAndConditions);
router.post('/addTermsAndConditions/:id', termsAndConditionsController.addtermsAndConditionsById);


// routes for rules
router.post('/createrules',rulesController.createRules );
router.post('/addrules/:id',rulesController.addRuleById);


// for home 
router.post('/createHome',adminAuth ,homeController.createHome);
router.post('/addHome/:id',adminAuth ,homeController.addHomeById);

// add winner
router.post('/addwinner', winnerController.addWinner)

// router.put('/updateparticipate/:id', ParticipantController.uploadImage, ParticipantController.updateParticipant);
// router.delete('/deleteparticipate/:id', ParticipantController.deleteParticipant);
// router.post('/voteforbaby', voteRestrictions, ParticipantController.voteForParticipant);
// router.post('/unvote', ParticipantController.unvoteForParticipant);
// router.post('/votesbybabycode', ParticipantController.getVotesForParticipant);

module.exports = router;
