import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import hostsGeneralManager from '../manager/hosts_general.js';
import hostAllManager from '../manager/host_all.js';
import hostsModel from '../models/host.js';
import userModel from '../models/user.js';
import auth from '../middlewares/auth.js';


const router = express.Router();


router.get('/hosts', auth.is_authenticated, (req, res) => {
    const cached = Boolean(req.query.cached);
    let hostList = hostsModel.read();

    if (!cached) {
        hostList = hostsGeneralManager.get_hosts_general(hostList);
    }

    res.json(hostList);
});

router.post('/hosts', auth.is_authenticated, (req, res) => {
    const newHost = req.body;
    const created = hostsModel.create(newHost);
    res.status(201).json(created);
});

router.put('/hosts', auth.is_authenticated, (req, res) => {
    const hostID = req.query.id;
    const newData = req.body;
    const updated = hostsModel.update(hostID, newData);
    res.json(updated);
});

router.delete('/hosts', auth.is_authenticated, (req, res) => {
    const hostID = req.query.id;
    hostsModel.remove(hostID);
    res.status(204).send();
});

router.get('/hosts/:id', auth.is_authenticated, async (req, res) => {
    const id = req.params.id;
    const hostList = hostsModel.read();
    const host = hostList.find(value => value.id == id);
    const hostInfos = await manager.get_host_all(host);

    res.json(hostInfos);
});

router.post('/users', async (req, res) => {
    const user = req.body;
    const newUser = await userModel.create(user);

    res.status(201).json(newUser);
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = userModel.read_by_email(email);

    if (user) {
        const { id: userId, password: hash } = user;

        const match = await bcrypt.compare(password, hash);

        if (match) {
            const token = jwt.sign(
                { userId },
                process.env.SECRET,
                { expiresIn: 3600 } // 5min
            );

            res.json({ auth: true, token });
        } else {
            res.json({ auth: false, token: 'pass' });
        }
    } else {
        res.json({ auth: false, token: 'user' })
    }
});

router.get('/signout', (req, res) => {
    return res.json({ auth: false, token: null });
});


export default router;
