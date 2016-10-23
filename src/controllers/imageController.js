import Jimp from 'jimp';

const scanImage = (imagePath, callback) => {
    Jimp.read(imagePath, (err, image) => {
        if(err){
            console.log(err);
        }
        callback(err, image);
    });
};

const threshold = process.env.IMAGE_THRESHOLD || 0.1;

const compareImage = (image1, image2, threshold, callback) => {
    scanImage(image1, (err, jImage1) => {
        if(err){
            console.log(err);
        }
        scanImage(image2, (err, jImage2) => {
            if(err){
                console.log(err);
            }
            const diff = Jimp.diff(jImage1, jImage2, threshold);
            callback(null, callback);
        });
    });
};

//const findItem = (targetImage, inventoryList, callback) => {
 //   const diffValues = [];
  //  for(let i = 0; i < inventoryList.length, i++){
        
  //  }
//}
