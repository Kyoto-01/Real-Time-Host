import { show_host_details } from "./host_details.js";


/*
    Funções relacionadas á exibição dos cards de hosts
*/

const addHostModal = new bootstrap.Modal(document.getElementById('add-host-modal'));

function load_hosts(hostList, parentSelector){
    const parent = document.querySelector(parentSelector);

    for (const hostID in hostList){
        const hostData = hostList[hostID];
        create_host_card(parent, hostID, hostData);
    }
}

function create_host_card(parent, hostId, hostData){
    const hostCardHTML = `
    <div class="col mt-4">
        <div id="host-${hostId}" class="card">
            <div class="card-header">
                <img src="images/pc.svg" alt="PC" class="card-img-top card-icon"> 
                <span class="float-end">
                    <i class="fa-solid fa-circle ${hostData.general.online ? 'fa-circle-on' : 'fa-circle-off' }"></i> ${hostData.general.online ? 'online' : 'offline'}
                </span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${hostData.general.hostname}</h5>
                <ul class="list-group" style="list-style: none;">
                    <li>${hostData.general.ip}</li>
                    <li>${hostData.general.os}</li>
                </ul>               
            </div>
            <div class="card-footer d-flex flex-row justify-content-end">
                <div class="ms-2">
                    <button class="btn btn-primary" name="host_details">
                        Detalhes
                    </button>
                </div>
                <div class="ms-2">
                    <button class="btn btn-outline-danger" name="del_confirm" data-bs-toggle="modal" data-bs-target="#del-host-confirm-modal">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
    
    parent.insertAdjacentHTML('beforeend', hostCardHTML);

    document.querySelector(`#host-${hostId} .btn-primary`).onclick = function(){
        show_host_details(hostData);
    };
}

function add_host(){
    const form = document.getElementById('add-host-form');

    form.onsubmit = (event) => {

        event.preventDefault();

        const id = new Date().getTime();
        const hostname = form.querySelector('#add-host-name');
        const ip = form.querySelector('#add-host-ip');
        const os = form.querySelector('#add-host-so');
        const parent = document.querySelector('#card-list .container .row');

        create_host_card(parent, id, {
            general: {
                hostname: hostname.value,
                ip: ip.value,
                os: os.value,
                online: true,
            },
        });

        hostname.value = '';
        ip.value = '';
        os.value = '';

        addHostModal.hide();
    }   
}

function del_host(){
    
}

export { load_hosts, add_host };
