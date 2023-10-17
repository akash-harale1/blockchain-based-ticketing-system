const express = require("express");
const cors = require("cors");
const app = express();
require("./db/conn");
const EventOragnizer = require("./schema/EventOrganizer");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");

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
