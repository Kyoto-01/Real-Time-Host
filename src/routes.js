import express from 'express';
import manager from './manager.js';
import hosts from './models/host.js';


const router = express.Router();


router.get('/hosts', async (req, res) => {
    const cached = Boolean(req.query.cached);
    const hostList = await manager.get_hosts_general(hosts.read(), cached);
    res.json(hostList);
});

router.post('/hosts', (req, res) => {
    const newHost = req.body;
    const created = hosts.create(newHost);
    res.status(201).json(created);
});

router.put('/hosts', (req, res) => {
    const hostID = req.query.id;
    const newData = req.body;
    const updated = hosts.update(hostID, newData);
    res.json(updated);
});

router.delete('/hosts', (req, res) => {
    const hostID = req.query.id;
    hosts.remove(hostID);
    res.status(204).send();
});

// router.get('hosts/:id', (req, res) => {
//     const id = req.params.id;
//     res.sendFile(path.join(dirname, 'hosts.json'));
// });


export default router;
