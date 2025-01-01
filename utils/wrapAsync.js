module.exports= (fn)=>{
    return (req,res,next)=>{
        try{fn(req,res,next)}catch{(err)=>next(err)}
    }
};