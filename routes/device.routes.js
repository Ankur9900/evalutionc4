const express =require("express")


const { DeviceModel } = require("../model/device.model")

const deviceRouter =express.Router()


deviceRouter.get("/",async(req,res)=>{
    // const userID=req.body.TodoID
    try{
        const notes=await DeviceModel.find()
        res.send(notes)
    }
    catch(err){
        console.log(err)
        res.send("something wrong")
    }
    
})


deviceRouter.post("/create",async (req,res)=>{
    const payload=req.body
    console.log(payload)
    try{
        // await NoteModel.insertMany(payload)
        const new_note=new DeviceModel(payload)
        await new_note.save()
        res.send({"mesg":"Notes create successfully"})
    }

    catch(err)
    {
        console.log(err)
        res.send({"err":"something wrong"})
    }
})

deviceRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    const note=await DeviceModel.findOne({"_id":id})
    const userID_in_note=note.userID;
    const userID_making_req=req.body.userID;
    try {
    //    if("userID who is making req"==="userID in that particular doc") 
    if(userID_making_req===userID_in_note){
        res.send({"msg":"You are not authorized"})
    }else{
        await DeviceModel.findByIdAndUpdate({"_id":id},payload)
        res.send("Updated the note")
    }
    } catch (error) {
     console.log(error);
     res.send({"msg":"Something went wrong"})   
    }
    
})


deviceRouter.delete("/delete/:id",async (req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    const note=await DeviceModel.findOne({"_id":id})
    const userID_in_note=note.userID;
    const userID_making_req=req.body.userID;
    try {
    //    if("userID who is making req"==="userID in that particular doc") 
    if(userID_making_req===userID_in_note){
        res.send({"msg":"You are not authorized"})
    }else{
        await DeviceModel.findByIdAndDelete({"_id":id},payload)
        res.send("Updated the note")
    }
    } catch (error) {
     console.log(error);
     res.send({"msg":"Something went wrong"})   
    }
    
    
    res.send("wellcome back")
})


module.exports={deviceRouter}