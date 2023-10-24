import * as mongoose from 'mongoose';

const OrderSequence = mongoose.model('counters', new mongoose.Schema({
    name: String,
    seq: Number
  } ));
export default OrderSequence;