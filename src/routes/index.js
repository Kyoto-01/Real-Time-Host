import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import hostController from '../controllers/host_controller.js';
import auth from '../middlewares/auth.js';


const router = express.Router();


router.get('/hosts', auth.is_authenticated, hostController.index);

router.post('/hosts', auth.is_authenticated, hostController.create);

router.put('/hosts', auth.is_authenticated, hostController.update);

router.delete('/hosts', auth.is_authenticated, hostController.destroy);

router.get('/hosts/:id', auth.is_authenticated, hostController.read_by_id);

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

            res.json({ auth: true, token, username: user.name, email: user.email });
        } else {
            res.json({ auth: false, errors: 'pass' });
        }
    } else {
        res.json({ auth: false, errors: 'user' })
    }
});

router.get('/signout', (req, res) => {
    return res.json({ auth: false, token: null });
});


export default router;
