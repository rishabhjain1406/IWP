const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose =require('mongoose');
const flash =require('connect-flash');
const session=require('express-session');
//db
const db=require('./config/keys').MongoURI;

//connect to mongo

mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('Mongodb connected...'))
.catch(err=>console.log(err));

const app=express();

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//bodyparser
app.use(express.urlencoded({extended:false}));

//express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
const PORT=3000;
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.listen(PORT,console.log('server started'));