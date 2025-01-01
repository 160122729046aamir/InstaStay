const mongoose=require('mongoose');
const init=require('./data.js');
const Listing=require('../models/schema.js');

main().then((res)=>{
    console.log('connection successful')
}).catch((err)=>{ console.log(err) });

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
};

let insertion=async()=>{
    init.data=init.data.map((obj)=>{return {...obj,owner:'677586ece8a5d317a15493a4'}})
    let result=await Listing.insertMany(init.data);

    console.log(result);
};

insertion();