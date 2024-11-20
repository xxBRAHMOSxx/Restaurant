import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import {connectDB} from './config/db.connect.js';
import testRoute from './routes/test.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

//config
dotenv.config()
connectDB()

//midleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api/v1/test',testRoute)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)

//main routes
app.get('/', (req, res) => {
    return res.send('Hello World');
})



//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

