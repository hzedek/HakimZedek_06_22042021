const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
   name : {type: String, required:true},
   manufacturer : {type: String, required:true},
   description : {type: String, required:true},
   mainPepper : {type: String, required:true},
   heat : {type: Number, required:true},
   likes : {type: Number},
   dislikes : {type: Number},
   usersLiked : {type:[String]},
   usersDisliked : {type:[String]},
   userId : {type: String},
   imageUrl:{type: String}
});

module.exports = mongoose.model('sauces', saucesSchema);