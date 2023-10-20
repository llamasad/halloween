import * as express from "express";
const router = express.Router();
 
router.get('/shoot',(req,res)=>{
        return res.render('mobileShoot') })


router.get('/',(req,res)=>{
        
        return res.redirect(req.baseUrl+'/shoot')
    })  
export default router ;
