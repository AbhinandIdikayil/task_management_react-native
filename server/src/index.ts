import express from 'express'
import { router } from './routes';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors'
import { ENV } from './constants/env';
import { connectDB } from './config/dbConnection';


const app = express();


app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);


app.listen(ENV.PORT, async () => {
    await connectDB()
    console.log('Server is running on PORT', ENV.PORT)
})