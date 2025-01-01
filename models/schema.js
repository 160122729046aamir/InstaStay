const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require('./review.js');
const { object, string, required } = require("joi");

ListingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image: {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    price:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review'
}],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    category:{
        type:String,
        default:'Amazing Views',
        required:true
    }
})

ListingSchema.post('findOneAndDelete', async(contentlist)=>{
    if (contentlist) {
        await Review.deleteMany({_id:{$in:contentlist.reviews}})
    }
});

const Listing=mongoose.model('listing',ListingSchema);

module.exports=Listing;