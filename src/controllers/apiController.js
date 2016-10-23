// place holder.
import mongoHelpers from '../database/documents/helpers.js';
import dotenv from 'dotenv';
import imageController from './imageController';
dotenv.load();
const mongoDB_API_KEY = process.env.MONGODB_API_KEY;
const baseLink_users = 'https://api.mlab.com/api/1/databases/itemwise/collections/users?apiKey=';
console.log(mongoDB_API_KEY);
var mLab = require('mongolab-data-api')(mongoDB_API_KEY);


const addItem = (req, res) => {
 //   mongoHelpers.createItem(req.body, (err, result) => {
 //       if(err){
 //           console.log(err);
 //       }
 //       console.log('item saved');
 //       res.send(result);
    //   });
    const options = {
        database: 'itemwise',
        collectionName: 'items',
        documents: req.body
    };

    mLab.insertDocuments(options, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send('saved in database');
    });
};
const returnItem = (returnedItemObj, callback) => {
    const receivedDate = new Date();
    mongoHelpers.updateItem({QRcode: returnedItemObj.QRcode}, {$set: {receivedDate: receivedDate, soldDate: null, returned: true}}, callback);
};

const updateItem = (updatedItemObj, callback) => {
    mongoHelpers.updateItem({QRcode: returnedItemObj.QRcode}, {$set: {url: updatedItemObj.url, category: updatedItemObj.category, description: updatedItemObj.description, price: updatedItemObj.price}}, callback);
};

const sellItem = (soldItemObj, callback) => {
    const soldDate = new Date();
    mongoHelpers.updateItem({QRcode: soldItemObj.QRcode}, {$set: {soldDate: soldDate}}, callback);
};

//const addingItem = (req,res) => {
  //  fetch(baseLink_users + mongoDB_API_KEY, )
//};
const getInventory = (req, res) => {
    const options = {
        database: 'itemwise',
        collectionName: 'items'
    };

    mLab.listDocuments(options, (err, result) => {
        if(err){
            console.log(err);
        }
        console.log('getting all documents');
        const documents = {
            inventory: result
        };
        console.log(documents);
        res.send(JSON.stringify(documents));
    });
}

export default {
    addItem,
    returnItem,
    updateItem,
    sellItem,
    getInventory
};
