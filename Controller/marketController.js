///booking add data
const marketModel  = require('../Model/marketSchema');

const authmarketdata = (req, res)=>{
    
    

    let marketpostCreate = new marketModel({

        marketName: req.body.marketName,
        areaName: req.body.areaName, 
        userEmail: req.body.userEmail,
        hotelname: req.body.hotelname,


    })
    
    marketpostCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "Market Data Successfully"})

        console.log(marketpostCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "Market Data Not Successfully"})
    })

}


// //getsingleuserid

// const getcatid = async(req, res)=>{
//     try {
//         console.log(req.params);
//         const {id} = req.params;

//         const userindividual = await categoryModel.findById({_id:id});
//         console.log(userindividual);
//         res.status(201).json(userindividual)

//     } catch (error) {
//         res.status(422).json(error);
//     }
// }


// // delete cat
// const deletecat = async(req,res)=>{
//     try {
//         const {id} = req.params;

//         const deletsignupuser = await categoryModel.findByIdAndDelete({_id:id})
//         console.log(deletsignupuser);
//         res.status(201).json(deletsignupuser);

//     } catch (error) {
//         res.status(422).json(error);
//     }
// }



// // update user data

// const catupdate = async(req,res)=>{
//     try {
//         const {id} = req.params;

//         const updateduser = await categoryModel.findByIdAndUpdate(id,req.body,{
//             new:true
//         });

//         console.log(updateduser);
//         res.status(201).json(updateduser);

//     } catch (error) {
//         res.status(422).json(error);
//     }
// }


// //get all category data

// const getallcategory = async(req, res)=>{
//     const allgetcategory = await categoryModel.find();
//     res.json(allgetcategory);

// }

//get allareaName

const getareaName = async(req, res)=>{
    const {areaName} = req.params;
    const allareaName = await marketModel.find({areaName: areaName});
    res.json(allareaName);

}


module.exports = {authmarketdata, getareaName}