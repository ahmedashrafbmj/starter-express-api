const mongoose = require('mongoose');



const carouselSchema = mongoose.Schema({

    imageURL: {type:Array},
    userEmail: {type: String},
    hotelname : {type: String}

}) 


const carouselModel = mongoose.model('carouselData',carouselSchema);

module.exports = carouselModel;