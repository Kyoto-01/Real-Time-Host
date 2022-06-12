import fetch from 'node-fetch';
import { agentPort } from './manager_config.js'


async function get_host_all(host) {
    const url = `http://${host.ip}:${agentPort}/all`;
    let hostAll = {};

    await fetch(url)
        .then(async (value) => {
            value = await value.json();
            value.id = host.id;
            hostAll = value;
        }).catch(() => {
            hostAll = { general: host };
        });
    return hostAll;
}


export default { get_host_all };
