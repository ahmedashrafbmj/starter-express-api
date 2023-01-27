const mongoose = require('mongoose');

const weightSchema = mongoose.Schema({

    upto500Gram: {type:Number},
    fivehundred1to1kg: {type:Number},
    eachkg: {type:Number},

    userEmail: {type: String},
    hotelname : {type: String}

}) 


const weightModel = mongoose.model('weightData',weightSchema);

module.exports = weightModel;