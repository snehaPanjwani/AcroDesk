const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const userRouter = require('./routers/WebRouter');
const authRouter = require('./routers/AuthRouter');
const path = require('path')

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(fileUpload());
server.use(express.static(path.join(__dirname,"docs")))

server.use("/acrodesk",userRouter);
server.use("/auth",authRouter);

server.listen(7979,()=>{
     console.log("Server Running: http://localhost:7979")
});