const mongoose =require('mongoose');

const UserSchema=new mongoose.Schema({
    med_name:{
        type:String,
        required:true
    },
    med_invoice:{
        type:String,
        required:true
    },
    med_expiry:{
        type:String,
        required:true
    },
    user_contact:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true
    },
});

const Med=mongoose.model('Med',UserSchema);

module.exports=Med;