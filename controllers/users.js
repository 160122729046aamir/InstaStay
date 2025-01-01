const User=require('../models/user');
const wrapAsync=require('../utils/wrapAsync');

module.exports.getsignup=wrapAsync(async(req,res)=>{
    res.render('./users/signup.ejs');
});

module.exports.postsignup=wrapAsync(async(req,res,next)=>{
    try{const {username,email,password}=req.body;
    const NewUser=User({
        email: email,
        username: username
    }) 
    const registeredUser=await User.register(NewUser,password);
    req.login(registeredUser,(err)=>{
        if (err){
            return next(err)
        }else{
            req.flash('success','Welcome Back To WanderLust')
            res.redirect('/listings')
        }
    })
   }catch(err){
        req.flash('error',err.message);
        res.redirect('/signup');
    }
});

module.exports.getlogin=wrapAsync(async(req,res)=>{
    res.render('./users/login.ejs');
});

module.exports.postlogin=async(req,res)=>{
    req.flash('success','Welcome Back To WanderLust,You LoggedIn Successfully');
    console.log(res.locals.redirectUrl);
    if (res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl)
    }else{
        res.redirect('/listings')
    }
    
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if (err){
            return next(err)
        }else{
            res.redirect('/listings')
        }
    })
}