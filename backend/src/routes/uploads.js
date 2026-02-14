// backend/src/routes/uploads.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { requireAuth } from '../middleware/auth.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const useCloudinary = Boolean(
  process.env.CLOUDINARY_URL ||
    (process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET)
);

let upload;
if (useCloudinary) {
  upload = multer({ storage: multer.memoryStorage() });
} else {
  const uploadDir = process.env.UPLOADS_DIR
    ? path.resolve(process.env.UPLOADS_DIR)
    : path.join(__dirname, '..', '..', 'uploads');

  // Ensure uploads folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const safeName = file.originalname.replace(/\s+/g, '-').toLowerCase();
      cb(null, `${timestamp}-${safeName}`);
    }
  });

  upload = multer({ storage });
}

router.post('/', requireAuth, upload.single('image'), uploadImage);
// Public upload for reviews (no auth)
router.post('/public', upload.single('image'), uploadImage);

export default router;
