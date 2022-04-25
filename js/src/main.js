import { load_hosts } from './lib/host_cards.js';
import { handle_menu } from './menu.js';


handle_menu();

load_hosts('#card-list .container');
