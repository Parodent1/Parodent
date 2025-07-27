import multer from 'multer';
import { cloudinary } from '../cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
    folder: 'doctorPhotos',
    format: file.mimetype.split('/')[1],
    public_id: `${Date.now()}-${file.originalname}`,
    }),
});

const upload = multer({ storage });

export default upload;
