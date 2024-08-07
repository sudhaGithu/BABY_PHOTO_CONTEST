// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const districtSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// const District = mongoose.model('District', districtSchema);
// module.exports = District;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const districtSchema = new Schema({
    name: { type: String, required: true },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
},
{
   timestamps: true
});


const District = mongoose.model('District', districtSchema);
module.exports = District;
