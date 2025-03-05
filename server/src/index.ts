import express from 'express'
import { router } from './routes';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors'
import { ENV } from './constants/env';
import { connectDB } from './config/dbConnection';


const app = express();


app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true 
    })
);
app.use('/api', router);
app.use(errorHandler);


app.listen(ENV.PORT, async () => {
    await connectDB()
    console.log('Server is running on PORT', ENV.PORT)
})