const express=require("express");
const { connection } = require("./config/db");
const { userRouter}=require("./routes/User.routes");
const {deviceRouter}=require("./routes/device.routes")
const { authenticate } = require("./middlewares/authenticate.middleware");
const app=express();
app.use(express.json());
require("dotenv").config();





app.get("/",(req,res)=>{
    res.send("welcome to c4 evalution.")
})

app.use("/users",userRouter)
app.use(authenticate);
app.use("/posts",deviceRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to the db")
    } catch (err) {
       console.log("Trouble connecting to the db") ;
       console.log(err)
    }
    console.log("running at 5600")
})