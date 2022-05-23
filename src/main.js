import express from 'express';
import morgan from 'morgan';
import path from 'path';
import Router from './routes.js';


const dirname = path.resolve();
const dbPath = path.join(dirname, 'database', 'db.json');
const staticPath = path.join(dirname, 'static');

const app = express();
const port = 3000;


app.use(express.static(staticPath));
app.use(morgan('tiny'));
app.use(express.json());

app.use(Router);

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});