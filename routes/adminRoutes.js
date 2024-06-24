const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminCotroller');
const termsAndConditionsController = require('../controllers/termsAndConditions')
const rulesController = require('../controllers/rulesController')
const homeController = require('../controllers/homeController')
const adminAuth = require('../middleware/auth');
const winnerController = require('../controllers/winnerController')
const participantController = require('../controllers/participantController')
const districtController = require('../controllers/districtController')
const stateController = require('../controllers/stateController')


router.post('/addadmin', adminController.createAdmin );
router.post('/adminlogin', adminController.loginAdmin);
router.get('/dashboard' , adminAuth,adminController.dashboardforadmin)

// routes for terms and conditions
router.post('/createTermsAndConditions',adminAuth,termsAndConditionsController.createtermsAndConditions);
router.post('/addTermsAndConditions/:id',adminAuth, termsAndConditionsController.addtermsAndConditionsById);


// routes for rules
router.post('/createrules',adminAuth,rulesController.createRules );
router.post('/addrules/:id',adminAuth,rulesController.addRuleById);


// for home 
router.post('/createHome',adminAuth ,homeController.createHome);
router.post('/addHome/:id',adminAuth ,homeController.addHomeById);

// add winner
router.post('/addwinner',adminAuth, winnerController.addWinner)

//add district
router.post('/adddistrict',adminAuth, districtController.createDistrict);

//add state
router.post('/addstate',adminAuth, stateController.createState);

//delete participant
router.delete('/deleteparticipate/:id',adminAuth,  participantController.deleteParticipant);

// router.put('/updateparticipate/:id', ParticipantController.uploadImage, ParticipantController.updateParticipant);
// router.delete('/deleteparticipate/:id', ParticipantController.deleteParticipant);
// router.post('/voteforbaby', voteRestrictions, ParticipantController.voteForParticipant);
// router.post('/unvote', ParticipantController.unvoteForParticipant);
// router.post('/votesbybabycode', ParticipantController.getVotesForParticipant);

module.exports = router;
