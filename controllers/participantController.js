const Participant = require('../models/participantModel');
const upload = require('../middleware/fileupload');  
const Sequence = require('../models/sequenceModel');
const moment = require('moment');

const ParticipantController = {
    uploadImage: upload.single('babyImage'),
    participate: async (req, res) => {
        try {
            const { name, babyAge, email, phone, state, district } = req.body;

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

            // Create a new participant
            const newParticipant = new Participant({
                name: req.body.name,
                babyAge: req.body.babyAge,
                email: req.body.email,
                phone: req.body.phone,
                state: req.body.state,
                district: req.body.district,
                babyImage: req.file.filename,
                babyCode: babyCode,
                votes: 0 ,// Initialize votes to 0
                voters: []
            });

            await newParticipant.save();
            res.status(200).json({ message: 'Participation successful', participant: newParticipant });
            // res.status(201).json(newParticipant);
        } catch (error) {
            console.error('Error creating participant:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // getParticipants: async (req, res) => {
    //     try {
    //         const participants = await Participant.find();
    //         res.status(200).json(participants);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Server error' });
    //     }
    // },

    getParticipants: async (req, res) => {
        try {
            const { state, district } = req.body;
    
            let query = {};
    
            // Check if state filter is provided
            if (state) {
                query.state = state;
            }
    
            // Check if district filter is provided
            if (district) {
                query.district = district;
            }
    
            const participants = await Participant.find(query);
    
            res.status(200).json(participants);
        } catch (error) {
            console.error('Error fetching participants:', error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // getParticipant: async (req, res) => {
    //     try {
    //         const participant = await Participant.findById(req.params.id);
    //         if (!participant) {
    //             return res.status(404).json({ error: 'Participant not found' });
    //         }
    //         res.status(200).json(participant);
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Server error' });
    //     }
    // },

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
    // voteForParticipant: async (req, res) => {
    //     try {
    //         const { babyCode } = req.body;
    //         const participant = await Participant.findOne({ babyCode });
    //         if (!participant) {
    //             return res.status(404).json({ error: 'Participant not found' });
    //         }

    //         // Increment the votes
    //         participant.votes += 1;
    //         await participant.save();

    //         res.status(200).json({ message: 'Vote counted successfully', participant });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Server error' });
    //     }
    // },

    voteForParticipant: async (req, res) => {
        try {
            const { babyCode, voterId } = req.body;
            const participant = await Participant.findOne({ babyCode }); // assuming the voter ID is passed in the request body

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
            const { babyCode } = req.body;
            const participant = await Participant.findOne({ babyCode });
            if (!participant) {
                return res.status(404).json({ error: 'Participant not found' });
            }

            // Decrement the votes only if the votes are greater than 0
            if (participant.votes > 0) {
                participant.votes -= 1;
                await participant.save();
                res.status(200).json({ message: 'Unvote counted successfully', participant });
            } else {
                res.status(400).json({ error: 'No votes to remove' });
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