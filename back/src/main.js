import { dir } from 'console';
import express from 'express';
import morgan from 'morgan';
import path from 'path';


const app = express();
const port = 3000;
const dirname = path.resolve();


app.use(express.static(path.join(dirname, '/static')))
app.use(morgan('tiny'));

app.get('/hosts', (req, res) => {
    res.sendFile(path.join(dirname, 'db.json'));
});

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});