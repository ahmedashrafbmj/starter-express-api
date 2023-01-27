
const express = require("express");
const router = express.Router();
const authCon = require('../Controller/index')
const authbook = require('../Controller/bookingcontroller')
const authcategory = require('../Controller/categorycontroller')
const autharea = require('../Controller/areacontroller')
const authcarousel = require('../Controller/carouselcontroller')
const authmarket = require('../Controller/marketController')
const authsubcategory = require('../Controller/subcategorycontrollers')
const authflat =  require('../Controller/flatController')
const authweight =  require('../Controller/weightController')

const {upload} = require('../helpers/filehelper');

const {singleFileUpload, multipleFileUpload,
     getallSingleFiles, getallMultipleFiles} = require('../Controller/fileuploaderController');


router.post('/signup',authCon.authSignUp)
router.post('/postdata',authCon.authPostdata)
router.post('/signin',authCon.authsignin)

router.get('/lastmulti', authCon.getLastmulti)


router.get('/allpostdata', authCon.getallPost)
router.get('/postbyemail/:userEmail', authCon.getpostbyemail)
router.get('/getshopsproducts/:hotelname', authCon.getshopName)


router.get('/postbycategory/:productName', authCon.getallPostbycategory)
router.get('/postbysubcategory/:qty', authCon.getallPostbysubcategory)

router.get('/getuser/:id', authCon.getpostbyID)

router.patch('/updateuser/:id', authCon.postupdate)
router.delete('/deletepost/:id', authCon.postdelete)

//signup

router.get('/postbyemailsignup/:email', authCon.getpostsignupbyemail)
router.get('/allsignup', authCon.getallSignup)
router.delete('/deletesignup/:id', authCon.deletesignup)
router.get('/profileid/:id', authCon.getprofid)
router.patch('/profileupdate/:id', authCon.profileupdate)

router.get('/getmarket/:marketname', authCon.getmarketName)


///booking post
router.get('/allpostbook', authCon.getallBook)
router.post('/bookingpostdata',authbook.authbookingdata)
router.get('/allbookbyemail/:userEmail', authbook.getbookbyemail)
router.get('/allbookbyemailadmin/:hotelemail', authbook.getbookbyemailadmin)
router.get('/getbookuserid/:id', authbook.getbookingpckid)

router.delete('/deleteorders/:id', authbook.deleteorders)
router.patch('/ordersupdate/:id', authbook.ordersupdate)

router.get('/delivered', authbook.getDelivered)


/// category

router.post('/allpostcategory', authcategory.authcategorydata)
router.get('/catid/:id', authcategory.getcatid)
router.delete('/deletecat/:id', authcategory.deletecat)
router.get('/allgetcategory', authcategory.getallcategory)
router.patch('/catupdate/:id', authcategory.catupdate)

///area
router.post('/allpostarea', autharea.authareadata)
router.get('/allgetarea', autharea.getallarea)
router.get('/areaid/:id', autharea.getareaid)
router.patch('/areaupdate/:id', autharea.areaupdate)
router.delete('/deletearea/:id', autharea.deletearea)

///carousel
router.post('/allpostcarousel', authcarousel.authcarouseldata)
router.get('/allgetcarousel', authcarousel.getallcarousel)
router.get('/carouselid/:id', authcarousel.getcarouselid)
router.patch('/carouselupdate/:id', authcarousel.carouselupdate)
router.delete('/deletecarousel/:id', authcarousel.deletecarousel)

///market
router.post('/allpostmarket', authmarket.authmarketdata)
router.get('/getareaname/:areaName', authmarket.getareaName)

/// subcategory

router.post('/allpostsubcategory', authsubcategory.authsubcategorydata)
router.get('/allgetsubcategory', authsubcategory.getallsubcategory)
router.get('/getsubcategorybyname/:categoryName', authsubcategory.getallPostbysubcategory)
router.get('/getsubcategorybysubname/:subcategoryName', authsubcategory.getallPostbysubcategory2)


router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);


/// flat

router.post('/allpostflat', authflat.authflatdata)
router.get('/flatid/:id', authflat.getflatid)
router.get('/allgetflat', authflat.getallflat)
router.patch('/flatupdate/:id', authflat.flatupdate)

/// weight rate

router.post('/allpostweight', authweight.authweightdata)
router.get('/weightid/:id', authweight.getweightid)
router.get('/allgetweight', authweight.getallweight)
router.patch('/weightupdate/:id', authweight.weightupdate)



module.exports = router