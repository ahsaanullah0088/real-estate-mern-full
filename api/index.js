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


app.use((err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error "; 
    return res.status(statusCode).json({
        success : false,
        statusCode, 
        message,
    }) ;
});