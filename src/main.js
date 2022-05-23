import express from 'express';
import morgan from 'morgan';
import path from 'path';
import data from './data.js';
import manager from './manager.js';


const dirname = path.resolve();
const dbPath = path.join(dirname, 'data', 'db.json');
const staticPath = path.join(dirname, 'static');

const app = express();
const port = 3000;


app.use(express.static(staticPath));
app.use(morgan('tiny'));
app.use(express.json());

data.load_db(dbPath);

app.get('/hosts', async (req, res) => {
    const cached = Boolean(req.query.cached);
    console.log(cached);
    const hosts = await manager.get_hosts_general(data.read(cached), cached);
    res.json(hosts);
});

app.post('/hosts', (req, res) => {
    const newHost = req.body;
    const created = data.create('hosts', newHost);
    res.json(created);
});

app.put('/hosts', (req, res) => {
    const hostID = req.query.id;
    const newData = req.body;
    const updated = data.update('hosts', hostID, newData);
    res.json(updated);
});

app.delete('/hosts', (req, res) => {
    const hostID = req.query.id;
    console.log(hostID)
    const removed = data.remove('hosts', hostID);
    res.json(removed)
});

// app.get('hosts/:id', (req, res) => {
//     const id = req.params.id;
//     res.sendFile(path.join(dirname, 'hosts.json'));
// });

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});