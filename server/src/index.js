import express from 'express';
import cors from 'cors';

import './env.js';
import './db.js';
import config from './config.js';

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/api/reminders');
const port = 3001;


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
