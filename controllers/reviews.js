const Listing = require('../models/schema.js');
const wrapAsync = require('../utils/wrapAsync.js');
const Review=require('../models/review.js');

module.exports.root=wrapAsync(async(req,res)=>{
    const list=await Listing.findById(req.params.id);
    if (!list){
        throw new ExpressError(404, 'Id Not Found');
    }
    
    const newReview=new Review(req.body.review);
    newReview.author=req.user;
    list.reviews.push(newReview);
    try {
        await newReview.save();
        await list.save();
        console.log('Successfully Added The Review');
        req.flash('success','Review Added!');
        res.status(201).redirect(`/listings/${list._id}`);
    } catch (error) {
        // console.error('Error saving review or listing:', error);
        throw new ExpressError(500, 'Internal Server Error');
    };
})

module.exports.destroy=wrapAsync(async(req,res)=>{
    const {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review Deleted!');
    res.redirect(`/listings/${id}`);
});