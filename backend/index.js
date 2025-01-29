import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routers/register.js'
import bodyParser from 'body-parser';
const app=express();
const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',router);
// mongoose.connect("mongodb://localhost:27017/sample").then(console.log(()=>"Mongoose Connected"))
mongoose.connect("mongodb://localhost:27017/sample")
    .then(() => console.log("Mongoose Connected"))
    .catch(err => console.error("Mongoose Connection Error", err));

app.get("/",(req,res)=>{
    res.send("Hello!!!");
})
app.listen(5000,()=>{
    console.log("Server listening at 5000");
})