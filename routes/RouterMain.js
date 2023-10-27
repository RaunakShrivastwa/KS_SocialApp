const express = require('express');
const homeController = require('../controller/HomeController')
const SignController=require('../controller/SignupController')
const localStratgy= require('../Config/passport-local-strategy')
const user= require('../controller/userController')
const passport = require('passport')

const router = express.Router();
console.log("Router Loaded....")
router.get('/home',homeController.IndexPage)
router.get('/',passport.cheakAuthentication,homeController.home)
router.get('/accont', homeController.account)
router.use('/user',require('./UserRoutes'))
router.use('/post',require('./PostRoute'))
router.get('/signup',SignController.Signup);
router.get('/login',SignController.login);
router.use('/comment',require('./commentRoute'))




module.exports = router;