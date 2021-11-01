const User = require("../models/user");

exports.getProfil = (req, res, next) => {
  const id = req.params.id;
  User.findOne({
    where: { id: id },
    attributes: ["name", "firstname"],
  })
    .then((Profil) => {
      res.status(200).json(Profil);
    })
    .catch((error) => {
      res.status(404).json(console.log(error));
    });
};

exports.updateProfil = (req, res, next) => {
  const name = req.body.name;
  const firstname = req.body.firstname;

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
  const id = req.params.id;
  User.destroy({ where: { id: id } })
    .then(() => {
      res.status(200).json({ message: "profil delete !" });
    })
    .catch(() => {
      res.status(500).json({ error: "error" });
    });
};
