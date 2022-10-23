import hostModel from '../models/host_model.js';
import { Manager } from '../manager/manager.js';

const agentManager = Manager(5000, 1000, 5000, null);

async function index(req, res) {
    if (!agentManager.has_agents())
        agentManager.agentList = await hostModel.read_all();

    let response = agentManager.agentList.map((item) => ({ 
        "id": item.id,
        "addr": item.addr,
        "online": item.online,
        "system": item.system, 
    }));

    res.json(response);
}

function read_by_id(req, res) {
    const id = req.params.id;

    const response = hostManager.get_host_by_id(id);

    res.json(response);
}

async function create(req, res) {
    const data = req.body;

    const response = await hostModel.create(data);

    hostManager.reset_hosts();

    res.status(201).json(response);
}

async function update(req, res) {
    const id = req.query.id;
    const data = req.body;

    const response = await hostModel.update(id, data);

    res.json(response);
}
 
async function destroy(req, res) {
    const id = req.query.id;

    await hostModel.remove(id);

    hostManager.reset_hosts();

    res.status(204);
}

export default {
    index,
    read_by_id,
    create,
    update,
    destroy
}
