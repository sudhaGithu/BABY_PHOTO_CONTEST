const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  name: {
    type: String,
    required: true
  },

//   code: {
//     type: String,
//     required: true,
//     unique: true
// }
}, {
  timestamps: true
});

const State = mongoose.model('State', stateSchema);
module.exports = State;