import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const dbURI = process.env.MONGO
import authRouter from './routes/authRoute.js';
import userRouter from './routes/useRoute.js';

mongoose.connect( dbURI).then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log('Error:', err);
})  //connect to database


app.listen(3000, ()=>{
    console.log('Server is running on port 3000!!!');
})

app.use(express.json());

app.use('/api/users', userRouter);

app.use('/api/auth', authRouter);
