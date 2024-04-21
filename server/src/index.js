import express from 'express';
import cors from 'cors';

import './env.js';
import './db.js';
import config from './config.js';

import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/api/reminders');
const port = 3001;


app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.json({
        app: "Recipe App",
        version: '0.0.1'
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
