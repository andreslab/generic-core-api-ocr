import { Request, response, Response } from  'express';
import multer from 'multer';
import fs from 'fs';
import { EditController } from './editController';
import { OcrController } from './ocrController';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads/';
        if (!fs.existsSync(dir)){
            fs.mkdir(dir, (error) => {
                if (error) {
                 console.trace('Error creating directory.', error);
                }else {
                    cb(null, dir);
                }
            });
        }else{
            cb(null, dir);
        }
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
        cb(null, true);
    }else {
        cb(null, false);
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 *1024 * 5
    }, 
    fileFilter: fileFilter
});


class UploadFileController {

    public uploadFile (req:Request, res: Response){

        const name = req.body.name;
        const path = req.file.path; 
        console.log(path);

        EditController.processImage(path);

       res.writeHead(200, {"Content-Type": "application/json"});
       var json = JSON.stringify({
           value: true,
           path: name,
           code: 20,
       });
       res.end(json);

    }
}

export const uploadFileController = new UploadFileController();