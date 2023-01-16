const mongoose=require("mongoose");

const deviceSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    UserID:String
   
})
const DeviceModel=mongoose.model("posts",deviceSchema);

module.exports={DeviceModel}