import  initFaceAPI from '../util/face-api-init.js';
import userDatas from '../model/user-data.js';
import * as express from "express";
import pkg from 'canvas';
import sequenceMongoose from '../model/sequence.js'
import fs from 'fs'
const { loadImage } = pkg;
const userAPI = express.Router();
var faceAPI;
var faceOption;
initFaceAPI().then(({faceapi,getFaceDetectorOptions})=>{
    faceAPI=faceapi
    faceOption=getFaceDetectorOptions}).catch(error=>console.warn('error in API:'+error))

    userAPI.post('/userdata', async (req, res) => {
        try {
            if (faceAPI && faceOption) {
                console.log('wait to canvas handle base64...')
                const imgCanvas = await loadImage(req.body.uriImg)
                console.log('canvas done')
                const results = await faceAPI.detectAllFaces(imgCanvas, faceOption)
                    .withFaceLandmarks()
                    .withAgeAndGender()
                    .withFaceExpressions()
                console.log(req.body.type)
                if (results.length > 0) {
                    const status = results.map(result => {
                        const maxStatus = Math.max(...Object.values(result.expressions))
                        return Object.keys(result.expressions).find(ele => result.expressions[ele] === maxStatus)
                    })
                    const age = results.map(result => Math.round(result.age))
                    const gender = results.map(result => result.gender)
                    let date=new Date()
                    let createAt=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} at ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
                    const userData = new userDatas({
                        image: req.body.uriImg,
                        age,
                        gender,
                        type: req.body.type,
                        status: status,
                        createAt
                    })
                    console.log(userData)
                    await userData.save()
                    res.json('success')
                } else {
                    res.json('faceValidate')
                }
            }
        } catch (error) {
            // Handle errors, e.g., by sending an error response
            console.error(error);
            res.status(500).json({ error: 'An error occurred while processing the data.' });
        }
    });
userAPI.get('/userdata',(req,res)=>{
    sequenceMongoose.find({}).then((result)=>result[0].seq).then((seq)=>{
        if(seq>req.query.counterSeq){
            userDatas.find({_id:Number(req.query.counterSeq)+1}).then((result)=>res.json({result,valid:'success!'}));
        }
        else{
            res.json({valid:'notthing!'})
        }
    })
   
})
userAPI.get('/sequence',(req,res)=>{
    sequenceMongoose.find({}).then((result)=>res.json(result[0].seq));
})
export default userAPI;
