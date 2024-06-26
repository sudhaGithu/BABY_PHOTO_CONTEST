const express = require('express');
const router = express.Router();
const ParticipantController = require('../controllers/participantController');
const voteRestrictions = require('../middleware/voteRestrictions');
const authUser = require('../middleware/authenticateToken')


router.post('/addparticipant', authUser, ParticipantController.uploadImage, ParticipantController.participate);
router.post('/getAllparticipants', authUser,  ParticipantController.getParticipants);
router.post('/getparticipant', authUser,  ParticipantController.getParticipantByBabyCode);
router.put('/updateparticipate/:id', authUser,  ParticipantController.uploadImage, ParticipantController.updateParticipant);

router.post('/voteforbaby', authUser,  voteRestrictions, ParticipantController.voteForParticipant);
router.post('/unvote', authUser,  ParticipantController.unvoteForParticipant);
router.post('/votesbybabycode', authUser,  ParticipantController.getVotesForParticipant);
router.get('/getallweekly', ParticipantController.getWeeklyParticipants)

module.exports = router;

