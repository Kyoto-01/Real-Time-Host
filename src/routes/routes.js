import express from 'express';

import auth from '../middlewares/auth.js';
import hostController from '../controllers/host_controller.js';
import userController from '../controllers/user_controller.js';

const router = express.Router();

/* Hosts routes */

router.get('/hosts', auth.is_authenticated, hostController.index);

router.post('/hosts', auth.is_authenticated, hostController.create);

router.put('/hosts', auth.is_authenticated, hostController.update);

router.delete('/hosts', auth.is_authenticated, hostController.destroy);

router.get('/hosts/:id', auth.is_authenticated, hostController.read_by_id);

/* Users routes */

router.post('/users', userController.create);

router.post('/signin', userController.signin);

export default router;
