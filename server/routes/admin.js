let express=require("express");
let router=express.Router();
let Lang=require('../models/languages');
let NaijaLang=require('../models/naijalang');
let Word=require('../models/english');

router.get('/',async function(req,res){
    languages=  await Lang.find({});
    
  res.render('home',{
      title:'Home Page',
      languages,
  });
  });

router.get('/insert',function(req,res){
    res.render('insert',{
        title:'Insert Page'
    })
});

router.post('/insert',function(req,res){
    let newWord=new Word({
         word:req.body.word.toLowerCase()
    });
    newWord.save().then((word)=>{
        console.log(word);
    req.flash('success','Inserted Successfully');
    res.redirect('/admin/insert');
    }).catch((e)=>{
        console.log(e)
        req.flash('error','Error Occured');
        res.redirect('/admin/insert'); 
    });
});


router.get('/insertlang', async function(req,res){
    res.render('insertlang',{
        title:'Insert Language Page'
    })
});

router.post('/insertlang',function(req,res){
    let newLang=new Lang({
         lang:req.body.lang.toLowerCase()
    });
    newLang.save().then((lang)=>{
    req.flash('success','Language inserted Successfully');
    res.redirect('/admin/insertlang');
    }).catch((e)=>{
        console.log(e)
        req.flash('error','Error Occured');
        res.redirect('/admin/insertlang'); 
    });
});

router.get('/inserttrans',async function(req,res){
    let languages=  await Lang.find({});
    let words=  await Word.find({});
    res.render('inserttrans',{
        title:'Insert Translation Page',
        languages,
        words
    })
});

router.get('/words',async function(req,res){
      let words=await Word.find({});
      res.send(words);
});

router.post('/inserttrans', function(req,res){
    let newTrans=new NaijaLang({
         engword:req.body.engword.toLowerCase(),
         naijalang:req.body.naijalang.toLowerCase(),
         translation:req.body.translation.toLowerCase()
    });

        newTrans.save().then(async (trans)=>{
            console.log(trans);
        await  Lang.update({
                lang:req.body.naijalang},
                {$inc:{count:1} 
                 },
                {
                new:true
                }
        );

    req.flash('success','Translation inserted Successfully');
    res.redirect('/admin/inserttrans');
    }).catch((e)=>{
        console.log(e)
        req.flash('error','Error Occured ');
        res.redirect('/admin/inserttrans'); 
    });
});

module.exports=router;