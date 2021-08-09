const multer = require("multer");

const MIME_TYPES = {
  "img/jpg": "jpg",
  "img/jpeg": "jpg",
  "img/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split("").join("_");
    const extension = MIME_TYPES[file.MIME_TYPES];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("images");