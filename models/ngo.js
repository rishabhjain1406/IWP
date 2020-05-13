const mongoose =require('mongoose');

const UserSchema=new mongoose.Schema({
    ngoname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ngo_no:{
        type:Number,
        required:true
    },
    tax_exemption:{
        type:String,
        required:true
    },
});

const Ngo=mongoose.model('Ngo',UserSchema);

module.exports=Ngo;