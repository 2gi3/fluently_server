import multer from 'multer';

const storage = multer.memoryStorage();
const audioUpload = multer({ storage: storage });
const imageUpload = multer({ storage: storage, limits: { files: 6 } });
const audioUploadMiddleware = audioUpload.single('audio');
const imagesUploadMiddleware = imageUpload.array('images', 6);

export { audioUploadMiddleware, imagesUploadMiddleware };
