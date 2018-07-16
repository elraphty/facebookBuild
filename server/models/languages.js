let mongoose =require('../mongoose/mongoose');
let Schema=mongoose.Schema;

const languageSchema=new Schema({
          lang:{
              type:String,
              required:true,
              minlength:3,
              unique:true,
              trim:true
          },
          count:{
              type:Number,
              default:0
          }

});

let Lang=mongoose.model('Languages',languageSchema);

module.exports=Lang;
