import hostModel from '../models/host.js';
import hostManager from '../manager/host_manager.js';


function index(req, res) {
    const cached = Boolean(req.query.cached);
    let response = hostModel.read_all();

    if (!cached) {
        response = hostManager.get_hosts(response);
    }

    res.json(response);
}

function read_by_id(req, res) {
    const id = req.params.id;
   
    const response = hostManager.get_host_by_id(id);

    res.json(response);
}

function create(req, res) {
    const data = req.body;
    const response = hostModel.create(data);

    res.status(201).json(response);
}

function update(req, res) {
    const id = req.query.id;
    const data = req.body;
    const response = hostModel.update(id, data);

    res.json(response);
}

function destroy(req, res) {
    const id = req.query.id;

    hostModel.remove(id);
    
    res.status(204).send();
}


export default {
    index,
    read_by_id,
    create,
    update,
    destroy
}
