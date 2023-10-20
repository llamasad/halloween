import  initFaceAPI from '../util/face-api-init.js';
import userDatas from '../model/user-data.js';
import * as express from "express";
import pkg from 'canvas';
const { loadImage } = pkg;
const userAPI = express.Router();
var faceAPI;
var faceOption;
initFaceAPI().then(({faceapi,getFaceDetectorOptions})=>{faceAPI=faceapi
    faceOption=getFaceDetectorOptions}).catch(error=>console.warn('error in API:'+error))

userAPI.post('/userdata',async (req,res)=>{
    try{
    if(faceAPI&&faceOption){  
    console.log('wait to canvas handle base64...')
    let imgBuffer =Buffer.from(req.body.uriImg);
    const imgCanvas = await loadImage(req.body.uriImg)
    console.log('canvas done')
    const results = await faceAPI.detectAllFaces(imgCanvas, faceOption)
    .withFaceLandmarks()
    .withAgeAndGender()
    .withFaceExpressions()
    console.log(results)
    const out = faceAPI.createCanvasFromMedia(imgCanvas);
    faceAPI.draw.drawDetections(out, results.map(res => res.detection))
    faceAPI.draw.drawFaceExpressions(out, results)
    console.log(out)
    }
   
}catch(error){
    console.log(error)
}
    });
userAPI.get('/userdata',(req,res)=>{
     userDatas.find({}).then((result)=>res.json(result));   
})
export default userAPI;
