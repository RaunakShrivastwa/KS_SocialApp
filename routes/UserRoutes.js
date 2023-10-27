const express = require('express')
 const router=express.Router();
 const user=require('../controller/userController')
 const localStratgy= require('../Config/passport-local-strategy')
 const passport = require('passport')
  router.get('/profile/:id',passport.cheakAuthentication,user.profile);
  router.get('/data',user.data)
  router.post('/create',user.CreateUser)
  router.post('/loginUser',passport.authenticate( 'local', {failureRedirect:'/signup'} ),user.SignIn);
  router.get('/signout',user.signout);
  router.post('/update/:id',user.updateUser)

  router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/signup'}),user.SignIn);

router.get('/auth/github',passport.authenticate('github',{ scope: [ 'user:email' ] }));
router.get('/auth/github/callback',passport.authenticate('github',{failureRedirect: '/signup'}),user.SignIn);


router.get('/auth/facebook',passport.authenticate('facebook',{scope:['user_friends']}));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect: '/signup'}),user.SignIn);

router.get('/auth/linkedin',passport.authenticate('linkedin',{scope:['openid','profile','email']}));
router.get('/auth/linkedin/callback',passport.authenticate('linkedin',{failureRedirect: '/signup'}),user.SignIn);

 module.exports=router;