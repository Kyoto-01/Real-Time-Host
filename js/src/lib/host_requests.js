
/*
    Funções para manipulação da base de dados
*/

const HOSTS_URL = 'http://127.0.0.1:3000/hosts';

async function get_hosts(){
    const response = await fetch(HOSTS_URL);
    const hostList = await response.json();

    return hostList;
}

async function create_host(newHost){
    const HTTPRequestConfig = {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newHost),
    };

    const response = await fetch(HOSTS_URL, HTTPRequestConfig);
    return response;
}

async function delete_host(hostID){
    const hostURL = `${HOSTS_URL}/${hostID}`;
    const HTTPRequestConfig = {
        method: 'delete',
    };

    const response = await fetch(hostURL, HTTPRequestConfig);
    return response;
}

export { get_hosts, create_host, delete_host };