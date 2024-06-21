// models/sequenceModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sequenceSchema = new Schema({
    name: { type: String, required: true, unique: true },
    value: { type: Number, default: 1000 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
