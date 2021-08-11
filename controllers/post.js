const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  // if (!req.body.sauce) {
  //   return res.status(400).json({ error: "bad request" });
  // }
  const title = req.body.title;
  const text = req.body.text;
  const img = req.body.img;

  const post = new Post({
    title: title,
    text: text,
    img: img,
  });
  delete post._id;
  post
    .save()
    .then(() =>
      res.status(201).json({
        message: "product create !",
      })
    )
    .catch((error) => {
      res.status(500).json({ error });
    });
  console.log(post);
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({message:"Bravo Alex va être content !"});
    })
    .catch((error) => {
      res.status(404).json(error);
    });
    
};

exports.updatePost = (req,res,next)=> {


}