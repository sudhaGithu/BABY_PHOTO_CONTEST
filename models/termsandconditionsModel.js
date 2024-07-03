const mongoose = require('mongoose');

const termsAndConditionsSchema = new mongoose.Schema({
    content:String
});

const termsAndConditions = mongoose.model('termsandconditions', termsAndConditionsSchema);

module.exports = termsAndConditions;
