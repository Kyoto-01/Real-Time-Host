import { hosts } from './data/hosts.js';
import { load_hosts, add_host } from './lib/host_cards.js';


load_hosts(hosts, "#card-list .container");
add_host();
