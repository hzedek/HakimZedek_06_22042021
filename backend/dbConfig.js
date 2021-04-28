const Mongoose = require("mongoose");

Mongoose.connect('mongodb+srv://new_user:hunterx@cluster0.jbsaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
