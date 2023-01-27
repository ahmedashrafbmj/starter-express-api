
const authModel = require('../Model/signupschema');
const postModel = require('../Model/postSchema');
const bcrypt = require("bcryptjs");
const bookingModel = require('../Model/bookingSchema')
const MultipleFile = require('../Model/multiplefile');

///signup api

const authSignUp=async(req,res)=>{
    
    try {
        
        const { email, password, role, name, hotelname, contact, address, city, area, marketname, cnic, img, accountsstatus } = await  req.body;
        console.log(req.body,'req.body')

        const checkUser = await authModel.findOne({email:email})
console.log(checkUser,'checkUser')

if(checkUser){
    return res.status(400).send({ success: false, message: "user already registered" });

}else{
    const hastPass = await bcrypt.hash(password,12);
    const userCreate = new authModel({email,pass:hastPass,role,name,hotelname, contact, address, city, area, marketname, cnic, img, accountsstatus}) //store into Database
    userCreate.save()
    .then((response)=>{
        return res.status(200).send({ success: true, message:"Successfully Registered"})
    })
    .catch(()=>{
        return res.status(400).send({ success: false, message:"error"})
    })
}
    }
catch (e) {
    return res.status(401).send({ success: false, message: e.message });
  }
}




///signin api

const authsignin=async(req,res)=>{
    try {
console.log(req.body,'req.body')
let {email,password} = await req.body;
const checkUser = await authModel.findOne({email:email})

if(checkUser){
console.log(checkUser,'checkUser')
    const passTest = await bcrypt.compare(password,checkUser.pass)
    if(passTest){
        return res.status(200).send({
            message: "login successfull",
            success: true,
        data:{userId:checkUser._id,email:checkUser. email}})
    }else{
        return res.status(400).send({success:false,message:"Password Incorrect!"})
        return alert(data.Message)
    }

}else{
    return res.status(400).send({ success: false, message:"Email Not Found"}) 
}

    }
    catch(e){
        console.log(e,'eeee')
        return res.status(401).send({ success: false, message: e.message });
    }
}







///Add Post Data

const authPostdata = async (req, res, next)=>{
    
    // let addProducts = await postModel.create(req.body);
    // res.status(201).json({
    //     success: true,
    //     addProducts,
    //     next




    const postCreate = new postModel({

        productName: req.body.productName, 
        productPrice: req.body.productPrice,
        productwasPrice: req.body.productwasPrice,
        imageURL: req.body.imageURL,
        userEmail: req.body.userEmail,
        qty: req.body.qty,
        category: req.body.category,
        hotelname: req.body.hotelname,
        prodmarketname: req.body.prodmarketname,
        prodarea: req.body.prodarea,
        productTitle: req.body.productTitle,
        productWeight: req.body.productWeight,
        productSize: req.body.productSize,
        productColor: req.body.productColor,
        multiProd: req.body.multiProd,
        files: req.body.files

        
    })
    
    postCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "Post Data Successfully"})

        console.log(postCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "Post Data Not Successfully"})
    })

}



const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}


//get all post data

const getallPost = async(req, res)=>{
    const allpost = await postModel.find();
    res.json(allpost);

}



//get all post data by categoryname

const getallPostbycategory = async(req, res)=>{
    const {productName} = req.params;

    const allpostcategory = await postModel.find({productName: productName});

    res.json(allpostcategory);

}


//get all post data by subcategoryname

const getallPostbysubcategory = async(req, res)=>{
    const {qty} = req.params;

    const allpostsubcategory = await postModel.find({qty: qty});

    res.json(allpostsubcategory);

}

//get all book data

const getallBook = async(req, res)=>{
    const allpostbook = await bookingModel.find();
    res.json(allpostbook);

}


//get all signup

const getallSignup = async(req, res)=>{
    const allsignup = await authModel.find();
    res.json(allsignup);

}

//get post by email

const getpostbyemail = async(req, res)=>{
    const {userEmail} = req.params;
    const allpostemail = await postModel.find({userEmail: userEmail});
    res.json(allpostemail);

}


//get post Signup by email

const getpostsignupbyemail = async(req, res)=>{
    const {email} = req.params;
    const {accountsstatus}= req.params;

    const allpostemailsignup = await authModel.find({email: email});
    res.json(allpostemailsignup);

}


//getsingleuserid

const getpostbyID = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await postModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}


// update user data

const postupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await postModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}


// delete post picture
const postdelete = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await postModel.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
}


// delete post picture
const deletesignup = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletsignupuser = await authModel.findByIdAndDelete({_id:id})
        console.log(deletsignupuser);
        res.status(201).json(deletsignupuser);

    } catch (error) {
        res.status(422).json(error);
    }
}


//getsingle profile id

const getprofid = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await authModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}


// update profile data

const profileupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await authModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}

//getlast multiple pictures

const getLastmulti = async(req, res)=>{
    try {
        // console.log(req.params);
        // const {id} = req.params;

        const lastmulti = await MultipleFile.find().sort({_id: -1}).limit(1);
        console.log(lastmulti);
        res.status(201).json(lastmulti)

    } catch (error) {
        res.status(422).json(error);
    }
}


const getmarketName = async(req, res)=>{
    const {marketname} = req.params;
    const allmarketname = await authModel.find({marketname: marketname});
    res.json(allmarketname);

}

const getshopName = async(req, res)=>{
    const {hotelname} = req.params;
    const allshopname = await postModel.find({hotelname: hotelname});
    res.json(allshopname);
}

module.exports = {authSignUp, authPostdata, authsignin, getallPost, getpostbyID, postupdate, postdelete, getpostbyemail, getpostsignupbyemail, getallSignup, getallBook, getallPostbycategory, getallPostbysubcategory, deletesignup, getprofid, profileupdate, getLastmulti, getmarketName, getshopName}