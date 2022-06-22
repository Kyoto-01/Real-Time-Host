const authType = 'Bearer';


function is_authenticated() {
    if (!get_token()) {
        window.location.href = "/signin.html";
    } else {
        return true;
    }
}

function get_token() {
    return localStorage.getItem("@Real-Time-Host:token");
}

function signin(signinData) {
    localStorage.setItem("@Real-Time-Host:token", signinData.token);
    localStorage.setItem("@Real-Time-Host:username", signinData.username);

    window.location.href = "/";
}

function signout() {
    fetch('/signout');

    localStorage.removeItem("@Real-Time-Host:token");

    window.location.href = "/signin.html";
}


export default { authType, is_authenticated, get_token, signin, signout };
