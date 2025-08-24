const router = require('express').Router()
const path = require('path');
const {Query, QueryResponse, Announcement, Document} = require('../models')
const {v4: uuidv4} = require('uuid');



const ApiResponse = require('../utils/ApiResponse');

router.use((req,res,next)=>
{
    if(req.loginuser.role!='faculty')
        res.json(new ApiResponse(false,"UnAuthorized Request !",null,null))
    else
        next();
});

router.get("/queries",async (req,res)=>{
    const queries = await Query.findAll({
        where : {
            status : "open", isactive : true
        },
        include : ["student","answers"]
    });
    res.json(new ApiResponse(true,"Queries Records",queries,null))
});
router.post("/sendanswer/:qid", async(req,res)=>{
    try{
        const qid = req.params.qid;
        const obj = req.body;
        const quObj = await Query.findByPk(qid);
        if(quObj == null){
            res.json(new ApiResponse(false,"Query Not Found",null,null));
        } else {
          obj.responseby = req.loginuser.userid;
          obj.query = qid;
          const newObj = await QueryResponse.create(obj);
          res.json(new ApiResponse(true,"Query Answered",newObj,null));
        } 
    }catch(err){
        res.json(new ApiResponse(true,"Query Not saved",null,err));
    }
})
router.post("/sendmsg",async(req,res)=>
{
    try{
        const obj = req.body;
        obj.postby = req.loginuser.userid;
        obj.isactive = true;
        
        const newObj = await Announcement.create(obj);
        res.json(new ApiResponse(true,"Message Sent !",newObj,null));
    }catch(err){
        res.json(new ApiResponse(false,"Message Not Sent !",null,err));
    }
})
router.get("/msgs", async (req,res)=>{
    const data = await Announcement.findAll()
    res.json(new ApiResponse(true,"Msgs",data,null));
})
router.get("/mydocs", async (req,res)=>{
      const id = req.loginuser.userid;
      const list = await Document.findAll({
        where : {uploadedby : id}
      });
      res.json(new ApiResponse(true,"Your Documents",list,null));
})

router.post("/uploaddoc", async (req, res) => {
    try {
        
        const reqfile = req.files.file;
        const filename = uuidv4() + path.extname(reqfile.name)
        const dir = 'docs';
        const filepath = path.join(dir, filename);
        reqfile.mv(filepath);

        const data = {...req.body, filepath : filename, isapproved : true , uploadedby: req.loginuser.userid};
        const newObj = await Document.create(data);
        res.json(new ApiResponse(true, "File Uploaded Successfully !", newObj, null));
    } catch (err) {
        res.json(new ApiResponse(false, "File Not Uploaded !", null, err));
    }
     
})
module.exports = router;