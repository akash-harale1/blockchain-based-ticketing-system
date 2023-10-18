const express=require("express");
const jwt=require("jsonwebtoken");
const skey="thisprojectisbasedonnftticketgenerationsystem";
async function Authentication(req,res,next)
{
    try{
        let token=req.headers.authorization;
        let isValid= jwt.verify(token,skey);
        if(isValid)
        {   req.decode=isValid;
            next();
        }


    }
    catch(e)
    {  
        res.status(400).json({Error:"invalid Web Token"});
    }
    
}
module.exports=Authentication;