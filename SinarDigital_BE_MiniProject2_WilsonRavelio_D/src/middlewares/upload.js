const upload = require("../config/multer");

const uploadMiddleware = upload.single("image");

const handleUpload = (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
};

module.exports = handleUpload;
