const Post = require("../models/post");
exports.createPost = (req, res, next) => {
  // if (!req.body.post) {
  //   return res.status(400).json({ error: "bad request" });
  // }
  const userId = res.locals.userId
  const title = req.body.title;
  const text = req.body.text;
  const img = req.body.img;
  const post = new Post({
    userid: userId,
    title: title,
    text: text,
    img: img,
  });
  post
    .save()
    .then(() =>
      res.status(201).json({
        message: "post create !",
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
  console.log(post);
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      res.status(200).json(post );
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};


exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const userId = res.locals.userId
  const title = req.body.title;
  const text = req.body.text;
  const img = req.body.img;
  Post.update(
    { title, text, img },
    { where: { id: id, userid: userId} }
  )
    .then(() => {
      res.status(200).json({ message: "post update" });
    })
    .catch(() => {
      res.status(400).json({ message: error });
    });
  console.log(req.body);
};

exports.deletePost = (req, res, next) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({ message: "delete with succes !" });
    })
    .catch(() => {
      res.status(500).json({ error: "impossible to delete !" });
    });
};

exports.getAllPost = (req, res, next) => {
  Post.findAll()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(404).json({ message: "posts introuvable !" });
    });
};
