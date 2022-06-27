import fetch from 'node-fetch';


/*
    O servidor busca novas informações a cada x milisegundos (updateTime)
*/

const agentPort = 5000;
const updateTime = 1000;

let HOSTS = [];
let HOSTS_CACHE = [];


start();


function start() {
    return setInterval(() => update_hosts(), updateTime);
}

function get_hosts(hostList) {

    /*
        Busca as informações mais atuais
    */

    HOSTS_CACHE = hostList;

    if (HOSTS.length == 0) {
        HOSTS = hostList;
    }

    return HOSTS;
}

function get_host_by_id(id) {
    return HOSTS.find(host => host.general.id == id);
}

function update_hosts() {

    /*
        Acessa agente por agente, coletando suas informações gerais
    */

    for (let i in HOSTS_CACHE) {
        fetch_host(i);
    }
}

function fetch_host(index) {
    const host = HOSTS_CACHE[index];
    const url = `http://${host.general.ip}:${agentPort}/all`;

    try {
        fetch(url)
            .then(async (value) => {
                value = await value.json();
                value.general.id = host.general.id;
                HOSTS[index] = value;
            })
            .catch(() => {
                host.general.online = false;
                HOSTS[index] = host;
            });
    } catch {
        host.general.online = false;
        HOSTS[index] = host;
    }
}


export default {
    get_hosts,
    get_host_by_id
};
