
/*
    Funções para manipulação da base de dados
*/

const host = '';


async function create(resource, data){
    const url = `${host}${resource}`;

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
    const url = `${host}${resource}`;
    
    const response = await fetch(url);
    
    return await response.json();
}

async function destroy(resource){
    const url = `${host}${resource}`;

    const HTTPRequestConfig = {
        method: 'delete',
    };

    const response = await fetch(url, HTTPRequestConfig);

    return await response.json();
}

export default { create, read, destroy }
