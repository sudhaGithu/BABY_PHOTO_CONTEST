const mongoose = require('mongoose');

const termsAndConditionsSchema = new mongoose.Schema({
    // Eligibility: [{para: String}],
    // Voting_Process: [{para: String}],
    // Winner_selection: [{para: String}],
    // Gift_Vocher:[{para: String}],
    // Privacy: [{para: String}],
    // Reporting_Issues: [{para: String}],
    termsAndConditions: [{
        heading: { type: String, require: true },
        para: { type: Array }
    }]
});

const termsAndConditions = mongoose.model('termsandconditions', termsAndConditionsSchema);

module.exports = termsAndConditions;
