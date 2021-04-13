import vision from '@google-cloud/vision';


class ocrController {
    async scanImageWithCloud(name:String){
        //const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        //test
        //const fileName = './edit/amount.jpg';
        console.log(name);

        const fileName = './edit/' + name;

        // Performs text detection on the local file
        const [result] = await client.textDetection(fileName);
        const detections = result.textAnnotations ?? [];
        console.log('Text:');
        detections.forEach(text => console.log(text));
    }

   /*  async function quickstart() {
        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');
      
        // Creates a client
        const client = new vision.ImageAnnotatorClient();
      
        // Performs label detection on the image file
        const [result] = await client.labelDetection('./edit/amount.jpg');
        const labels = result.labelAnnotations;
        console.log('Labels:');
        labels.forEach(label => console.log(label.description));
      } */
}

export const OcrController = new ocrController();