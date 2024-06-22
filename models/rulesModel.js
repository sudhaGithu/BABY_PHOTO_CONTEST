const mongoose = require('mongoose');

const rulesSchema = new mongoose.Schema({
    Voting_Frequency: [{para: String}],
    Voting_Period: [{para: String}],
    Duplicate_Voting: [{para: String}],
    Suspicious_Activity:[{para: String}],
    Winner_Selection: [{para: String}],
    Gift_Voucher_Delivery: [{para: String}],
    Testimonial_Requirement: [{para: String}],
    Privacy_Assurance: [{para: String}],
});

const rules = mongoose.model('rules', rulesSchema);
module.exports = rules;