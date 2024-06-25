const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    home: [{
        heading: { type: String, require: true },
        para: { type: Array }
    }]
});

const home = mongoose.model('home', homeSchema);
module.exports = home;