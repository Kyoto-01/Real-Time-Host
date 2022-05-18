
/*
    Funções para manipulação da base de dados
*/

const host = 'http://127.0.0.1';
const port = 3000;


async function create(resource, data){
    const url = `${host}:${port}${resource}`;

    const HTTPRequestConfig = {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, HTTPRequestConfig);
    
    return await response.json();
}

async function read(resource){
    const url = `${host}:${port}${resource}`;
    
    const response = await fetch(url);
    
    return await response.json();
}

async function destroy(resource){
    const url = `${host}:${port}${resource}`;

    const HTTPRequestConfig = {
        method: 'delete',
    };

    const response = await fetch(url, HTTPRequestConfig);

    return await response.json();
}

export default { create, read, destroy }
