const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
exports.createPost = (req, res, next) => {
  const userId = res.locals.userId;
  const text = req.body.text;
  const img = req.body.img;
  const post = new Post({
    userid: userId,
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

exports.updatePost = (req, res, next) => {
  const id = req.params.id;
  const userId = res.locals.userId;
  const text = req.body.text;
  const img = req.body.img;
  Post.update({ text, img }, { where: { id: id, userid: userId } })
    .then(() => {
      res.status(200).json({ message: "post update" });
    })
    .catch(() => {
      res.status(400).json({ message: error });
    });
  console.log(req.body);
};

exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  Post.destroy({ where: { id: id } })
    .then(() => {
      res.status(200).json({ message: "delete with succes !" });
    })
    .catch((error) => {
      res.status(500).json(console.log(error));
    });
};

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: [
      {
        association: Post.User,
      },
    ],
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(404).json({ message: "posts introuvable !" });
    });
};

exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  Post.findOne({
    where: { id: id },
    include: [
      {
        association: Post.User,
      },
    ],
  })
    .then((post) => {
      Comment.findAll({
        where: { postid: id },
        include: [
          {
            association: Comment.User,
          },
        ],
      }).then((comment) => {
        res.status(200).json({ post, comment });
      });
    })
    .catch((error) => {
      res.status(404).json(console.log(error));
    });
};
