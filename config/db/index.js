import mongoose from 'mongoose';
async function connect() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/halloween_DB');
        console.log('ket noi thanh cong toi mongodb')
    }
    catch(error){
        console.log('ket noi that bai');
    }
  
  }

  export default {connect}; 