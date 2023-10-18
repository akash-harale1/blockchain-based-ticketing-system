const express = require("express");
const cors = require("cors");
const app = express();
require("./db/conn");
const EventOragnizer = require("./schema/EventOrganizer");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");
const Authentication=require("./middleware/middleware")
const Events=require("./schema/Event")
const {v1,v4}=require('uuid');

app.use(express.json());
app.use(cors());
app.post("/sign_up", async (req, res) => {
  try {
    const eo = new EventOragnizer(req.body);
    eo.generateToken();
    const data = await eo.save();
    res.send().status(201);
  } catch (e) {
    res.status(400).json({ error: "This account already exists" });
  }
});
app.post("/Event",Authentication,async(req,res)=>{
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

})
app.post("/sign_in",async(req,res)=>{
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



})



app.get("/", (req, res) => {
  res.send("hi here is backend");
});
app.listen(5000, () => {
  console.log("server stated successfully");
});
