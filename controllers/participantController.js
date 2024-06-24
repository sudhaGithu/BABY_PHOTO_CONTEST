const Participant = require('../models/participantModel');
const upload = require('../middleware/fileupload');  
const Sequence = require('../models/sequenceModel');
const moment = require('moment');
require('dotenv').config();

const ParticipantController = {
    uploadImage: upload.single('babyImage'),
    participate: async (req, res) => {
        try {
            
            const { name, babyAge, email, phone, state, district } = req.body;
            if(!req.file.filename)
                {
                    res.status(200).json({message:"file is mandatory"})
                }
            // Validate age
            if (babyAge > 5) {
                return res.status(400).json({ message: 'Only children 5 years old or younger can participate' });
            }
            // Fetch and increment the sequence value
            let sequence = await Sequence.findOneAndUpdate(
                { name: 'participant' },
                { $inc: { value: 1 } },
                { new: true, upsert: true }
            );

            if (!sequence) {
                return res.status(500).json({ error: 'Failed to generate baby code' });
            }

            // Generate the baby code
            const babyCode = `BABY${sequence.value}`;
            console.log("sudha");
            console.log((process.env.BASE_URL));

            const profile_url = `${process.env.BASE_URL}/uploads/${req.file.filename}`
            // Create a new participant
            const newParticipant = new Participant({
                name: req.body.name,
                babyAge: req.body.babyAge,
                email: req.body.email,
                phone: req.body.phone,
                state: req.body.state,
                district: req.body.district,
                babyImage: profile_url,
                babyCode: babyCode,
                votes: 0 ,// Initialize votes to 0
                voters: []
            });
            console.log("participant saved");

            await newParticipant.save();
            res.status(200).json({ message: 'Participation successful', participant: newParticipant });
        } catch (error) {
            console.error('Error creating participant:', error);
            res.status(500).json({ error: 'please fill all fields' });
        }
    },

    getParticipants: async (req, res) => {
        try {
            const { state, district } = req.body;
    
            let query = {};
    
            // Check if state filter is provided
            if (state) {
                query.state = state;
            }
            else{
                res.status(200).json(
                    {
                        message:"there is no participants based on given fields"
                    }
                )
            }
    
            // Check if district filter is provided
            if (district) {
                query.district = district;
            }else{
                res.status(200).json(
                    {
                        message:"there is no participants based on given fields"
                    }
                )
            }
    
            const participants = await Participant.find(query);
            console.log(participants);
            if (participants.length === 0) {
                return res.status(404).json({ message: 'Participants not found', participants: undefined });
            }
            else
            {
            res.status(200).json(participants);
            }
            
        } catch (error) {
            console.error('Error fetching participants:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    getParticipantByBabyCode: async (req, res) => {
        try {
            const { babyCode } = req.body;
            console.log(babyCode);
            const participant = await Participant.findOne({ babyCode });

            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }

            res.status(200).json(participant);
        } catch (error) {
            console.error('Error fetching participant:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateParticipant: async (req, res) => {
        try {
            const { name, babyAge, email, phoneNumber, state, district } = req.body;
            const babyImage = req.file ? req.file.path : undefined;

            const updateData = {
                name,
                babyAge,
                email,
                phoneNumber,
                state,
                district,
            };
            if (babyImage) {
                updateData.babyImage = babyImage;
            }

            const participant = await Participant.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }

            res.status(200).json({ message: 'Participant updated successfully', participant });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteParticipant: async (req, res) => {
        try {
            const participant = await Participant.findByIdAndDelete(req.params.id);
            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }
            res.status(200).json({ message: 'Participant deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    voteForParticipant: async (req, res) => {
        try {
            const { babyCode, voterId } = req.body;
            const participant = await Participant.findOne({ babyCode:babyCode }); // assuming the voter ID is passed in the request body

            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }

            const voter = participant.voters.find(v => v.voterId === voterId);

            if (voter) {
                voter.lastVotedAt = new Date();
            } else {
                participant.voters.push({ voterId, lastVotedAt: new Date() });
            }

            // Increment the votes
            participant.votes += 1;
            await participant.save();

            res.status(200).json({ message: 'Vote counted successfully', participant });
        } catch (error) {
            console.error('Error voting:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    unvoteForParticipant: async (req, res) => {
        try {
            const { babyCode, voterId } = req.body;
            const participant = await Participant.findOne({ babyCode });
            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }

            // Check if the voter with given voterId exists in the participant's voters array
        const voterIndex = participant.voters.findIndex(v => v.voterId === voterId);


            
        if (voterIndex !== -1) {
            // Decrease the votes count
            participant.votes -= 1;

            // Remove the voter from the voters array
            participant.voters.splice(voterIndex, 1);

            // Save the updated participant
            await participant.save();
                res.status(200).json({ message: 'Unvote counted successfully', participant });
            } else {
                res.status(400).json({ message: 'you are not voted for this baby to unvote' });
            }



        } catch (error) {
            console.error('Error unvoting:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },
    getVotesForParticipant: async (req, res) => {
        try {
            const { babyCode } = req.body;
            const participant = await Participant.findOne({ babyCode });

            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }

            res.status(200).json({message: 'votes', votes: participant.votes });
        } catch (error) {
            console.error('Error fetching votes:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },
};

module.exports = ParticipantController;
