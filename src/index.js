import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import router from './routes/routes.js';

const app = express();
const port = 3000;
const dirname = path.resolve();

app.use(express.static(path.join(dirname, "public")));
app.use(morgan("tiny"));
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});