import multer from 'multer';

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };
  
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "/resources/static/assets/avatars/");
    },
    filename: (req, file, cb) => {
      cb(null, `${req.body.userName}-${file.originalname}`);
    },
  });
  
  var uploadAvatar = multer({ storage: storage, fileFilter: imageFilter });
  export default uploadAvatar;