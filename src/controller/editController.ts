import Jimp from 'jimp';
import fs from 'fs';
import { isMissingDeclaration } from 'typescript';
import { OcrController } from './ocrController';

class editController {
    //path = './uploads/cheque.jpg';
    path = '';
    pathEdit= './edit';
    collectionImgName: String[] = [];

    //return name of image editing
    public processImage(path:string){

        this.path = path;

        //var collectionImgName: String[] = [];
        if (this.createPath()){
            Jimp.read(this.path)
            .then(img => {
                const data : [String, Jimp]= this.cropNameOwner(img);
                this.collectionImgName.push(data[0]);
                //OcrController.scanImageWithCloud(data[0]);
                return data[1];
            })
            .catch(err => {
                console.error(err);
            });

            Jimp.read(this.path)
            .then(img => {
                const data : [String, Jimp]= this.cropNameClient(img);
                this.collectionImgName.push(data[0]);
                OcrController.scanImageWithCloud(data[0]);
                return data[1];
            })
            .catch(err => {
                console.error(err);
            });

            Jimp.read(this.path)
            .then(img => {
                const data : [String, Jimp]= this.cropAmount(img);
                this.collectionImgName.push(data[0]);
                //OcrController.scanImageWithCloud(data[0]);
                return data[1];
            })
            .catch(err => {
                console.error(err);
            });

            Jimp.read(this.path)
            .then(img => {
                const data : [String, Jimp]= this.cropSignature(img);
                this.collectionImgName.push(data[0]);
                //OcrController.scanImageWithCloud(data[0]);
                return data[1];
            })
            .catch(err => {
                console.error(err);
            });
        }
        console.log(this.collectionImgName);
    }

    public createPath(): boolean{
        
        if (!fs.existsSync(this.pathEdit)){
            fs.mkdir(this.pathEdit, (error) => {
                if (error) {
                 console.trace('Error creating directory.', error);
                 return false;
                }else {
                    return true;
                }
            });
        }else{
            return true;
        }
        return false;
    }

    public cropNameClient(img: Jimp):[String, Jimp]{
        const name = 'nameClient' + new Date().toISOString() +'.jpg';
        return [name, img.greyscale().crop( 5, 50, 200, 100 ).write(this.pathEdit + '/' + name)];
    }
    public cropNameOwner(img: Jimp):[String, Jimp]{
        const name = 'nameOwner' + new Date().toISOString() +'.jpg';
        return [name, img.greyscale().crop( 5, 50, 150, 100 ).write(this.pathEdit + '/' + name)];
    }
    public cropAmount(img: Jimp):[String, Jimp]{
        const name = 'amount' + new Date().toISOString() +'.jpg';
        return [name, img.greyscale().crop( 5, 50, 150, 100 ).write(this.pathEdit + '/' + name)];
    }
    public cropSignature(img: Jimp):[String, Jimp]{
        const name = 'signature' + new Date().toISOString() +'.jpg';
        return [name, img.greyscale().crop( 5, 50, 150, 100 ).write(this.pathEdit + '/' + name)];
    }
}

export const EditController = new editController();