import api from '../../services/api.js';


/*
    Funções p/ manipulação de objetos host
*/

const hostsResource = '/hosts';


async function filter_hosts(filterstring) {
    const hosts = await get_hosts();
    const filterhost = hosts.filter(value => {
        value.hostname.toUpperCase().includes(filterstring.toUpperCase()) || value.ip.includes(filterstring)
    });
    return filterhost;
}

async function add_host(form) {
    const id = String(new Date().getTime());
    const hostname = form.querySelector('#add-host-name').value;
    const ip = form.querySelector('#add-host-ip').value;
    const os = form.querySelector('#add-host-so').value;
    const online = true;

    const newHost = { id, hostname, ip, os, online };

    return await api.create(hostsResource, newHost);
}

async function del_host(hostData) {
    return await api.destroy(`${hostsResource}/?id=${hostData.id}`);
}

async function get_hosts_cached() {
    return await api.read(`${hostsResource}/?cached=true`);
}

async function get_hosts() {
    return await api.read(hostsResource);
}


export default { add_host, del_host, get_hosts_cached, get_hosts, filter_hosts };