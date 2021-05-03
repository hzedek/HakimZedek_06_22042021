const Sauces = require('../models/sauces');
const user = require('../models/user');

exports.postSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete req.body._id;
  const sauceJson = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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