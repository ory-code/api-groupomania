const Post = require("../models/post");
const jwt = require("jsonwebtoken");

exports.createPost = (req, res, next) => {
  // if(!req.body.post){
  //   return res.status(400).json({error:"bad request"})
  // }
  const title = req.body.title;
  const text = req.body.text;
  const img = req.body.img;

  const post = new Post({
    title: title,
    text: text,
    img: img,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "post create !" }))
    .catch((error) => res.status(500).json({ error }));
};
