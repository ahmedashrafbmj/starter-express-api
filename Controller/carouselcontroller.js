///booking add data
const carouselModel  = require('../Model/carouselSchema');

const authcarouseldata = (req, res)=>{
    
    

    let carouselpostCreate = new carouselModel({

        imageURL: req.body.imageURL, 
        userEmail: req.body.userEmail,
        hotelname: req.body.hotelname,


    })
    
    carouselpostCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "carousel Data Successfully"})

        console.log(carouselpostCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "carousel Data Not Successfully"})
    })

}


//getsingleuserid

const getcarouselid = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await carouselModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}


// delete cat
const deletecarousel = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletsignupuser = await carouselModel.findByIdAndDelete({_id:id})
        console.log(deletsignupuser);
        res.status(201).json(deletsignupuser);

    } catch (error) {
        res.status(422).json(error);
    }
}



// // update user data

const carouselupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await carouselModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}


//get all area data

const getallcarousel = async(req, res)=>{
    const allgetcarousel = await carouselModel.find();
    res.json(allgetcarousel);

}



module.exports = {authcarouseldata, getallcarousel, getcarouselid, carouselupdate, deletecarousel}