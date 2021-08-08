const Comment = require("../models/comment");
const jwt = require("jsonwebtoken"); 
const User = require("../models/user");
exports.createComment = (req, res, next) => {
  
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userid = decodedToken.userid;

  
  const comment = req.body.comment;
  const postid = req.params.postid;

 
  if (comment.length < 2 || comment.length == null) {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }

  if (postid == null) {
   
    return res.status(400).json({ error: "Impossible de commenter." });
  }

  Comment.create({
  
    userid: userid,
    postId: postid,
    comment: comment,
    like: 0,
  })
    .then(res.status(201).json({ message: "Post commenté ! " }))
    .catch((error) => res.status(500).json({ error })); 
};

exports.getAllComment = (req, res, next) => {
 
  const postid = req.params.postid;

  Comment.findAll({
    attributes: ["id", "postid", "userid", "content"],
    where: { postid: postid }, 
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((comment) => {
      if (comment.length === 0) {
        return res.status(200).json({ message: "Pas de commentaire" });
      }
      res.status(200).json({ comment }); 
    })
    .catch((error) => res.status(400).json({ error })); 
};

exports.getOneComment = (req, res, next) => {
  
  const commentid = req.params.commentid;

  Comment.findOne({
    attributes: ["id", "postId", "userId", "content"],
    where: { id: commentid },
    include: [
      {
        model: User,
        attributes: ["name"],
      },
    ],
  })
    .then((comment) => {
      if (comment == null) {
       
        return res.status(404).json({ error: "Ce commentaire n'existe pas !" });
      }
      res.status(200).json({ comment }); 
    })
    .catch((error) =>
      res.status(403).json({ error: "Commentaire non trouvé" })
    ); 
};

exports.updateComment = (req, res, next) => {
  
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userid = decodedToken.userid;


  const content = req.body.content;
  const commentid = req.params.commentid;

  Comment.findOne({
    attributes: ["id", "postId", "userId", "contentt"],
    where: { id: commentid },
  })
    .then((comment) => {
      if (content.length < 2) {
        
        return res
          .status(400)
          .json({ error: "Pas de mise à jour à faire ou champs vide." });
      }
      if (comment.userid === userid) {
      
        return comment
          .update({ comment: content }) 
          .then(res.status(200).json({ message: "Commentaire modifié !" }))
          .catch(
            res.status(400).json({ error: "Impossible de mettre à jour !" })
          ); 
      }
      User.findOne({
        
        attributes: ["id"],
        where: { id: userid },
      })
        .then(() => {
          if (!userid) {
            
            return res
              .status(406)
              .json({ error: "Impossible de modifier ce commentaire." });
          }
          Comment
            .update({ content }) 
            .then(res.status(200).json({ message: "Commentaire modifié !" }))
            .catch(
              res.status(400).json({ error: "Impossible de mettre à jour !" })
            ); 
        })
        .catch(res.status(404).json({ error: "Post non trouvé !" })); 
    })
    .catch(res.status(404).json({ error: "Commentaire non trouvé !" }));
};


exports.deleteComment = (req, res, next) => {
    
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
    const userid = decodedToken.userid

   
    const commentid = req.params.commentid

    Comment.findOne({
         where: { id: commentid } 
    })
         .then(comment => {
              if (comment.userid === userid) { 
                   return comment.destroy() 
                        .then(res.status(200).json({ message: 'Commentaire supprimé !' }))
                        .catch( res.status(400).json({ error: 'Impossible de supprimer !' })); 
              }
              User.findOne({ 
                   attributes: ['id'],
                   where: { id: userid } 
              })
                   .then(() => {
                        if (!userid) {
                             return res.status(406).json({ error: 'Impossible de supprimer le commentaire.' })
                        }
                        Comment.destroy() 
                             .then( res.status(200).json({ message: 'Commentaire supprimé !' }))
                             .catch( res.status(400).json({ error: 'Impossible de supprimer !' })); 
                   })
                   .catch( res.status(404).json({ error: 'Utilisateur non trouvé !' })) 

         })
         .catch( res.status(404).json({ error: 'Commentaire non trouvé !' })); 
}