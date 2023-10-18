const express = require("express");
const EventOragnizer = require("../schema/EventOrganizer");
const bcrypt = require("bcrypt");
const Authentication=require("../middleware/middleware") ;;

const router=new express.Router();
router.get("/EventOrganizer",Authentication,async(req,res)=>{
  try{
    console.log(req.decode._id);
    const dbdata= await EventOragnizer.findOne({_id:req.decode._id},{Name:1,
    Email:1,
    Insta:1,
    Facebook:1,
    Twitter:1,
    Description:1,
    _id:0
    });

    res.send(dbdata);
  }
  catch(e)
  {
    res.status(400).send(e);
  }
 
});
router.post("/sign_up", async (req, res) => {
  try {
    const eo = new EventOragnizer(req.body);
    eo.generateToken();
    const data = await eo.save();
    res.send().status(201);
  } catch (e) {
    res.status(400).json({ error: "This account already exists" });
  }
});



router.post("/sign_in",async(req,res)=>{
    try{
      let data=req.body;
      const dbdata= await EventOragnizer.findOne({Email:data.Email});
      if(!dbdata)
      {
        throw new Error("User Not Found !!!");
      }
      const isMatch= await bcrypt.compare(data.Password,dbdata.Password);
      if(isMatch)
      {
        const token =await dbdata.generateToken();
        res.json({Token:token}).send();
      }
      else
      {
        res.status(400).json({Error:"Invalid Password !!!!"});
      }
  
  
    
    }
    catch(e)
    {
     res.status(400).json(e.message);
    }
  
  
  
  });  

 module.exports= router;