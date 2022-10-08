import api from './services/api.js';
import auth from './services/auth.js';
import error from './services/info.js';

const signinForm = document.getElementById('signin-form');

function submit_signin() {
	signinForm.onsubmit = async (event) => {
		event.preventDefault();

		const email = signinForm.querySelector("#email").value;
		const password = signinForm.querySelector("#password").value;

		const user = { email, password };

		let response;

		try {
			response = await api.create("/signin", user);
		} catch {
			response = { errors: ["login-generic"] };
		}

		if ("errors" in response) {
			error.show_errors(response.errors);
		} else {
			auth.signin(response);
		}
	}
}

submit_signin();
