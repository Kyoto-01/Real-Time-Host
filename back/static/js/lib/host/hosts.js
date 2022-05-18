import api from '../../services/api.js';


/*
    Funções p/ manipulação de objetos host
*/


const hostsResource = '/hosts';


// eventos relacionados ás funções deste script
function host_events() {
    add_host_events();
}

function add_host_events() {
    const addHostModal = new bootstrap.Modal(document.getElementById('add-host-modal'));
    const form = document.getElementById('add-host-form');

    document.getElementById('add-host-btn').onclick = () => addHostModal.show();

    form.onsubmit = (event) => {

        event.preventDefault();

        add_host(form);

        form.reset();
        addHostModal.hide();
    };
}

async function filter_hosts(filterstring) {
    const hosts = await get_hosts();
    const filterhost = hosts.filter( h => h.general.hostname.toUpperCase().includes(filterstring.toUpperCase()) || h.general.ip.includes(filterstring) );
    return filterhost;
}



async function add_host(form) {
    const id = new Date().getTime();
    const hostname = form.querySelector('#add-host-name').value;
    const ip = form.querySelector('#add-host-ip').value;
    const os = form.querySelector('#add-host-so').value;

    const newHost = {
        id: id,
        general: {
            hostname: hostname,
            ip: ip,
            os: os,
            online: true,
        },
    };

    await api.create(hostsResource, newHost);
}

async function del_host(hostData) {
    const delHostModalElement = document.getElementById('del-host-confirm-modal');
    const delHostModalBody = delHostModalElement.querySelector('.modal-body');
    const delHostConfirmButton = delHostModalElement.querySelector('.btn-danger');
    const delHostModal = new bootstrap.Modal(delHostModalElement);

    delHostModalBody.innerHTML = `Deseja remover o host ${hostData.general.hostname} (${hostData.general.ip})?`;

    delHostConfirmButton.onclick = () => api.destroy(`${hostsResource}/${hostData.id}`);

    delHostModal.show();
}

async function get_hosts() {
    return await api.read(hostsResource);
}


export default { host_events, add_host, del_host, get_hosts, filter_hosts };
