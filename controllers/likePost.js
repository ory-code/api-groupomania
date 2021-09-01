const PostLike = require("../models/postLike");

exports.likePost = (req, res, next) => {
  const postId = req.params.id;
  const userId = res.locals.userId;
  const liked = 1;
  const likedPost = new PostLike({
    postid: postId,
    userid: userId,
    liketype: liked,
  });
  likedPost
    .save()
    .then(() => {
      res.status(200).json({ message: " Congrat post liked !" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
exports.dislikePost = (req, res, next) => {
  const postId = req.params.id;
  const userId = res.locals.userId;
  const disLiked = -1;
  const likedPost = new PostLike({
    postid: postId,
    userid: userId,
    liketype: disLiked,
  });
  console.log(disLiked);
  likedPost
    .save()
    .then(() => {
      res.status(200).json({ message: " Welldone post disliked !" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
