import * as mongoose from 'mongoose';

 import Inc  from 'mongoose-sequence';
const AutoIncrement=Inc(mongoose)
const userData=mongoose.Schema({image: String,gender:[String],age:[Number],type:String,status:[String]
,createAt:String},{ _id: false })

userData.plugin(AutoIncrement);

export default mongoose.model('user-datas',userData)