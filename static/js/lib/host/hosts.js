import api from '../../services/api.js';


/*
    Funções p/ manipulação de objetos host
*/

const hostsResource = '/hosts';


async function filter_hosts(filterString, hosts) {
    const filterHost = hosts.filter(value => {
        return (
            value.hostname.toUpperCase().includes(filterString.toUpperCase()) || value.ip.includes(filterString)
        );
    });
    return filterHost;
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

async function get_host_all(host){
    return await api.read(`${hostsResource}/${host.id}`)
}


export default {
    add_host,
    del_host,
    get_hosts_cached,
    get_hosts,
    get_host_all,
    filter_hosts
};