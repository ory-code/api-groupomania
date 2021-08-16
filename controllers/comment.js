const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {
  const content = req.body.content;

  const comment = new Comment({
    content: content,
  });
  comment
    .save()
    .then(() => {
      res.status(201).json({ message: "comment create !" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  console.log(comment);
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({ message: "comment found" });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.updateComment = (req, res, next) => {
  const content = req.body.content;

  Comment.update(
    { content },
    { where: { id: req.params.id, content: content } }
  )
    .then(res.status(200).json("comment update with succes !"))
    .catch(res.status(500).json({ message: "error" }));
};

exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({ message: "comment delete with succes !" });
    })
    .catch(() => {
      res.status(500).json({ error: "error" });
    });
};

exports.getAllComment = (req, res, next) => {
  Comment.findAll()
    .then(() => {
      res.status(200).json({ message: "All comment found with succes !" });
    })
    .catch(() => {
      res.status(500).json({ message: "error" });
    });
};
