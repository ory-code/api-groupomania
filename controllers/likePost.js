const Post = require("../models/post");
const PostLike = require("../models/postLike");

exports.likePost = (req, res, next) => {
  //Params
  const LIKED = 1;
  const postid = req.params.postid;
  const userid = req.params.userid;

  Post.findOne({
    where: { id: postid }, //On recupère l'id du post
  })
    .then((post) => {
      PostLike.findOne({
        attributes: ["id", "userid", "Postid", "liketype"],
        where: { Userid: userid, Postid: postid },
      })
        .then((like) => {
          if (like) {
            //Si oui
            if (like.liketype === LIKED) {
              return res.status(409).json({ message: "Déjà liké" }); //Erreur conflit
            }
            return like
              .update({ liketype: LIKED }) //On update le like
              .then(() => {
                post
                  .update({ like: post.like + 1 }) //On update le post
                  .then(res.status(201).json({ message: "Liké !" })) //, post, like
                  .catch(
                    res.status(500).json({ error: " Erreur update post" })
                  ); //Erreur server
              })
              .catch(res.status(500).json({ error: "error" })); //Erreur server
          }
          PostLike.create({ Userid: userid, Postid: postid, liketype: LIKED }) //Si non
            .then(() => {
              post
                .update({ like: post.like + 1 }) //On update le post
                .then(res.status(201).json({ message: "Liké !" }))
                .catch(res.status(500).json({ error })); //Erreur server
            })
            .catch(res.status(500).json({ error: "error" })); //Erreur server
        })
        .catch(res.status(406).json({ error: "error" })); //Erreur not accetable
    })
    .catch(res.status(406).json({ error: "error" })); //Erreur not accetable
};

exports.dislikePost = (req, res, next) => {
  //Params
  const DISLIKED = -1;
  const postid = req.params.postid;
  const userid = req.params.userid;

  Post.findOne({
    attributes: ["id", "liketype"],
    where: { id: postid }, //On recupère l'id du post
  })
    .then((post) => {
      PostLike.findOne({
        attributes: ["id", "Userid", "Postid", "liketype"],
        where: { Userid: userid, Postid: postid },
      })
        .then((like) => {
          if (like) {
            //Si oui
            if (like.liketype === DISLIKED) {
              return res.status(409).json({ message: "Déjà disliké" }); //Erreur conflit
            }
            return like
              .update({ liketype: DISLIKED }) //On update le dislike
              .then((like) => {
                post
                  .update({ like: post.like - 1 }) //On update le post
                  .then(res.status(201).json({ message: "Disliké !!" })) //, post, like
                  .catch(res.status(500).json({ error: "error" })); //Erreur server
              })
              .catch(res.status(500).json({ error: "error" })); //Erreur server
          }
          PostLike.create({
            Userid: userid,
            Postid: postid,
            liketype: DISLIKED,
          }) //Si non
            .then((like) => {
              post
                .update({ like: post.like - 1 }) //On update le post
                .then(res.status(201).json({ message: "Disliké !" }))
                .catch(res.status(500).json({ error: "error" })); //Erreur server
            })
            .catch(res.status(500).json({ error: "error" })); //Erreur server
        })
        .catch(res.status(406).json({ error: "error" })); //Erreur not accetable
    })
    .catch(res.status(406).json({ error: "error" })); //Erreur not accetable
};
