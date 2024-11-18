import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import testRoute from './routes/testRoute.js';

const app = express();

//config
dotenv.config()

//midleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/test',testRoute)
//main routes
app.get('/', (req, res) => {
    return res.send('Hello World');
})



//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

