import express from 'express';
import morgan from 'morgan';
import data from './data.js';


const app = express();
const port = 3000;


app.use(express.static(data.staticPath));
app.use(morgan('tiny'));

app.get('/hosts', async (req, res) => {
    const update = Boolean(req.query.update);
    const hosts = await data.get_host_general_list(update);

    res.json(hosts);
});

// app.get('hosts/:id', (req, res) => {
//     const id = req.params.id;
//     res.sendFile(path.join(dirname, 'hosts.json'));
// });

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});