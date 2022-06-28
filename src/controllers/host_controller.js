import hostModel from '../models/host.js';
import hostManager from '../manager/host_manager.js';


async function index(req, res) {

    // pega apenas informações gerais

    const cached = Boolean(req.query.cached);
    let response = await hostModel.read_all();

    response = response.map((item) => (item.general ? item : { general: item }));

    if (!cached) {
        response = hostManager.get_hosts(response);
        response = response.map((item) => ({ general: item.general }));
    }

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

    res.status(204);
}


export default {
    index,
    read_by_id,
    create,
    update,
    destroy
}
