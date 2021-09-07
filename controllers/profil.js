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
  const name = req.body.name;
  const firstname = req.body.firstname;
  console.log(res.locals);
  User.update({ name, firstname }, { where: { id: res.locals.userId } })
    .then(() => {
      res.status(200).json({ message: "profil update" });
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "error" });
    });
  console.log(req.body);
};

exports.deleteProfil = (req, res, next) => {
  const userId = res.locals.userId;
  User.destroy({ where: { id: req.params.id, userid: userId } })
    .then(() => {
      res.status(200).json({ message: "profil delete !" });
    })
    .catch(() => {
      res.status(500).json({ error: "error" });
    });
};
