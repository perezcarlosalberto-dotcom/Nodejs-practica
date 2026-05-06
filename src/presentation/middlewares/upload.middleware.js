import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadsDir = 'uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(uploadsDir, { recursive: true });
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + path.extname(file.originalname));
    }
});
 
export default multer({ storage });
