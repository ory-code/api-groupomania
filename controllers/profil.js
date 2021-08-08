const User = require("../models/user");

exports.userProfile = (req, res, next) => {
  //Pour afficher un profil
  //Params
  const userid = req.params.userid;

  User.findOne({
    //On cherche notre user
    attributes: ["id", "name", "firstname"], //On récupère les attributs
    where: { id: userid }, // On récupère notre id
  })
    .then((user) => {
      if (user == null) {
        //Si null
        return res.status(404).json({ error: "Utilisateur non trouvé la!" });
      }
      res.status(200).json({ user }); //On renvoie notre user
    })
    .catch((error) =>
      res.status(404).json({ error: "Utilisateur non trouvé !" })
    ); //Erreur Not found
};

exports.updateProfile = (req, res, next) => {
  //Params
  const userid = req.params.userid;
  const name = req.body.name;
  const firstname = req.body.firstname;

  User.findOne({
    //On cherche notre user
    attributes: ["id", "name", "firstname"],
    where: { id: userid }, //On récupère notre id
  })
    .then((user) => {
      if (name === user.name && firstname === user.firstname) {
        //Si champs identiques
        return res.status(406).json({ error: "Pas de modification" });
      }
      if (user.id == userid) {
        //Si id identique
        return user
          .update({ name: name, firstname: firstname }) //On modifie
          .then(() =>
            res.status(200).json({ message: "Utilisateur modifié !" })
          )
          .catch((error) =>
            res.status(400).json({ error: "Impossible de mettre à jour !" })
          ); //Erreur Bad Request
      }
      User.findOne({
        //Si id différent
        attributes: ["id", "name", "firstname"],
        where: { id: userid },
      });

      user
        .update({ name: name, firstname: firstname, poste: poste }) //Si admin on update
        .then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
        .catch((error) =>
          res.status(400).json({ error: "Impossible de mettre à jour !" })
        ); //Erreur Bad Request
    })
    .catch((error) =>
      res.status(404).json({ error: "Utilisateur non trouvé !" })
    ); //Erreur Not Found
};

exports.deleteProfile = (req, res, next) => {
  //Params
  const userid = req.params.userid;
  const firstname = req.body.firstname;
  const name = req.body.name;

  User.findOne({
    //On cherche notre user
    attributes: ["id", "firstname", "name"],
    where: { id: userid }, //On récupère notre id
  })
    .then((user) => {
      if (name != user.name || firstname != user.firstname) {
        //Si vérification incorrect
        return res.status(406).json({ error: "Saisie incorrect." });
      }
      if (user.id == userid) {
        //Si id identique
        return user
          .destroy() //On supprime l'user
          .then(() =>
            res.status(200).json({ message: "Utilisateur supprimé !" })
          )
          .catch((error) =>
            res.status(400).json({ error: "Impossible de supprimer !" })
          ); //Erreur Bad Request
      }
      res.status(400).json({ error: "Impossible de supprimer !" });
    })
    .catch((error) =>
      res.status(404).json({ error: "Utilisateur non trouvé !" })
    ); //Erreur Not Found
};
