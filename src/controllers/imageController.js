import Jimp from 'jimp';

const scanImage = (imagePath, callback) => {
    console.log(imagePath, 'this is the image path being scanned');
    Jimp.read(imagePath, (err, image) => {
        if(err){
            console.log(err);
        }
        callback(err, image);
    });
};

const threshold = process.env.IMAGE_THRESHOLD || 0.1;

const compareImage = (jImage1, image2, threshold, callback) => {
    console.log('second image is this one', image2);
    scanImage(image2.url, (err, jImage2) => {
        if(err){
            console.log(err);
        }
        console.log(jImage2 + 'is the JIMP image2');
        console.log(jImage1 + ' is the JIMP image1');
        console.log('the image is:', image2);
        const diff = Jimp.diff(jImage1, jImage2, threshold);
        const tuple = [diff.percent, image2];
        callback(null, tuple);
    });
};

const findItem = (targetImage, inventoryList, callback) => {
    console.log('this was run');
    const diffValues = [];
    let limit = inventoryList.length;
    console.log(targetImage + 'dfdfsdfdfdsf');
    scanImage(targetImage, (err, targetJImage) => {
        console.log('this was run too- this should be JIMP', targetJImage );
        inventoryList.forEach((document, index) => {
            compareImage(targetJImage, document, threshold, (err, result) => {
                if(err){
                    console.log(err);
                }
                diffValues[index] = result;
                if(--limit === 0){
                    const foundItem = diffValues.reduce((memo, curr) => {
                        if(curr[0] < memo[0]){
                            memo = curr;
                        }
                        return memo;
                    });
                    callback(null, foundItem);
                }
            });
        });
    });
};

export default {
    findItem,
    compareImage,
    scanImage
};
