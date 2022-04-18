import { show_host_details } from "./host_details.js";


/*
    Funções relacionadas á exibição dos cards de hosts
*/

const addHostModal = new bootstrap.Modal(document.getElementById('add-host-modal'));
const delHostModal = new bootstrap.Modal(document.getElementById('del-host-confirm-modal'));

let host_list;
let host_cards_parent_selector;


document.getElementById('add-host-btn').onclick = () => {
    addHostModal.show();
}


function load_hosts(hostList, parentSelector){
    host_list = hostList;
    host_cards_parent_selector = parentSelector;
    
    const hostGroupHTML = '<div id="host-group" class="row row-cols-1 row-cols-md-2 row-cols-xl-3"></div>';
    let parent = document.querySelector(parentSelector);
    parent.innerHTML = hostGroupHTML;

    parent = parent.querySelector('#host-group');

    for (const hostID in hostList){
        create_host_card(parent, hostID, hostList);
    }
}

function create_host_card(parent, hostID, hostList){
    const hostData = hostList[hostID];
    const hostCardHTML = `
    <div class="col mt-4">
        <div id="host-${hostID}" class="card">
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
                    <button class="btn btn-outline-danger" name="del_confirm">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
    
    parent.insertAdjacentHTML('beforeend', hostCardHTML);

    document.querySelector(`#host-${hostID} .btn-primary`).onclick = function(){
        show_host_details(hostData);
    };

    document.querySelector(`#host-${hostID} .btn-outline-danger`).onclick = function() {
        del_host(parent, hostID, hostList);
    }
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

        host_list[id] = {
            general: {
                hostname: hostname.value,
                ip: ip.value,
                os: os.value,
                online: true,
            },
        };

        create_host_card(parent, id, host_list);

        hostname.value = '';
        ip.value = '';
        os.value = '';

        addHostModal.hide();
    };
}

function del_host(parent, hostID, hostList){
    delHostModal.show();   

    const delHostModalElement = document.getElementById('del-host-confirm-modal');
    const delHostModalBody = delHostModalElement.querySelector('.modal-body');
    const delHostConfirmButton = delHostModalElement.querySelector('.btn-danger');
    const hostData = hostList[hostID];

    delHostModalBody.innerHTML = `Deseja remover o host ${hostData.general.hostname} (${hostData.general.ip})?`;

    delHostConfirmButton.onclick = function() {
        delete hostList[hostID];
        parent.remove();
        load_hosts(hostList, host_cards_parent_selector);
    };
}

export { load_hosts, add_host };
 