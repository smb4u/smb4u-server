import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './routes/api';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.load();

var mLab = require('mongolab-data-api')('bf2Z8xfJI8CFO9SpzR7RKeRzPP9D8P_-');

const app = express();
const port = process.env.SERVER_PORT || 8000;
import mongoose from 'mongoose';

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

//mongoose.Promise = require('bluebird');
//assert.equal(query.exec().constructor, require('bluebird'));
//console.log('trying to connect mongo:' + user + pass);
//mongoose.Promise = global.Promise;
//mongoose.connect(`mongodb://${user}:${pass}@ds063946.mlab.com:63946/itemwise/items`);
//mongoose.connect('mongodb://localhost:27017/books');

//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));

//db.once('open', function(){
 //   console.log('we are connected!');
//});

app
    .use(bodyParser.urlencoded({ limit: '50mb', extended: true}))
    .use(bodyParser.json({ limit: '50mb'}))
    .use(cors())
    .use(indexRoute);

app.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server is functional on port ${port}`);
});

export default app;

