// models/winner.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const winnerSchema = new Schema({
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
    datenow: { type: Date, required: true, default:Date.now() },
});

const Winner = mongoose.model('Winner', winnerSchema);
module.exports = Winner;
