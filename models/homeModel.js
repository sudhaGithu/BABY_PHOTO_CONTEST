const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    content: [{para: String}],
});

const home = mongoose.model('home', homeSchema);
module.exports = home;