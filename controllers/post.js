const Post = require("../models/post");
const Comment = require("../models/comment");

exports.createPost = (req, res, next) => {
  const userId = res.locals.userId;
  const text = req.body.text;
  const images = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  const post = new Post({
    userid: userId,
    text: text,
    images: images,
  });
  console.log(req.body.images);
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

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: [
      {
        association: Post.User,
        attributes: ["name", "firstname"],
      },
    ],
    order: [["id", "DESC"]],
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

exports.updatePost = (req, res, next) => {
  const isAdmin = res.locals.isAdmin;
  const id = req.params.id;
  const userId = res.locals.userId;
  const text = req.body.text;
  const images = req.body.images;

  if (isAdmin === true) {
    Post.update( {text, images}, { where: { id: id } })

      .then(() => {
        res.status(200).json({ message: "update with succes !" });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    Post.update({ text, images }, { where: { id: id, userid: userId } })
      .then(() => {
        res.status(200).json({ message: "update with succes !" });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};

exports.deletePost = (req, res, next) => {
  const userId = res.locals.userId;
  const isAdmin = res.locals.isAdmin;
  const id = req.params.id;

  if (isAdmin === true) {
    Post.destroy({ where: { id: id } })

      .then(() => {
        res.status(200).json({ message: "delete with succes !" });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    Post.destroy({ where: { id: id, userid: userId } })
      .then(() => {
        res.status(200).json({ message: "delete with succes !" });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};
