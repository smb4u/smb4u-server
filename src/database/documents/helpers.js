import Item from './model';

const createItem = (savedItemObj, callback) => {
    const receivedDate = new Date();
    const newItem = new Item({
        url: savedItemObj.url,
        category: savedItemObj.category,
        description: savedItemObj.category,
        price: savedItemObj.price,
        QRcode: savedItemObj.QRcode,
        receivedDate: receivedDate,
        soldDate: null,
        returned: false
    });
    console.log('saving item');
    console.log(process.env.MONGO_PASS);
    newItem.save((err, result) => {
        console.log('complete item save');
        if(err){
            console.log(err);
            callback(err);
        }
        callback(null, result);
    });
};

const updateItem = (idItem, updateInfo, callback) => {
    Item.update(idItem, updateInfo, callback);
}

export default {
    createItem,
    updateItem
};

