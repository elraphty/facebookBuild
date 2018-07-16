let mongoose =require('../mongoose/mongoose');
let Schema=mongoose.Schema;

const englishSchema=new Schema({
          word:{
              type:String,
              required:true,
              unique:true,
              minlength:1,
              trim:true
          }
});

let Word=mongoose.model('English',englishSchema);

module.exports=Word;
