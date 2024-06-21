const express = require('express');
const router = express.Router();
const ParticipantController = require('../controllers/participantController');
const voteRestrictions = require('../middleware/voteRestrictions');


router.post('/addparticipant', ParticipantController.uploadImage, ParticipantController.participate);
router.post('/getAllparticipants', ParticipantController.getParticipants);
router.post('/getparticipant', ParticipantController.getParticipantByBabyCode);
router.put('/updateparticipate/:id', ParticipantController.uploadImage, ParticipantController.updateParticipant);
router.delete('/deleteparticipate/:id', ParticipantController.deleteParticipant);
router.post('/voteforbaby', voteRestrictions, ParticipantController.voteForParticipant);
router.post('/unvote', ParticipantController.unvoteForParticipant);
router.post('/votesbybabycode', ParticipantController.getVotesForParticipant);

module.exports = router;
