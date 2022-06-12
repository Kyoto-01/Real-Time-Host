import fetch from 'node-fetch';
import { agentPort } from './manager_config.js';


/*
    O servidor busca novas informações a cada x milisegundos (updateTime)
*/

const updateTime = 1000;

let HOSTS_GENERAL = [];
let HOSTS_GENERAL_CACHE = [];


set_hosts_general_update_interval();

function get_hosts_general(hostList) {

    /*
        Busca as informações gerais mais atuais
    */

    HOSTS_GENERAL_CACHE = hostList;

    if (HOSTS_GENERAL.length == 0) {
        HOSTS_GENERAL = hostList;
    }

    return HOSTS_GENERAL;
}

function set_hosts_general_update_interval() {
    return setInterval(() => update_hosts_general(), updateTime);
}

function update_hosts_general() {

    /*
        Acessa agente por agente, coletando suas informações gerais
    */

    for (let i in HOSTS_GENERAL_CACHE) {
        fetch_host_general(i);
    }
}

function fetch_host_general(hostIndex) {
    const host = HOSTS_GENERAL_CACHE[hostIndex];
    const url = `http://${host.ip}:${agentPort}/general`;

    try {
        fetch(url)
            .then(async (value) => {
                value = await value.json();
                value.id = host.id;
                HOSTS_GENERAL[hostIndex] = value;
            })
            .catch(() => {
                host.online = false;
                HOSTS_GENERAL[hostIndex] = host;
            });
    } catch {
        host.online = false;
        HOSTS_GENERAL[hostIndex] = host;
    }
}


export default { get_hosts_general };
