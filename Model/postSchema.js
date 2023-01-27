const mongoose = require('mongoose');

const multiprodSchema = mongoose.Schema({


    productSize: {type: String},
    productColor: {type: String},
    otherQty: {type: String},

    dt: {
        type: Date,
        default: Date.now,
    }


})


const lastmultiprodSchema = mongoose.Schema({

    fileName: {type: String},
    filePath: {type: String},
    fileType: {type: String},
    fileSize: {type: String},



    dt: {
        type: Date,
        default: Date.now,
    }


})



const postSchema = mongoose.Schema({



    productName: {type:String},
    productPrice: {type: Number},
    productwasPrice: {type: Number},
    imageURL: {type:String},
    userEmail:{type:String},
    qty:{type:Number},
    category:{type:String},
    hotelname: {type: String},
    prodmarketname:{type:String},
    prodarea: {type: String},
    productTitle: {type: String},
    productWeight: {type: Number},
    productSize: {type: String},
    productColor: {type: String},
    multiProd: [multiprodSchema],
    files: [lastmultiprodSchema]

}) 


const postModel = mongoose.model('postData',postSchema);

module.exports = postModel;