///booking add data
const flatModel = require('../Model/flatSchema')

const authflatdata = (req, res)=>{
    
    

    let flatpostCreate = new flatModel({

        flat: req.body.flat, 
        userEmail: req.body.userEmail,
        hotelname: req.body.hotelname,


    })
    
    flatpostCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "flat Data Successfully"})

        console.log(flatpostCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "flat Data Not Successfully"})
    })

}


//getsingleuserid

const getflatid = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await flatModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}





// update user data

const flatupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await flatModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}


//get all category data

const getallflat = async(req, res)=>{
    const allgetflat = await flatModel.find();
    res.json(allgetflat);

}



module.exports = {authflatdata, getflatid, flatupdate, getallflat}