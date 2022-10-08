/*
    Functions to access data in the server
*/

/* generic request function */
async function send_request(resource, config, authorization) {
    const url = `${resource}`;

    if (authorization) {
        config.headers = { ...config.headers, 'Authorization': authorization };
    }

    return await fetch(url, config)
        .then(async (res) => {
            if (res.status === 401) {
                throw new Error("Unauthorized");
            } else if (res.status === 500) {
                throw new Error("Server Error");
            }
            return await res.json();
        })
        .catch(
            (error) => {
                console.log(error);
                throw error;
            }
        );
}

async function create(resource, data, authorization) {
    const config = {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return await send_request(resource, config, authorization);
}

async function read(resource, authorization) {
    const config = {
        method: 'get',
    }

    return await send_request(resource, config, authorization);
}

async function destroy(resource, authorization) {
    const config = {
        method: 'delete',
    };

    return await send_request(resource, config, authorization);
}

export default { create, read, destroy }
