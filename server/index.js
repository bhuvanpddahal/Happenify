// LIBRARY IMPORTS
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// LOCAL IMPORTS
import './src/mongodb/connection.js';
import userRouter from './src/routes/user.routes.js';
import eventRouter from './src/routes/event.routes.js';

// CONFIGURATIONS
dotenv.config();

// VARIABLES
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARES
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

// SERVER
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});