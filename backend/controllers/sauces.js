const Sauces = require('../models/sauces');
const fs = require('fs');


exports.postSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauceJson = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauceJson.save()
    .then(() => res.status(201).json({ message: 'objet crée !' }))
    .catch(error => console.log(error));
};

exports.getSauces = (req, res, next) => {
  Sauces.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))
};

exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(Sauce => res.status(200).json(Sauce))
    .catch(error => res.status(404).json({ error }));

};
exports.changeSauce = (req, res, next) => {

  if (req.file) {
    Sauces.updateOne({ _id: req.params.id }, { ...JSON.parse(req.body.sauce),
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, _id: req.params.id })
      .then(Sauce=> res.status(200).json({Sauce, message: 'Sauce modifiée !' }))
      .catch(error => res.status(400).json({ error }))
   }
   else{
     Sauces.updateOne({ _id: req.params.id }, { ...req.body,
    _id: req.params.id })
    .then(Sauce=> res.status(200).json({Sauce, message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));}

};

exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
  .then(Sauce => {
    const filename = Sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
    .catch(error => res.status(400).json({ error }));
      })
  })
    .catch(error => res.status(400).json({ error }));
};

exports.likedSauce = (req, res, next) => {
  
  

  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      const usersID=req.body.userId;
             
     switch (req.body.like) {
      case 1:
        Sauces.updateOne(
          { _id: req.params.id }, { $push: { usersLiked: usersID} , $inc: { likes: +1} })
          .then(sauces => res.status(200).json({sauces, message: 'Sauce aimée !' }))
          .catch(error => console.log(error));
        break;
      case -1:
        Sauces.updateOne(
          { _id: req.params.id }, { $push: { usersDisliked: usersID }, $inc: { dislikes: +1} })
          .then(sauces => res.status(200).json({sauces, message: 'Sauce pas aimée !' }))
          .catch(error => console.log(error));
        break;
      case 0:
        if(sauce.usersLiked.includes(usersID)){
          Sauces.updateOne(
           { _id: req.params.id },{$pull:{usersLiked:usersID}, $inc: { likes: -1} })
          .then(sauces => res.status(200).json({sauces, message: 'like retiré !' }))
          .catch(error => console.log(error));
        break;
      }
      if (sauce.usersDisliked.includes(usersID)){
        Sauces.updateOne(
          { _id: req.params.id },{$pull:{usersDisliked:usersID}, $inc: { dislikes: -1} })
        .then(sauces => res.status(200).json({sauces, message: 'dislike retiré !' }))
        .catch(error => console.log(error));
        break;
      }
    }
  })
  .catch(error => console.log(error));}