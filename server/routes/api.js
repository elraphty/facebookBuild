let express=require("express");
let router=express.Router();
let NaijaLang=require('../models/naijalang');

router.get('/translate/:word/:from/:to',async function(req,res){

    let words=decodeURIComponent(req.params.word).toLocaleLowerCase()
    let to=req.params.to;
    let from=req.params.from;
    let bodyArr=words.split(' ');

    let translate='';
    for (let word of bodyArr) {
        try{
            let trans;

            if(from=="english")
            {
            //Default Language Is English
            trans=await NaijaLang.find({"engword":word,"naijalang":to});
            }
            else{
             //If The Language Is Not English
             //Hositing
             //Check for the Englsih word
            other_words=await NaijaLang.find({"naijalang":from,"translation":word});
            let= change_word=other_words[0].engword;
            //Translate the english word to what the user wants
            trans=await NaijaLang.find({"engword":change_word,"naijalang":to});
        
            console.log("Trans",trans);
            }
            
        //Check If there is a translation    
        if(trans)
        {
        translate+=" " + trans[0].translation
        }
        //If no trans return default word
        else{
            translate+=" " + word;  
        }
        //End Of else
        }
         //If error return default word
        catch(e){
            translate+=" " + word; 
        }
    }

    res.send(translate);
});

module.exports=router;