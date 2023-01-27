const express = require("express");
const router = express.Router();
const authRoutes = require('./authrouter')


router.use('/api',authRoutes)



module.exports = router