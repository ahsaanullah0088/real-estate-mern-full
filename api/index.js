import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const dbURI = process.env.MONGO

mongoose.connect( dbURI).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log('Error:', err);
})  //connect to database


app.listen(3000, ()=>{
    console.log('Server is running on port 3000!!!');
})



