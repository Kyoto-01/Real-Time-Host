import express from 'express';
import hostsModel from './models/host.js';
import hostsGeneralManager from './manager/hosts_general.js';
import hostAllManager from './manager/host_all.js';


const router = express.Router();


router.get('/hosts', (req, res) => {
    const cached = Boolean(req.query.cached);
    let hostList = hostsModel.read();

    if (!cached) {
        hostList = hostsGeneralManager.get_hosts_general(hostList);
    }

    res.json(hostList);
});

router.post('/hosts', (req, res) => {
    const newHost = req.body;
    const created = hostsModel.create(newHost);
    res.status(201).json(created);
});

router.put('/hosts', (req, res) => {
    const hostID = req.query.id;
    const newData = req.body;
    const updated = hostsModel.update(hostID, newData);
    res.json(updated);
});

router.delete('/hosts', (req, res) => {
    const hostID = req.query.id;
    hostsModel.remove(hostID);
    res.status(204).send();
});

router.get('/hosts/:id', async (req, res) => {
    const id = req.params.id;
    const hostList = hostsModel.read();
    const host = hostList.find(value => value.id == id);
    const hostInfos = await manager.get_host_all(host);
    
    res.json(hostInfos);
});


export default router;
