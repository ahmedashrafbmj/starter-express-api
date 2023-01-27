///booking add data
const categoryModel = require('../Model/categorySchema')

const authcategorydata = (req, res)=>{
    
    

    let categorypostCreate = new categoryModel({

        categoryName: req.body.categoryName, 
        imageURL: req.body.imageURL,
        userEmail: req.body.userEmail,
        hotelname: req.body.hotelname,


    })
    
    categorypostCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "Category Data Successfully"})

        console.log(categorypostCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "Category Data Not Successfully"})
    })

}


//getsingleuserid

const getcatid = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await categoryModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}


// delete cat
const deletecat = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletsignupuser = await categoryModel.findByIdAndDelete({_id:id})
        console.log(deletsignupuser);
        res.status(201).json(deletsignupuser);

    } catch (error) {
        res.status(422).json(error);
    }
}



// update user data

const catupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await categoryModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}


//get all category data

const getallcategory = async(req, res)=>{
    const allgetcategory = await categoryModel.find();
    res.json(allgetcategory);

}



module.exports = {authcategorydata, getallcategory, getcatid, deletecat, catupdate}