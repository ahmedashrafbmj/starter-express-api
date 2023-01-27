const mongoose = require('mongoose');

const marketSchema = mongoose.Schema({

    marketName: {type:String},
    areaName: {type:String},
    userEmail: {type: String},
    hotelname : {type: String}

}) 


const marketModel = mongoose.model('marketData',marketSchema);

module.exports = marketModel;