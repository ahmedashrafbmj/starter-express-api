const mongoose = require('mongoose');



const cartSchema = mongoose.Schema({

    _id: {type: String},
    cartQuantity: {type: Number},
    hotelname: {type: String},
    imageURL: {type: String},
    productName: {type: String},
    productPrice: {type: Number},
    qty: {type: Number},
    userEmail: {type: String},
    prodmarketname: {type: String},
    prodarea: {type: String},
    category: {type: String},
    productTitle: {type: String},
    productWeight: {type: String},
    productSize: {type: String},
    productColor: {type: String},

    dt: {
        type: Date,
        default: Date.now,
    }



})

const bookSchema = mongoose.Schema({

  
    hotelname: {type: String},
    hotelemail:{type: String},
    hotelDate: {type: String},
    paymentstatus : {type: String},
    userEmail: {type: String},
    
    orderContact: {type: Number},
    shippingOne: {type: String},
    shippingTwo: {type: String},
    orderCity: {type: String},
    orderState: {type: String},
    totalBillAmount: {type: Number},
    deliveryChargesOne: {type: Number},
    deliveryChargesTwo: {type: Number},
    totalNetAmount: {type: Number},
    


    cartItems : [cartSchema]


}) 


const bookingModel = mongoose.model('bookingData',bookSchema);

module.exports = bookingModel;