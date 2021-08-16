const Comment = require("../models/comment");
const likeComment = require("../models/likeComments");

exports.likeComment = (req, res, next) => {
  const LIKED = 1;
  const commentid = req.params.commentid;
  const userid = req.params.userid;

  Comment.findOne({
    attributes: ["id", "likeType"],
    where: { id: commentId }, //On recupère l'id du comment
  })
    .then((comment) => {
      likeComment
        .findOne({
          attributes: ["id", "UserId", "CommentId", "likeType"],
          where: { UserId: userid, CommentId: commentid }, //On récupère notre likeComment
        })
        .then((like) => {
          if (like) {
            //Si oui
            if (like.liketype === LIKED) {
              return res.status(409).json({ error: "Déjà liké" }); //Erreur conflit
            }
            return like
              .update({ liketype: LIKED }) //On update le like
              .then(() => {
                comment
                  .update({ like: comment.liketype + 1 }) //On update le comment
                  .then(res.status(201).json({ message: "Liké !" }))
                  .catch(
                    res.status(500).json({ error: " Erreur update comment" })
                  ); //Erreur server
              })
              .catch(res.status(500).json({ error: "Erreur update like" })); //Erreur server
          }
          return likeComment
            .create({ UserId: userid, CommentId: commentid, liketype: LIKED }) //Si non
            .then(() => {
              comment
                .update({ like: comment.like + 1 }) //On update le comment
                .then(res.status(201).json({ message: "Liké !" }))
                .catch(
                  res.status(500).json({ error: " Erreur update comment" })
                ); //Erreur server
            })
            .catch(res.status(500).json({ error: "Erreur create like" })); //Erreur server
        })
        .catch(res.status(404).json({ error: "Like introuvable" })); //Erreur not accetable
    })
    .catch(res.status(404).json({ error: "comment introuvable" })); //Erreur not accetable
};

exports.dislikeComment = (req, res, next) => {
  //Params
  const DISLIKED = -1;
  const commentid = req.params.commentid;
  const userid = req.params.userid;

  Comment.findOne({
    attributes: ["id", "likeType"],
    where: { id: commentid }, //On recupère l'id du comment
  })
    .then((comment) => {
      likeComment
        .findOne({
          attributes: ["id", "Userid", "Commentid", "likeType"],
          where: { UserId: userid, CommentId: commentid },
        })
        .then((like) => {
          if (like) {
            //Si oui
            if (like.liketype === DISLIKED) {
              return res.status(409).json({ error: "Déjà disliké" }); //Erreur conflit
            }
            return like
              .update({ liketype: DISLIKED }) //On update le dislike
              .then(() => {
                comment
                  .update({ like: comment.liketype - 1 }) //On update le comment
                  .then(res.status(201).json({ message: "Disliké !" }))
                  .catch(
                    res.status(500).json({ error: " Erreur update comment" })
                  ); //Erreur server
              })
              .catch(res.status(500).json({ error: "error" })); //Erreur server
          }
          return likeComment
            .create({
              UserId: userid,
              CommentId: commentid,
              liketype: DISLIKED,
            }) //Si non
            .then(() => {
              comment
                .update({ like: comment.liketype - 1 }) //On update le comment
                .then(res.status(201).json({ message: "Disliké !" }))
                .catch(res.status(500).json({ error: "error" })); //Erreur server
            })
            .catch(() => res.status(500).json({ error: "error" })); //Erreur server
        })
        .catch(() => res.status(406).json({ error: "error" })); //Erreur not accetable
    })
    .catch(() => res.status(406).json({ error: "error" })); //Erreur not accetable
};
