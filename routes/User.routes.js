const express=require("express");
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const {UserModel}=require("../model/User.model")
const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,gender}=req.body;

    try {
        bcrypt.hash(pass, 5, async(err, secure_password)=> {
           if(err){
            console.log(err);
           }else{
            const user=new UserModel({email,pass:secure_password,name,gender});
            await user.save();
            res.send("Registered")
           }
        });
    } catch (error) {
        res.send("Error in registering the user");
        console.log(error)
    }
   
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.find({email});
      if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
                if(result){
                 const token = jwt.sign({ course: 'fsd' }, 'ankur');
                 res.send({"msg":"Login Successfully","token":token})
                }
             });
        }else{
            res.send("wrong Credntials")
        }
       
    } catch (error) {
       res.send("Something went wrong ") ;
       console.log(error)
    }
   
})

module.exports={userRouter}
