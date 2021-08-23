const User = require("../models/user");

exports.getProfil = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((Profil) => {
      res.status(200).json(Profil);
    })
    .catch(() => {
      res.status(404).json({ error });
    });
};

exports.updateProfil = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const firstName = req.body.firstname;
  
  User.update(
    { name, firstName, sexe },
    { where: { id: id, name: name, firstname: firstName } }
  )
    .then(() => {
      res.status(200).json({ message: "profil update" });
    })
    .catch(() => {
      res.status(500).json({ message: "error" });
    });
  console.log(req.body);
};

exports.deleteProfil = (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({ message: "profil delete !" });
    })
    .catch(() => {
      res.status(500).json({ error: "error" });
    });
};
