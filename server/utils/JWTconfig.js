const jwt = require('jsonwebtoken');

const secretkey = "hhhvuhkihuug4edwshuiewgfjdhcs546548454cdjhed";
const expiry = "1h";

function generateToken(userid, role)
{
    const token = jwt.sign({userid, role} , secretkey, { expiresIn : expiry });
    return token;
}
function verifyToken(token,callback){
    jwt.verify(token,secretkey,(err,tokenData)=>{
        if(err)
            callback(err,null)
        else
            callback(null,tokenData)
    })
}

module.exports = {generateToken, verifyToken}