import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination({}, {}, cb) {
    cb(null, 'uploads/');
  },
  filename({}, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file: any, cb: any) => {
  const fileType = /jpg|jpeg|png/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only');
  }
};
const upload = multer({
  storage,
  fileFilter: function ({}, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req: any, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
