const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const Comment = require("../models/comment");

exports.createPost = (req, res, next) => {
  console.log(req.body);
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
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const isAdmin = decodedToken.isAdmin;
  const id = req.params.id;
  const userId = res.locals.userId;
  const text = req.body.text;
  const img = req.body.img;
console.log(req.body);
  Post.findByPk(id, {
    include: [{ association: Post.User, attributes: ["id"] }],
  }).then((post) => {
    console.log(isAdmin, post.userid, userId);
    if (isAdmin === true || userId === post.userid) {
      Post.update({ text, img }, { where: { id: id, userid: userId } })
        .then(() => {
          res.status(200).json({message: "updated with succes !"});
        })
        .catch((err) => {
          res.status(400).json(console.error(err));
        });
    }
  });
};

exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = res.locals.userId;
  const isAdmin = decodedToken.isAdmin;
  const id = req.params.id;

  Post.findByPk(id, {
    include: [{ association: Post.User, attributes: ["id"] }],
  }).then((post) => {
    console.log(isAdmin, post.userid, userId);
    if (isAdmin === true || userId === post.userid) {
      Post.destroy({ where: { id: id } })

        .then(() => {
          res.status(200).json({ message: "delete with succes !" });
        })
        .catch((error) => {
          res.status(500).json(console.log(error));
        });
    }
  });
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
