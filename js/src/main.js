import { load_hosts, add_host } from './lib/host_cards.js';


async function show_hosts(parentSelector){
    const response = await fetch('http://127.0.0.1:3000/hosts');
    const hostList = await response.json();
    console.log(hostList);
    load_hosts(hostList, parentSelector)
}

show_hosts("#card-list .container");
add_host();
