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
      cb(null, __dirname + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${req.body.productName}-${file.originalname}`);
    },
  });
  
  var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
  export default uploadFile;