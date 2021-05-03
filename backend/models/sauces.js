const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
   name : {type: String, required:true},
   manufacturer : {type: String, required:true},
   description : {type: String, required:true},
   mainPepper : {type: String, required:true},
   heat : {type: Number, required:true},
   likes : {type: Number, DefaultValue:0},
   dislikes : {type: Number, DefaultValue:0},
   usersLiked : {type:Array, DefaultValue:[]},
   usersDisliked : {type:Array,DefaultValue:[]},
   userId : {type: String},
   imageUrl:{type: String}
});

module.exports = mongoose.model('sauces', saucesSchema);