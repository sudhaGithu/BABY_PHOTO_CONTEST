const Participant = require('../models/participantModel');
const moment = require('moment');

const voteRestrictions = async (req, res, next) => {
    try {
        const { babyCode, voterId } = req.body;
        const participant = await Participant.findOne({ babyCode : babyCode});

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        // Check if today is between Monday and Saturday
        const today = moment().isoWeekday();
        if (today === 7) { // 7 is Sunday
            return res.status(403).json({ error: 'Voting is not allowed on Sunday' });
        }

        // Check if the voter has voted in the last 30 minutes
        const voter = participant.voters.find(v => v.voterId === voterId);

        if (voter) {
            const lastVotedAt = moment(voter.lastVotedAt);
            const now = moment();
            const diffInMinutes = now.diff(lastVotedAt, 'minutes');

            if (diffInMinutes < 30) {
                return res.status(403).json({ error: 'You can only vote once every 30 minutes for the same participant' });
            }
        }

        next();
    } catch (error) {
        console.error('Error in vote restrictions middleware:', error);
        res.status(500).json({ message: 'Unable to vote' });
    }
};

module.exports = voteRestrictions;
