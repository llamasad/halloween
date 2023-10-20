import * as mongoose from 'mongoose';

//  import Inc  from 'mongoose-sequence';
// AutoIncrement=Inc(mongoose)
const userData=mongoose.Schema({image: Buffer})

//  userData.plugin(AutoIncrement);

export default mongoose.model('user-datas',userData)