///booking add data
const bookingModel = require('../Model/bookingSchema')

const authbookingdata = async (req, res, next)=>{
    
    let Order = await bookingModel.create(req.body);
    res.status(201).json({
        success: true,
        Order,
        next
    })


    

    // let bookpostCreate = new bookingModel({


    //     cartItems: req.body.cartItems,
    //     hotelname: req.body.hotelname,
    //     hotelemail: req.body.hotelemail,
    //     hotelDate: req.body.hotelDate,
    //     userEmail: req.body.userEmail,
    //     paymentstatus: req.body.paymentstatus,
      

    // })
    
    // bookpostCreate.save()
    // .then((response)=>{
    //     console.log(`response success`)

    //     res.status(200).send({result: response, Message: "Post Data Successfully"})

    //     console.log(bookpostCreate)

    // }).catch((err)=>{
    //     res.status(400).send({result: err, Message: "Post Data Not Successfully"})
    // })



}



//get post by email user

const getbookbyemail = async(req, res)=>{
    const {userEmail} = req.params;
    const allbookemail = await bookingModel.find({userEmail: userEmail});
    res.json(allbookemail);

}




//get post by email admin

const getbookbyemailadmin = async(req, res)=>{
    const {hotelemail} = req.params;
    const allbookemailadmin = await bookingModel.find({hotelemail: hotelemail});
    res.json(allbookemailadmin);

}


//getsingleuserid

const getbookingpckid = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await bookingModel.findOne({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}

//delivered data

const getDelivered = async(req, res)=>{
    try {

        const deliveredProd = await bookingModel.find({paymentstatus: "Delivered"});
        console.log(deliveredProd);
        res.status(201).json(deliveredProd)

    } catch (error) {
        res.status(422).json(error);
    }
}


// delete orders
const deleteorders = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletordersuser = await bookingModel.findByIdAndDelete({_id:id})
        console.log(deletordersuser);
        res.status(201).json(deletordersuser);

    } catch (error) {
        res.status(422).json(error);
    }
}



// update orders data

const ordersupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updatedorder = await bookingModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updatedorder);
        res.status(201).json(updatedorder);

    } catch (error) {
        res.status(422).json(error);
    }
}



module.exports = {authbookingdata, getbookbyemail, getbookbyemailadmin, getbookingpckid, deleteorders, ordersupdate, getDelivered}