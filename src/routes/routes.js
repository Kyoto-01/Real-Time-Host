import express from 'express';

import auth from '../middlewares/auth.js';
import agentController from '../controllers/agent_controller.js';
import userController from '../controllers/user_controller.js';

const router = express.Router();

/* Hosts routes */

router.get('/hosts', auth.is_authenticated, agentController.index);

router.post('/hosts', auth.is_authenticated, agentController.create);

router.put('/hosts', auth.is_authenticated, agentController.update);

router.delete('/hosts/:id', auth.is_authenticated, agentController.destroy);

router.get('/hosts/:id', auth.is_authenticated, agentController.read_by_id);

/* Users routes */

router.post('/users', userController.create);

router.post('/signin', userController.signin);

export default router;
