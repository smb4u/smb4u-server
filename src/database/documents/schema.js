import mongoose from 'mongoose';

const schema = mongoose.Schema({
    url: String,
    category: String,
    description: String,
    price: Number,
    QRcode: String,
    receivedDate: Date,
    soldDate: Date,
    returned: Boolean
});


export default schema;

