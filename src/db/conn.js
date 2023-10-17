const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/nftapp").then(()=>{
    console.log("Connection of db done successfully");
}).catch((e)=>{
    console.log(e);
})

