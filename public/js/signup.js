import api from './services/api.js';


const signupForm = document.getElementById('signup-form');


function show_toast(message) {
	document.querySelector(".toast-header strong").innerText = message;
	const toast = new bootstrap.Toast(document.querySelector("#liveToast"));
	toast.show();
}

function load_signup_submit() {
    signupForm.onsubmit = async (event) => {
        event.preventDefault();

        const name = signupForm.querySelector('#name').value;
        const email = signupForm.querySelector('#email').value;
        const password = signupForm.querySelector('#password').value;

        const user = { name, email, password };

        const response = await api.create('/users', user);

        if (response.errors) {
            show_toast('Erro no cadastro: Email já está cadastrado!');
            return;
        }

        window.location.href = '/signin.html';
    }
}

load_signup_submit();