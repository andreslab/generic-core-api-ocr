import { Router } from 'express';
import { upload, uploadFileController } from "../controller/uploadFileController";
const router: Router = Router();

router.post('/upload', upload.single('productImage'), uploadFileController.uploadFile);

export default router;