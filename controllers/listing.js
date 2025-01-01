const Listing=require('../models/schema');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.root=wrapAsync(async (req, res) => {
    const AllLists = await Listing.find({});
    res.render('./listings/index.ejs', { AllLists });
});

module.exports.getcreate= (req, res) => {
    res.render('./listings/create.ejs');
};

module.exports.getedit=wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash('error','List Id Not Fount');
        res.redirect('/listings')
    }
    res.render('./listings/edit.ejs', { list});
    
    
});

module.exports.show=wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate({path: 'reviews',populate: {path: 'author'}}).populate('owner');
    if (!list) {
        req.flash('error','List Id Not Fount');
        res.redirect('/listings')
    }else{res.render('./listings/show.ejs', { list });}
    
})

module.exports.postcreate= wrapAsync(async (req, res, next) => {
    const url=req.file.path;
    const filename=req.file.filename;
    console.log(req.file.path);
    console.log(req.file.filename);
    const { title, description, price, country, location, category} = req.body.listing || {};
    const Current_User=res.locals.User;
    const newListing = new Listing({ title:title, description:description, price:price, country:country, location:location, category:category });
    newListing.owner=Current_User;
    newListing.image={url,filename};
    await newListing.save();
    req.flash('success','List Created!');
    res.redirect('/listings');
});

module.exports.postedit=wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const list= await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if (req.file){
        const url=req.file.path;
        const filename=req.file.filename;
        list.image={url,filename}
    }
    await list.save();
    req.flash('success','List Edited!');
    res.redirect(`/listings/${id}`);  
});

module.exports.destroy=wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new ExpressError(404, 'Id Not Found'));
    }
    await Listing.findByIdAndDelete(id);
    req.flash('success','List Deleted!');
    res.redirect('/listings');});
module.exports.getsearch=wrapAsync(async(req,res,next)=>{
    const AllLists=await Listing.find({'title': req.query.searchQuery})
    if (AllLists.length===0){
        req.flash('error',"Enter a valid name")
        res.redirect('/listings')
    }
    else if (AllLists.length===1){
        res.redirect(`/listings/${AllLists[0]._id}`)
    }
    else{
        res.render('./listings/index.ejs',{AllLists})
    }
});

module.exports.geticons=wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const AllLists=await Listing.find({'category':id})
    if (AllLists.length===0){
        req.flash('error',"Currently Unavailable");
        res.redirect('/listings')
    }
    else{
        res.render('./listings/index.ejs',{AllLists});
    }
});