const Post = require("../models/post");
const User = require("../models/user");
const PostLike = require("../models/postLike");


exports.createPost = (req, res, next) => {
  if (!req.body.post) {
    return res.status(400).json({ error: "bad request" });
  }

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

exports.getAllpost = (req, res, next) => {
  Post.findAll({ attributes: ["id", "userid", "title", "text", "img", "date"] })
    .then((post) => {
      if (post === null) {
        return res.status(404).json({ error: "bad request" });
      }
      res.status(200).json({ post });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: id },
    attributes: ["id", "userid", "title", "text", "img", "date"],
    include: [
      {
        model: User,
        attributes: ["content"],
      },
    ],
    include: [
      {
        model: Comment,
        attributes: ["name"],
      },
    ],
    include: [
      {
        model: PostLike,
        attributes: ["liketype"],
      },
    ],
  })
    .then((post) => {
      if (post === null) {
        return res.status(404).json({ message: "post not found" });
      }
      res.status(200).json({ post });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updatePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;

  const title = req.body.title;
  const text = req.body.text;
  const img = req.body.img;

  Post.findOne({
    attributes: ["id", "Userid", "title", "text", "img"],
    where: { id: req.params.id },
  })
    .then((post) => {
      if (title.length <= 2 || message.length <= 2) {
        return res
          .status(400)
          .json({ error: "Please fill in all the blanks." });
      }
      if (title === post.title && text === post.text && img === post.img) {
        return res.status(400).json({ error: "No update to do" });
      }
      if (post.UserId === userId) {
        return post
          .update({ title: title, text: text, img: img })
          .then(() => res.status(200).json({ message: "Post update !" }))
          .catch((error) =>
            res.status(400).json({ error: "Unable to update !" })
          );
      }
      User.findOne({
        attributes: ["id", "name"],
        where: { id: userId },
      });
    })
    .catch((error) => res.status(404).json({ error: "Post not found !" }));
};

exports.deletePost = (req, res, next) => {

if (!Post) {
  return res.status(404).json({ error:"post not found"})
}
  Post.findOne({ where: { id: id } });

  Post.destroy({ where: { id: id } })
    .then(() => {
      res.status(200).json({ message: "Post delete with succes !" });
    })
    .catch((error) => res.status(500).json({ error }));
};
