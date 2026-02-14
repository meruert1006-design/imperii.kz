// backend/src/controllers/uploadController.js

import { v2 as cloudinary } from 'cloudinary';

const useCloudinary = Boolean(
  process.env.CLOUDINARY_URL ||
    (process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET)
);

let cloudinaryConfigured = false;
if (useCloudinary && !cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  cloudinaryConfigured = true;
}

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const folder = process.env.CLOUDINARY_FOLDER || 'imperii';
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  if (useCloudinary) {
    try {
      const result = await uploadToCloudinary(req.file.buffer);
      return res.status(201).json({
        url: result.secure_url,
        filename: result.public_id
      });
    } catch (error) {
      return res.status(500).json({ error: 'Cloud upload failed' });
    }
  }

  return res.status(201).json({
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename
  });
};
