const router = require('express').Router()
const ApiResponse = require('../utils/ApiResponse')
const {verifyToken} = require('../utils/JWTconfig')

const admin = require("./AdminRouter");
const HOD = require("./HODRouter");
const Faculty = require("./FacultyRouter");
const student = require("./StudentRouter");

router.use((req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.json(new ApiResponse(false,"Token Not Found",null,null));
    }
    else{
        const token = authHeader.split(" ")[1];
        verifyToken(token,(err,tokenData)=>{
            if(err)
                res.json(new ApiResponse(false,"Token Not Valid or Expired",null,err));
            else{
                req.loginuser = tokenData;
                next();
            }
        })
    }
});

router.use("/admin",admin);
router.use("/hod",HOD);
router.use("/faculty",Faculty)
router.use("/student",student)

module.exports = router;
