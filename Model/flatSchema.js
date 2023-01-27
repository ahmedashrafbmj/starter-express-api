const mongoose = require('mongoose');

const flatSchema = mongoose.Schema({

    flat: {type:Number},
    userEmail: {type: String},
    hotelname : {type: String}

}) 


const flatModel = mongoose.model('flatData',flatSchema);

module.exports = flatModel;