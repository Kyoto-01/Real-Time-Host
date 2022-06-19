import hostCards from './lib/host/host_cards.js';
import auth from './services/auth.js';


if (auth.is_authenticated()) {
    hostCards.load('#card-list .container');
}