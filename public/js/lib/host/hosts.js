import api from '../../services/api.js';
import Auth from '../../services/auth.js';

/*
    Funções p/ manipulação de objetos host
*/

const hostsResource = '/hosts';


async function filter_hosts(filterString, hosts) {
    const filterHost = hosts.filter(value => {
        return (
            value.general.hostname.toUpperCase().includes(filterString.toUpperCase()) || value.general.ip.includes(filterString)
        );
    });
    return filterHost;
}

async function add_host(form) {
    const hostname = form.querySelector('#add-host-name').value;
    const ip = form.querySelector('#add-host-ip').value;
    const os = form.querySelector('#add-host-so').value;
    const online = false;

    const newHost = { hostname, ip, os, online };

    try {
        await api.create(hostsResource, newHost, `${Auth.authType} ${Auth.get_token()}`);
    } catch (error) {
        console.log(error)
        Auth.signout();
    }
}

async function del_host(hostData) {
    try {
        await api.destroy(`${hostsResource}/?id=${hostData.general.id}`, `${Auth.authType} ${Auth.get_token()}`);
    } catch (error) {
        console.log(error)
        Auth.signout();
    }
}

async function get_hosts() {
    try {
        return await api.read(hostsResource, `${Auth.authType} ${Auth.get_token()}`);
    } catch (error) {
        console.log(error)
        Auth.signout();
    }
}

async function get_host_all(host) {
    try {
        return await api.read(`${hostsResource}/${host.general.id}`, `${Auth.authType} ${Auth.get_token()}`);
    } catch (error) {
        console.log(error)
        Auth.signout();
    }
}

export default {
    add_host,
    del_host,
    get_hosts,
    get_host_all,
    filter_hosts
};