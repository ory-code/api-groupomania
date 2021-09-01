const Comment = require("../models/comment");

exports.createComment = (req, res) => {
  const postId = req.params.id;
  const userId = res.locals.userId;
  const content = req.body.content;
  const commentPost = new Comment({
    postid: postId,
    userid: userId,
    content: content,
  });
  commentPost
    .save()
    .then(() => {
      res.status(201).json({ message: "Congrat post commented ! " });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getOneComment = (req, res) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.updateComment = (req, res) => {
  const id = req.params.id;
  const userId = res.locals.userId;
  const content = req.body.content;

  Comment.update({ content }, { where: { id: id, userid: userId } })
    .then(() => {
      res.status(200).json({ message: "comment update" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.deleteComment = (req, res) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({ message: "delete with succes !" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getAllComments = (req,res) => {
  Comment.findAll()
  .then((comments)=> {
    res.status(200).json(comments)
  })
  .catch((error)=>{
    console.log(comments);
    res.status(404).json(error)
  })
}