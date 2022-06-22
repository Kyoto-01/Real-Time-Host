import hostCards from './lib/host/host_cards.js';
import auth from './services/auth.js';


function load_user() {
    document.querySelector('#user-link button').innerText = localStorage.getItem('@Real-Time-Host:username');
}

function load_user_signout() {
    document.getElementById('signout-link').onclick = () => {
        const signoutModalElement = document.getElementById('signout-confirm-modal');
        const signoutModalBody = signoutModalElement.querySelector('.modal-body');
        const signoutConfirmButton = signoutModalElement.querySelector('.btn-primary');
        const signoutModal = new bootstrap.Modal(signoutModalElement);

        signoutModalBody.innerHTML = `Deseja mesmo sair ${localStorage.getItem('@Real-Time-Host:username')}?`;

        signoutConfirmButton.onclick = () => {
            auth.signout();
        };

        signoutModal.show();
    };
}

if (auth.is_authenticated()) {
    load_user();
    load_user_signout();
    hostCards.load('#card-list .container');
}

