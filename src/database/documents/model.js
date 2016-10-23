import mongoose from 'mongoose';
import schema from './schema';

const item = mongoose.model('Item', schema);

export default item;

