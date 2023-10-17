const mongoose= require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { response } = require("express");

const skey="thisprojectisbasedonnftticketgenerationsystem";
const EventOrganizerSchema =new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Insta:{
        type:String
    },
    Facebook:{
        type:String
    },
    Twitter:{
        type:String
    },
    Description:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Tokens:[{
        Token:{
            type:String,
            required:true
        }
    }]


});

EventOrganizerSchema.methods.generateToken= async function() {
   try{

    const d={_id:this._id.toString()};
    const token=await jwt.sign(d,skey);
 
    this.Tokens=this.Tokens.concat({Token:token});
    return token;

   }catch(e)
   {
        res.send(e);
   }
    




}



EventOrganizerSchema.pre("save",async function (next){
  let pass=await bcrypt.hash(this.Password,10);
  this.Password=pass;
  next();
})
const EventOragnizer= mongoose.model('EventOrganizer',EventOrganizerSchema);
module.exports=EventOragnizer;
