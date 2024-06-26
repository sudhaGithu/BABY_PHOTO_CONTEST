
const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
    Process: [{
        heading: { type: String, require: true },
        para: { type: Array }
    }]
});

const Process = mongoose.model('Process', ProcessSchema);
module.exports = Process;