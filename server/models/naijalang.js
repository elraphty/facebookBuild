let mongoose =require('../mongoose/mongoose');
let Schema=mongoose.Schema;

const naijaSchema=new Schema({
          engword:{
              type:String,
              required:true,
              minlength:1,
              trim:true
          },
          naijalang:{
            type:String,
            required:true,
            minlength:1,
            trim:true
        },
        translation:{
            type:String,
            required:true,
            minlength:1,
            unique:true,
            trim:true
        }
});

let NaijaLang=mongoose.model('naijaLanguage',naijaSchema);
module.exports=NaijaLang;
module.exports.Translate=function(word,callback){

}
