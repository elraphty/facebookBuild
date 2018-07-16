let mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/facebook');

module.exports=mongoose;