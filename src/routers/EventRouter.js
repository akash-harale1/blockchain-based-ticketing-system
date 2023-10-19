const express = require("express");
const EventOragnizer = require("../schema/EventOrganizer");
const Authentication=require("../middleware/middleware")
const Events=require("../schema/Event")
const {v1,v4}=require('uuid');
const router=new express.Router();


router.get("/Event",async(req,res)=>{
  try{

    const event_data=await Events.find();
    res.send(event_data);
  }
  catch(e)
  {
    res.status(400).send(e);
  }


})

router.put("/reduce_ticket_count",async(req,res)=>{
  try
  {
    const event_data=await Events.updateOne({EventId:req.body.EventId,Available:{$gt:0}},{$inc:{Available:-1}});
    res.send(event_data);
  }
  catch(e)
  {
    res.send(e);
  }

})

router.post("/Event",Authentication,async(req,res)=>{
    try
    {

        const dbdata= await EventOragnizer.findOne({_id:req.decode._id});
        req.body.To=new Date(req.body.Date+"T"+req.body.To);
        req.body.From=new Date(req.body.Date+"T"+req.body.From);
        const data= new Events(req.body);
        data.Email=dbdata.Email;
        data.Available=data.Ticket;
        data.OrgnizerName=dbdata.Name;
        data.TotalCollection=0;
        // const timeZone = 'Asia/Kolkata';
        // const istTimeString = data.From.toLocaleString('en-US', { timeZone });
        // console.log(istTimeString); 
      
        const dbres=await data.save();
        res.send();
    }
    catch(e)
    {
      res.status(400).send(e);
    }
  
  });
  
  module.exports=router;