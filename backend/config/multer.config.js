import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,"./uploads/images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})

const allowedTypes = ["image/jpeg","image/png","image/jpg"];
const fileFilter = (req, file, cb) => {
  if(!allowedTypes.includes(file.mimetype)) {
    const err = new multer.MulterError("LIMIT_UNEXPECTED_FILE",file.fieldname);
    err.message = "invalid file type, only jpeg,jpg,png are allowed";
    return cb(err,false);
  }
  cb(null,true);
};

const upload = multer({
  storage,
  fileFilter
});

export default upload;