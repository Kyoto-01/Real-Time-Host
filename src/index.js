import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import Router from './routes/index.js';


const dirname = path.resolve();
const app = express();
const port = 3000;


app.use(express.static(path.join(dirname, 'public')));
app.use(morgan('tiny'));
app.use(express.json());

app.use(Router);

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});