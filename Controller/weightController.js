///booking add data

const weightModel = require('../Model/weightSchema')

const authweightdata = (req, res)=>{
    
    

    let weightpostCreate = new weightModel({

        upto500Gram: req.body.upto500Gram,
        fivehundred1to1kg: req.body.fivehundred1to1kg, 
        eachkg: req.body.eachkg,
        
        userEmail: req.body.userEmail,
        hotelname: req.body.hotelname,


    })
    
    weightpostCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "weight Data Successfully"})

        console.log(weightpostCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "weight Data Not Successfully"})
    })

}


//getsingleuserid

const getweightid = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await weightModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}





// update user data

const weightupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await weightModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}


//get all category data

const getallweight = async(req, res)=>{
    const allgetflat = await weightModel.find();
    res.json(allgetflat);

}



module.exports = {authweightdata, getweightid, weightupdate, getallweight}