let express=require('express');
let app=express();
let path=require('path');
let flash=require('connect-flash');
let logger=require('morgan');
let bodyParser=require('body-parser');
let session=require('express-session');
let passport=require('passport');
let Lang=require('./models/languages');
let translateRouter=require('./routes/translate');
let adminRouter=require('./routes/admin');
let apiRouter=require('./routes/api');

app.set('view engine','ejs');
app.set('views','views');


app.use(express.static(path.join(__dirname,'public')));
//Using Flash Messages
app.use(flash());
//Using Morgan Logger
app.use(logger('dev'));
//Initializing Passport
app.use(passport.initialize());
app.use(passport.session())

//Initializing Session
app.use(session({
    secret:"MySecret",
    resave:true,
    saveUninitialized:true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(function(req,res,next){
res.locals.messages=require('express-messages')(req,res);
next();
});

//Removing Cors Cross Site  Header
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //Router Includes
  app.use('/translate',translateRouter);
  app.use('/admin',adminRouter);
  app.use('/api',apiRouter);


  
app.get('/languages',async function(req,res){
    languages=  await Lang.find({});
    res.send(languages);
});



app.listen(8000,()=>{
    console.log('Listening at Port 8000');
});
