import { hosts } from './data/hosts.js';
import { load_hosts } from './lib/hosts.js';

load_hosts(hosts, "#card-list .container .row");
