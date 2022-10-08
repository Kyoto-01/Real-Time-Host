function show_toast(message) {
	document.querySelector(".toast-header strong").innerText = message;
	const toast = new bootstrap.Toast(document.querySelector("#liveToast"));
	toast.show();
}

function show_errors(errors) {
	for (let err of errors) {
		switch (err) {
			case "login-user":
				show_toast("Erro no login: Usuário inválido");
				break;
			case "login-password":
				show_toast("Erro no login: Senha inválida");
				break;
			case "login-generic":
				show_toast("Erro no login");
			default:
				show_toast("Ocorreu um erro");
				break;
		}
	}
}

export default { show_toast, show_errors };