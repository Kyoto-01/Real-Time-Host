import fetch from 'node-fetch';


const agentPort = 5000;


async function get_hosts_general(db_data, cached = false) {

    /*
        Acessa agente por agente, coletando suas informações gerais
    */

    let host_general_list = [];

    if (cached) {
        host_general_list = db_data.hosts;
    }
    else {
        host_general_list = await fetch_hosts_general(db_data.hosts);
    }

    return {
        hosts: host_general_list
    };
}

async function fetch_hosts_general(hosts){
    const host_general_list = [];

    for (let host of hosts) {
        const host_general = await fetch_host_general(host);
        host_general_list.push(host_general);
    }

    return host_general_list;
}

async function fetch_host_general(host) {
    const ip = host.ip;
    const url = `http://${ip}:${agentPort}/general`;

    await fetch(url)
        .then(async (value) => {
            value = await value.json();
            value.id = host.id;
            return value;
        }).catch(() => {
            return host;
        });
}

async function get_host_all() { }


export default { get_hosts_general, get_host_all };