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

const compareImage = (jImage1, image2, threshold, callback) => {
    scanImage(image2, (err, jImage2) => {
        if(err){
            console.log(err);
        }
        const diff = Jimp.diff(jImage1, jImage2, threshold);
        const tuple = [diff.percent, image2];
        callback(null, tuple);
    });
};

const findItem = (targetImage, inventoryList, callback) => {
    const diffValues = [];
    let limit = inventoryList.length;
    scanImage(targetImage, (err, targetJImage) => {
        inventoryList.forEach((document, index) => {
            compareImage(targetJImage, document.url, threshold, (err, result) => {
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

export default findItem;
