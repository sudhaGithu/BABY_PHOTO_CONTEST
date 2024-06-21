const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersequenceSchema = new Schema({
    name: { type: String, required: true },
    value: { type: Number, default: 1000 }
});

const Sequence = mongoose.model('userSequence', usersequenceSchema);

module.exports = Sequence;
