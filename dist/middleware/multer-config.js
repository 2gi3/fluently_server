import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const audioUploadMiddleware = upload.single('audio');
export { audioUploadMiddleware };
//# sourceMappingURL=multer-config.js.map