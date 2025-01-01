const express=require('express');
const Router=express.Router({mergeParams: true});
const passport=require('passport');
const {savedUrl}=require('../middlewares.js');
const userFunctions=require('../controllers/users.js');
const user = require('../models/user.js');

Router.route('/signup')
.get(userFunctions.getsignup)
.post(userFunctions.postsignup);

Router.route('/login')
.get(userFunctions.getlogin)
.post(savedUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),userFunctions.postlogin);

Router.get('/logout',userFunctions.logout)

module.exports=Router;