const Review = require('./models/review');
const Listing=require('./models/schema')
module.exports.isLoggedIn=(req,res,next)=>{
    if (!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash('error','You must be logged in!')
        res.redirect('/login')
    }else{
        next()
    }
}
module.exports.savedUrl=(req,res,next)=>{
    if (req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}

module.exports.isOwner=async (req,res,next)=>{
    const { id } = req.params;
    const list=await Listing.findById(id);
    if (!list){
        req.flash('error','Place Page Not Found')
        return res.redirect('/listings')// Return to stop further execution
    }
    if (req.user && list.owner._id.equals(res.locals.User._id)){
        return next()
    }else{
        req.flash('error','You Are Not The Owner Of This Place');
        return res.redirect(`/listings/${id}`)// Return to stop further execution
    }
    
}

module.exports.isSameUser=async (req,res,next)=>{
    const { id,reviewId } = req.params;
    const review=await Review.findById(reviewId).populate('author');
    if (req.user && req.user._id.equals(review.author._id)){
        return next()
    }else{
        req.flash('error','Cannot Delete The Review As You Are Not The Owner')
        res.redirect(`/listings/${id}`)
    }
}