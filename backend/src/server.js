import express from 'express';
import { ENV } from './config/env.js';
import {connectDB} from './config/db.js';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import userRoutes from './routes/user.route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/' , (req,res) => {
    res.send('Hello from X server')
})

app.use('/api/users', userRoutes);

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(ENV.PORT, () => {
            console.log(`Server is running on port ${ENV.PORT}`);
        });

        server.on('error', (error) => {
            console.error('Failed to start server', error);
            process.exit(1);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
}; 

startServer();