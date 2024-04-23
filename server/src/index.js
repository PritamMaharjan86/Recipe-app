import express from 'express';
import cors from 'cors';

import './env.js';
import './db.js';
import config from './config.js';
import * as errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

import logIncomingRequest from './middleware/loggerMiddleware.js';
import logger from './logger.js'; // Import the logger

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/api/reminders');


import swaggerUi from 'swagger-ui-express';

import swaggerDoc from './swagger.json' assert {type: 'json'};

//swagger will run on localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(logIncomingRequest);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
    res.json({
        app: "Recipe App",
        version: '0.0.1'
    });
});

// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

const PORT = config.app.port;

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});
