const mongoose= require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { response } = require("express");

const skey="thisprojectisbasedonnftticketgenerationsystem";
const EventSchema =new mongoose.Schema({
    EventId:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true
    },
    EventName:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true,
    },
    From:{
        type:Date,
        required:true
    },
    To:{
        type:Date,
        required:true
    },
    Location:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Ticket: {
        type:Number,
        required:true
    },
    Available: {
        type:Number,
        requried:true
    },
    OrgnizerName:{
        type:String,
        required:true
    },
    TotalCollection:{
        type:Number,
        requried:true
    },
    IpfsLink:{
        type:String,
        required:true,
    }


    
});

// EventOrganizerSchema.methods.generateToken= async function() {
//    try{

//     const d={_id:this._id.toString()};
//     const token=await jwt.sign(d,skey);
 
//     this.Tokens=this.Tokens.concat({Token:token});
//     return token;

//    }catch(e)
//    {
//         res.send(e);
//    }
// }



// EventOrganizerSchema.pre("save",async function (next){
//   let pass=await bcrypt.hash(this.Password,10);
//   this.Password=pass;
//   next();
// })
const Events= mongoose.model('Event',EventSchema);
module.exports=Events;
