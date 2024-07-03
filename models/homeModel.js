const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
   content:String
});

const home = mongoose.model('home', homeSchema);
module.exports = home;