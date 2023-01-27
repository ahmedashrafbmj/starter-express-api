const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    categoryName: {type:String},
    imageURL: {type:String},
    userEmail: {type: String},
    hotelname : {type: String}

}) 


const categoryModel = mongoose.model('categoryData',categorySchema);

module.exports = categoryModel;