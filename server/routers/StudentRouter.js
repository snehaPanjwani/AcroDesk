const router = require('express').Router()
const {Query, Announcement, Document} = require('../models')

const ApiResponse = require('../utils/ApiResponse');

router.use((req,res,next)=>
{
    if(req.loginuser.role != 'student')
        res.json(new ApiResponse(false,"UnAuthorized Request !",null,null))
    else
        next();
});
router.post("/askquery", async (req,res)=>{
    try{
        const obj = req.body;
        obj.status = "open";
        obj.isactive = true;
        obj.queryby = req.loginuser.userid;
        console.log(obj)
        const newObj = await Query.create(obj);
        res.json(new ApiResponse(true,"Query Saved !",newObj,null));
    }catch(err){
        res.json(new ApiResponse(false,"Query Not Saved !",null,err));
    }   
});
router.get("/myqueries", async (req,res)=>{
    const queryby = req.loginuser.userid;
    const data = await Query.findAll({
        where : {queryby},
        include : "answers"
    })
    res.json(new ApiResponse(true,"Your Queries",data,null));
})

router.patch("/changestatus/:qid",async (req,res)=>
{
    const id = req.params.qid;
    const obj = await Query.findByPk(id);
    if(obj==null)
        res.json(new ApiResponse(false,"Query Not Found !"));
    else{
        obj.status = obj.isactive?'closed':'open';
        obj.isactive = !obj.isactive;
        const newObj = await obj.save();
        res.json(new ApiResponse(true,"Query Status Changed !",newObj));
    }
})
router.get("/msgs", async (req,res)=>{
    const data = await Announcement.findAll()
    res.json(new ApiResponse(true,"Msgs",data,null));
})
router.get("/docslist", async (req,res)=>{
    const data = await Document.findAll({
        include : "faculty"
    })
    res.json(new ApiResponse(true,"Docs",data,null));
})
module.exports = router;