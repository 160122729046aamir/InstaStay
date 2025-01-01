const express=require('express');
const Router=express.Router({mergeParams: true});
const {reviewSchema}=require('../SCHEMA.js');
const ExpressError = require('../utils/ExpressError.js');
const {isSameUser}=require('../middlewares.js');
const reviewFunctions=require('../controllers/reviews.js');

validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if (error){
        console.log(error);
        return next(new ExpressError(400,error.details[0].message));
    }
    else{
        next()
    }
}

Router.post('/',validateReview,reviewFunctions.root);

Router.delete('/:reviewId',isSameUser,reviewFunctions.destroy)

module.exports=Router;