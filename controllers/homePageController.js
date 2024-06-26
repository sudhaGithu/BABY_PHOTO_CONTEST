const express = require('express');
const router = express.Router();

const participantsModel = require('../models/participantModel');
const otpgeneratorModel = require('../models/generateOtp');
const winnersModel = require('../models/winners');
const Participant = require('../models/participantModel')
const State = require('../models/stateModel');
const subscriptionModel = require('../models/subscription')

// Route to get counts of documents in each model
const gethomeCount = async (req, res) => {
    try {
        const participantsCount = await participantsModel.countDocuments();
        const otpgeneratorCount = await otpgeneratorModel.countDocuments();
        const winnersCount = await winnersModel.countDocuments();

        res.status(200).json({
            participants:participantsCount,
            HappyEntrans: otpgeneratorCount,
            winners:winnersCount
        });
    } catch (error) {
        console.error('Error fetching document counts:', error);
        res.status(500).json({ error: 'Unable to fetch document counts' });
    }
};

const getMostRecentWinner = async (req, res) => {
    try {
        console.log("sudha");
        const recentWinner = await winnersModel.findOne().sort({ _id: -1 }).limit(1).populate('winner').exec();
        res.status(200).json(recentWinner)
        return recentWinner;
    } catch (error) {
        console.error('Error fetching recent winner:', error);
        res.status(500).json({ error: 'Unable to fetch recent winner' });
        throw error;
    }
};

const getParticpantsByState = async (req, res) => {
    try {
        const participantCounts = await Participant.aggregate([
            {
                $group: {
                    _id: '$state',  // Group by state ObjectId
                    count: { $sum: 1 }  // Count documents in each group
                }
            },
            {
                $lookup: {
                    from: 'states',  // Name of the State collection
                    localField: '_id',
                    foreignField: '_id',
                    as: 'stateDetails'
                }
            },
            {
                $project: {
                    stateName: { $arrayElemAt: ['$stateDetails.name', 0] },  // Retrieve state name
                    count: 1,
                    _id: 0
                }
            }
        ]);
        console.log(participantCounts);
        // Construct the response object with state names as keys
        const result = {};
        participantCounts.forEach(item => {
            console.log(item , item.stateName);
            result[item.stateName] = item.count;
        });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching participants by state:', error);
        res.status(500).json({ error: 'Unable to fetch participants by state' });
    }
};


const createsubscription = async (req, res) => {
    try {
 
            const createdHome = await subscriptionModel.create(req.body);
            res.status(201).json(createdHome);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    gethomeCount,
    getMostRecentWinner,
    getParticpantsByState,
    createsubscription
};