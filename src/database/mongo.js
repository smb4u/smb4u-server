import mongoose from 'mongoose';

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

//mongoose.Promise = require('bluebird');
//assert.equal(query.exec().constructor, require('bluebird'));
console.log('trying to connect mongo');
mongoose.Promise = global.Promise;
//mongoose.connect(`mongodb://${user}:${pass}!@ds063946.mlab.com:63946/itemwise`);
mongoose.connect('mongodb://localhost:27017/books');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    console.log('we are connected!');
});

export default db;

