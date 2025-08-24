const router = require('express').Router()
const ApiResponse = require('../utils/ApiResponse');

router.use((req,res,next)=>
{
    if(req.loginuser.role!='hod')
        res.json(new ApiResponse(false,"UnAuthorized Request !",null,null))
    else
        next();
});

router.get("/home",(req,res)=>{
    res.send("Admin URL Running......")
});

module.exports = router;