const mongoose =require ("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        requireed:true,
        ref:"user",
        unique:true,
    },
    token:{type:String,requireed:true},
    createAt:{type:Date,default:Date.now(),expires:3600}// one hour time
});
module.exports=mongoose.model("token",tokenSchema)

//create token model in monggoose and export it to use it in other files