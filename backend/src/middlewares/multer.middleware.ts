import { createHash } from "crypto";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (_req, file, cb) => {
    const hash = createHash("md5")
      .update(file.originalname + Date.now())
      .digest("hex");
    const extension = path.extname(file.originalname);
    cb(null, `${hash}${extension}`);
  },
});
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept the file
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

export default upload;
