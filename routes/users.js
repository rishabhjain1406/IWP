const express=require('express');
const bcrypt=require('bcryptjs')
const mongoose =require('mongoose');
const router=express.Router();
//models
const Ngo=require('../models/ngo');

const User=require('../models/user');
const Med=require('../models/medicine');


router.get('/login_ngo',(req,res) => res.render('login_ngo'));
router.get('/login_user',(req,res) => res.render('login_user'));
router.get('/register_ngo',(req,res) => res.render('register_ngo'));
router.get('/register_user',(req,res) => res.render('register_user'));




router.post('/register_ngo', (req, res) => {
    const { ngoname,ngo_no,tax_exemption,password, password1} = req.body;
    const Ngo_user =new Ngo({
        ngoname,
        password,
        ngo_no,
        tax_exemption
    });
    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(Ngo_user.password,salt,(err,hash)=>{
            if (err) throw err;
            Ngo_user.password=hash;
            Ngo_user.save();
        })  
    })
    res.redirect('/users/login_ngo');
});

router.post('/login_ngo',(req,res) =>{
    const {ngoname,password}=req.body;
    Ngo.findOne({
        ngoname:ngoname
    }).then(user =>{
        if(!user){
            res.send('NGO not registered');
        }
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                res.render('dash_ngo');
            } else{
                res.send('password incorrect');
            }
        });
    });
});
router.get('/dash_search',(req,res)=>{
    Med.find()
    .then(result =>{
        res.render('test',{practices :result});
    });
});




router.post('/register_user', (req, res) => {
    const { username,email,password, password1} = req.body;
    const user =new User({
        username,
        email,
        password,
    });
    bcrypt.genSalt(10,(err,salt) =>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if (err) throw err;
            user.password=hash;
            user.save();
        })  
    })
    res.redirect('/users/login_user');
});



router.post('/login_user',(req,res) =>{
    const {username,password}=req.body;
    User.findOne({
        username:username
    }).then(user =>{
        if(!user){
            res.send('user not registered');
        }
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                res.render('dash_user');
            } else{
                res.send('password incorrect');
            }
        });
    });
});

router.post('/dash_med', (req, res) => {
    const { med_name,med_invoice,med_expiry,user_contact,user_email} = req.body;
    const meds =new Med({
        med_name,
        med_invoice,
        med_expiry,
        user_contact,
        user_email
    });
    meds.save();
    res.render('dash_user');
});



router.get('/delete/:id',function(req,res){
    var id=req.params.id;
    var del=Med.findByIdAndDelete(id);
    del.exec(function(err){
        if(err) throw err;
        res.render('dash_ngo');
    });
});





module.exports=router;