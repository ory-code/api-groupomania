const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  console.log(req.body);
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ error: "bad request" });
  }
  const name = req.body.name;
  const firstname = req.body.firstname;

  const email = CryptoJS.AES.encrypt(
    req.body.email,
    CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET_TOKEN),
    {
      mode: CryptoJS.mode.ECB,
      iv: CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV),
    }
  ).toString();

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstname: firstname,
        name: name,
        email: email,
        password: hash,
      });
      console.log(user);
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ error: "bad request" });
  }
  const email = CryptoJS.AES.encrypt(
    req.body.email,
    CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET_TOKEN),
    {
      mode: CryptoJS.mode.ECB,
      iv: CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV),
    }
  ).toString();
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "identifiants incorrect !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          console.log(valid);
          if (!valid) {
            return res.status(404).json({ error: "identifiants incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
