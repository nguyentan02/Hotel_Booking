import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';

// Cloudinary config
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Multer memory storage (file stays in buffer, not saved to disk)
const storage = multer.memoryStorage();

const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WebP)'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Upload buffer to Cloudinary
export const uploadToCloudinary = (file: Express.Multer.File, folder: string = 'hotels'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `hotel-booking/${folder}`, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

// Delete image from Cloudinary by URL
export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    const parts = imageUrl.split('/');
    const folderAndFile = parts.slice(parts.indexOf('hotel-booking')).join('/');
    const publicId = folderAndFile.replace(/\.[^.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Ignore delete errors
  }
};
