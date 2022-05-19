import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';


const dirname = path.resolve();
const dbPath = path.join(dirname, 'data', 'db.json');
const staticPath = path.join(dirname, 'static');
const registeredHosts = JSON.parse(fs.readFileSync(dbPath)).hosts;


async function get_host_general_list(updateDB = false) {
    const host_general_list = [];

    for (let host in registeredHosts) {
        const ip = host.ip;

        await fetch(`${ip}:5000/general`)
            .then((value) => {
                host_general_list.push(value);
            }).catch(() => {
                host_general_list.push(registeredHosts[host]);
            });
    }

    if (updateDB) {
        update_hosts_db(host_general_list);
        console.log(`${dbPath} database was updated.`)
    }

    return {
        hosts: host_general_list
    };
}

function update_hosts_db(hosts) {
    for (let host in hosts) {
        registeredHosts[host] = hosts[host];
    }

    fs.writeFileSync(dbPath, JSON.stringify({
            hosts: registeredHosts
        })
    );
}


export default { dirname, dbPath, staticPath, get_host_general_list };
