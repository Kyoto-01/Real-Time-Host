import agentModel from '../models/agent_model.js';
import { Manager } from '../manager/manager.js';

const agentManager = new Manager(5000, 1000, 5000, (await agentModel.read_all()));

function index(req, res) {
    const response = agentManager.summary_agents();

    res.json(response);
}

function read_by_id(req, res) {
    const id = req.params.id;

    const response = agentManager.get_agent(id);

    res.json(response);
}

async function create(req, res) {
    const data = req.body;

    const response = await agentModel.create(data);

    agentManager.add_agent(response);

    res.status(201).json(response);
}

async function update(req, res) {
    const data = req.body;

    const response = await agentModel.update(data);

    res.json(response);
}
 
async function destroy(req, res) {
    const id = req.params.id;

    await agentModel.remove(id);

    agentManager.remove_agent(id);

    res.status(204);
}

export default {
    index,
    read_by_id,
    create,
    update,
    destroy
}
