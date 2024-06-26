const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    babyAge: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true  },
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true  },
    babyImage: { type: String, required: true },
    babyCode: { type: String, required: true, unique: true },
    votes: { type: Number, default:0 },
    voters: [{
        voterId: String,
        lastVotedAt: Date
    }],
    createdAt: { type: Date, default: Date.now }
});

const Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;
