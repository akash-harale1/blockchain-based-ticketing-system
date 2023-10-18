const express = require("express");
const EventOragnizer = require("../schema/EventOrganizer");
const Authentication=require("../middleware/middleware")
const Events=require("../schema/Event")
const {v1,v4}=require('uuid');
const router=new express.Router();


router.post("/Event",Authentication,async(req,res)=>{
    try
    {
        const event_id=v1();
        const dbdata= await EventOragnizer.findOne({_id:req.decode._id});
        req.body.To=new Date(req.body.Date+"T"+req.body.To);
        req.body.From=new Date(req.body.Date+"T"+req.body.From);
        const data= new Events(req.body);
        data.EventId=event_id;
        data.Email=dbdata.Email;
        data.Available=dbdata.Ticket;
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