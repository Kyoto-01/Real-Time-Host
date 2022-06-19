import Auth from './services/auth.js';
import api from './services/api.js';


const signinForm = document.getElementById('signin-form');


function show_toast(message) {
	document.querySelector(".toast-header strong").innerText = message;
	const toast = new bootstrap.Toast(document.querySelector("#liveToast"));
	toast.show();
}

function load_signin_submit() {
	signinForm.onsubmit = async (event) => {
		event.preventDefault();

		const email = signinForm.querySelector('#email').value;
		const password = signinForm.querySelector('#password').value;
		const user = { email, password };

		const { auth, token } = await api.create('/signin', user);

		if (auth) {
			Auth.signin(token);
		} else {
			if (token === 'user') {
				show_toast('Erro no login: Usuário inválido');
			} else {
				show_toast('Erro no login: Senha inválida');
			}
		}
	}
}

load_signin_submit();
