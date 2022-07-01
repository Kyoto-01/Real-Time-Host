import fetch from 'node-fetch';


/*
    O servidor busca novas informações a cada x milisegundos (updateTime)
*/

const agentPort = 5000;
const updateTime = 1000;

let HOSTS = [];


start();


function start() {
    return setInterval(() => update_hosts(), updateTime);
}

function is_void() {
    return HOSTS.length == 0
}

function set_hosts(hostList) {
    HOSTS = hostList;
}

function get_hosts() {
    return HOSTS;
}

function get_host_by_id(id) {
    return HOSTS.find(host => host.general.id == id);
}

function reset_hosts() {
    HOSTS.splice(0, HOSTS.length);
}

function update_hosts() {
    for (let i in HOSTS) {
        fetch_host(i);
    }
}

function fetch_host(index) {
    const host = HOSTS[index];
    const url = `http://${host.general.ip}:${agentPort}/all`;

    try {
        fetch(url)
            .then(async (value) => {
                value = await value.json();
                value.general.id = host.general.id;
                if (HOSTS[index].general.id === value.general.id) {
                    HOSTS[index] = value;
                }
                return;
            })
            .catch(() => {
                host.general.online = false;
            });
    } catch {
        host.general.online = false;
    }
}


export default {
    set_hosts,
    get_hosts,
    is_void,
    get_host_by_id,
    reset_hosts,
};
