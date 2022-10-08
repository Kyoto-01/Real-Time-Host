import api from './services/api.js';
import error from './services/info.js';

const signupForm = document.getElementById('signup-form');

function submit_signup() {
    signupForm.onsubmit = async (event) => {
        event.preventDefault();

        const name = signupForm.querySelector('#name').value;
        const email = signupForm.querySelector('#email').value;
        const password = signupForm.querySelector('#password').value;

        const user = { name, email, password };

        let response;
        
        try {
            response = await api.create('/users', user);
        } catch {
            response = {errors: ["login-generic"]};
        }

        if ("errors" in response) {
            error.show_errors(response.errors);
        } else {
            window.location.href = '/signin.html';
        }
    }
}

submit_signup();