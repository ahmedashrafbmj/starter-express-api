///subcategory add data

const subcategoryModel = require('../Model/subcategorySchema')

const authsubcategorydata = (req, res)=>{
    
    

    let subcategorypostCreate = new subcategoryModel({

        categoryName: req.body.categoryName, 
        subcategoryName: req.body.subcategoryName, 
        imageURL: req.body.imageURL,
        userEmail: req.body.userEmail,
        hotelname: req.body.hotelname,


    })
    
    subcategorypostCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "Category Data Successfully"})

        console.log(subcategorypostCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "Category Data Not Successfully"})
    })

}


//get all subcategory data

const getallsubcategory = async(req, res)=>{
    const allgetsubcategory = await subcategoryModel.find();
    res.json(allgetsubcategory);

}

//get all post data by categoryname

const getallPostbysubcategory = async(req, res)=>{

    
    const {categoryName} = req.params;
    const allpostsubcategory = await subcategoryModel.find({categoryName: categoryName});

    res.json(allpostsubcategory);

}

//get all post data by categoryname

const getallPostbysubcategory2 = async(req, res)=>{

    
    const {subcategoryName} = req.params;
    const allpostsubcategory2 = await subcategoryModel.find({subcategoryName: subcategoryName});

    res.json(allpostsubcategory2);

}



module.exports = {authsubcategorydata, getallsubcategory, getallPostbysubcategory,getallPostbysubcategory2}