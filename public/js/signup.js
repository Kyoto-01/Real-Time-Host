import api from './services/api.js';


const signupForm = document.getElementById('signup-form');


function load_signup_submit() {
    signupForm.onsubmit = async (event) => {
        event.preventDefault();

        const name = signupForm.querySelector('#name').value;
        const email = signupForm.querySelector('#email').value;
        const password = signupForm.querySelector('#password').value;

        const user = { name, email, password };

        await api.create('/users', user);

        window.location.href = '/signin.html';
    }
}

load_signup_submit();