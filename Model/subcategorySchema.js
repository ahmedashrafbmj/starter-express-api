const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({

    categoryName: {type:String},
    subcategoryName: {type:String},
    imageURL: {type:String},
    userEmail: {type: String},
    hotelname : {type: String}

}) 


const subcategoryModel = mongoose.model('subcategoryData',subcategorySchema);

module.exports = subcategoryModel;