const express=require('express');
const Router=express.Router({mergeParams: true});
const {listingSchema}=require('../SCHEMA.js');
const ExpressError = require('../utils/ExpressError.js');
const {isLoggedIn,isOwner, isSameUser}=require('../middlewares.js');
const listingFunctions=require('../controllers/listing.js');
const multer  = require('multer');
const {storage}=require('../cloudinary.js');
const upload = multer({ storage });

validateListing=(req,res,next)=>{
    const { error } = listingSchema.validate(req.body);
    if (error) {
        console.log(error);
        return next(new ExpressError(400, error.details[0].message));
    }
    else{
        next();
    }
}

Router.get('/',listingFunctions.root);

Router.route('/create')
.get(isLoggedIn,listingFunctions.getcreate)
.post(isLoggedIn,upload.single('listing[image]'),validateListing,listingFunctions.postcreate );

Router.route('/edit/:id')
.get(isLoggedIn, isOwner,validateListing,listingFunctions.getedit)
.post(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing,listingFunctions.postedit);

Router.get('/search',listingFunctions.getsearch);

Router.get('/icons/:id',listingFunctions.geticons);

Router.get('/:id', listingFunctions.show);

Router.delete('/delete/:id', isOwner,listingFunctions.destroy);

module.exports=Router;