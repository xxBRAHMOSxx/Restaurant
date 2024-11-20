import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import {connectDB} from './config/db.connect.js';
import testRoute from './routes/testRoute.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

//config
dotenv.config()
connectDB()

//midleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/test',testRoute)
app.use('/api/v1/auth',authRoutes)
//main routes
app.get('/', (req, res) => {
    return res.send('Hello World');
})



//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

