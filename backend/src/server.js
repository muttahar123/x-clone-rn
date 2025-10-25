import express from 'express';
import { ENV } from './config/env.js';
import {connectDB} from './config/db.js';

const app = express();


app.get('/' , (req,res) => {
    res.send('Hello from X server')
})

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