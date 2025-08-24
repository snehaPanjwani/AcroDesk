const router = require('express').Router();
const {User} = require('../models/index');
const ApiResponse = require('../utils/ApiResponse');

const {generateToken} = require("../utils/JWTconfig");
const constants = require('../utils/SystemConstant')


router.post("/register",async (req,res)=>{
    try
    {
    const obj = req.body;
    obj.active_status = true;
    //Password Encrypt, Email Validate
    await User.create(obj);
    res.json(new ApiResponse(true,"Successfully Registered",null,null));
    } catch(error){
          res.json(new ApiResponse(false,"Registration Failed",null,error));
    }

});
router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    if(email==undefined || email.length==0) {
       res.json(new ApiResponse(false,"Email Not Found",null,null));
    }
    else if(password==undefined || password.length==0) {
       res.json(new ApiResponse(false,"Password Not Found",null,null));
    }
    else{
        const userob = await User.findOne({
            where : {email,password}
        })
        if(userob == null){
            res.json(new ApiResponse(false,"Invalid",null,null));
        }
        else{
            const token = generateToken(userob.id, userob.role);
            res.json(new ApiResponse(true,"Login Success!!",{
                name : userob.name,
                role : userob.role,
                token
            },null));
        }
    }

});
router.get('/constants',(req,res)=>{
     res.json(new ApiResponse(true,"Constants",constants));
})
module.exports = router;