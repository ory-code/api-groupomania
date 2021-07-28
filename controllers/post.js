const models = require("../models/post");
const jwt = require("jsonwebtoken");

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const title = req.body.title;
  const text = req.body.text;
  const imgLink = req.body.imgLink;

  if (title.length <= 2 || text <= 2) {
    return res.status(400).json({
      error: "Please fill in all the blanks.",
    });
  }

  models.Post.create({
    UserId: userId,
    title: title,
    text: text,
    like: 0,
    dislike: 0,
    imgLink: imgLink,
  })
    .then(
      res.status(201).json({
        message: "Post create !",
      })
    )
    .catch(
      res.status(500).json({
        error,
      })
    );
};

exports.getOnePost = (req, res, next) => {
  models.Post.findOne({
    attributes: [
      "id",
      "userId",
      "title",
      "img",
      "text",
      "img",
      "like",
      "dislike",
      "date",
    ],
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: models.User,
        attributes: ["firstname"],
      },
      {
        model: models.Comment,
        attributes: ["content"],
      },
    ],
  })
    .then(
      res.status(200).json({
        message: "post found",
      })
    )
    .catch(
      res.status(500).json({
        error,
      })
    );
};

exports.getAllPost = (req, res, next) => {
  models.Post.findAll({
    attributes: [
      "id",
      "userId",
      "title",
      "img",
      "text",
      "like",
      "dislike",
      "date",
    ],
    include: [
      {
        model: models.User,
        attributes: ["firstname"],
      },
      {
        model: models.Comment,
        attributes: ["content"],
      },
    ],
  })
    .then(
      res.status(200).json({
        message: "all post found",
      })
    )
    .catch(
      res.status(500).json({
        error,
      })
    );
};

exports.updatePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const title = req.body.title;
  const text = req.body.text;
  const imgLink = req.body.imgLink;

  models.Post.findOne({
    attributes: ["id", "UserId", "title", "text", "img"],
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (title.length <= 2 || text.length <= 2) {
        return res.status(400).json({
          error: "Please fill in all the blanks.",
        });
      }
      if (
        title === post.title &&
        text === post.text &&
        imgLink === post.imgLink
      ) {
        return res.status(400).json({
          error: "No update to do",
        });
      }
      if (post.UserId === userId) {
        return post
          .update({
            title: title,
            text: text,
            imgLink: imgLink,
          })
          .then(() =>
            res.status(200).json({
              message: "Post update with succes !",
            })
          )
          .catch(() =>
            res.status(400).json({
              message: "Unable to update!",
            })
          );
      }
      models.User.findOne({
        attributes: ["id"],
        where: {
          id: userId,
        },
      }).then((id) => {
        if (!id) {
          return res.status(500).json({
            error,
          });
        }
        post
          .update({
            title: title,
            text: text,
            link: link,
          })
          .then(
            res.status(200).json({
              message: "Post update !",
            })
          )
          .catch(
            res.status(400).json({
              message: "Unable to update!",
            })
          );
      });
    })
    .catch(
      res.status(404).json({
        error: "Post not found!",
      })
    );
};

exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;

  models.Post.findOne({
    where: { id: req.params.id },
  }).then((post) => {
    if (post.UserId === userId) {
      return post
        .destroy()
        .then(res.status(200).json({ message: "Post delete !" }))
        .catch(res.status(400).json({ error }));
    }
    models.User.findOne({
      attributes: ["id"],
      where: { id: userId },
    }).then((id) => {
      if (!id) {
        return res.status(500).json({
          error,
        });
      }
      post
        .destroy()
        .then(res.status(200).json({ message: "Post delete !" }))
        .catch(res.status(500).json({ error }));
    });
  });
};
