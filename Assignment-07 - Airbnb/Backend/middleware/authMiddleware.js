const jwt=require('jsonwebtoken')
const sKey=require('../config').secret

function verifyToken(req,res,next){
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({error:"Access denied"})
    }

    try{
        const decoded = jwt.verify(token,sKey);
        req.email = decoded.emai;
        next();
    }catch (error){
        res.status(401).json({error:'Invalid token'})
    }
};


module.exports=verifyToken