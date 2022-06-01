import fetch from 'node-fetch';


const agentPort = 5000;


async function get_hosts_general(hosts, cached = false) {

    /*
        Acessa agente por agente, coletando suas informações gerais
    */

    let host_general_list = [];

    // ex.: quando o sistema inicia ele não faz a busca na rede
    // ele traz as informações em cache no banco de dados
    if (cached) {
        host_general_list = hosts;
    }
    else {
        host_general_list = await fetch_hosts_general(hosts);
    }

    return {
        hosts: host_general_list
    };
}

async function fetch_hosts_general(hosts) {
    const host_general_list = [];

    for (let host of hosts) {
        const host_general = await fetch_host_general(host);
        host_general_list.push(host_general);
    }

    return host_general_list;
}

async function fetch_host_general(host) {
    const ip = host.ip;
    const url = `http://${ip}:${agentPort}/all`;
    let hostGeneral = {};

    await fetch(url)
        .then(async (value) => {
            value = await value.json();
            value.id = host.id;
            hostGeneral = value;
        }).catch(() => {
            hostGeneral = host;
        });

    return hostGeneral;
}

async function get_host_all(host) {
    const ip = host.ip;
    const url = `http://${ip}:${agentPort}/general`;
    let hostAll = {};

    await fetch(url)
        .then(async (value) => {
            value = await value.json();
            value.id = host.id;
            hostAll = value;
        }).catch(() => {
            hostAll = host;
        });

    return host_general;
}


export default { get_hosts_general, get_host_all };