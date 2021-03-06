import hosts from './hosts.js'
import hostDetails from "./host_details.js";


/*
    Funções e eventos relacionados á exibição, adição e exclsão de cards de hosts
*/

let HOST_LIST_PARENT = '';
let HOST_FILTER_STRING = '';
let LOADED_HOSTS = [];


function load(hostListParent){
    HOST_LIST_PARENT = hostListParent;

    add_host_event();
    search_host_event();

    load_hosts();

    start_update();
}

function start_update() {
    return setInterval(() => load_hosts(false), 1000);
}

function search_host_event(){
    document.getElementById("search-form").onkeydown = (event) => event.key != 'Enter';
    
    document.getElementById("search-btn").onclick = async function() {
        this.blur();
        
        HOST_FILTER_STRING = document.getElementById("search-host").value;
        LOADED_HOSTS = await hosts.filter_hosts(HOST_FILTER_STRING, LOADED_HOSTS);
        create_host_card_group(LOADED_HOSTS, HOST_LIST_PARENT);
    };
}

function add_host_event() {
    const addHostModal = new bootstrap.Modal(document.getElementById('add-host-modal'));
    const form = document.getElementById('add-host-form');

    document.getElementById('add-host-btn').onclick = () => addHostModal.show();

    form.onsubmit = async (event) => {

        event.preventDefault();

        await hosts.add_host(form);

        form.reset();
        addHostModal.hide();

        load_hosts();
    };
}

async function del_host_event(hostData) {
    const delHostModalElement = document.getElementById('del-host-confirm-modal');
    const delHostModalBody = delHostModalElement.querySelector('.modal-body');
    const delHostConfirmButton = delHostModalElement.querySelector('.btn-danger');
    const delHostModal = new bootstrap.Modal(delHostModalElement);

    delHostModalBody.innerHTML = `Deseja remover o host ${hostData.general.hostname} (${hostData.general.ip})?`;

    delHostConfirmButton.onclick = async () => {
        await hosts.del_host(hostData);
        load_hosts();
    };

    delHostModal.show();
}

async function load_hosts() {
    LOADED_HOSTS = await hosts.get_hosts();
    LOADED_HOSTS = await hosts.filter_hosts(HOST_FILTER_STRING, LOADED_HOSTS);
    create_host_card_group(LOADED_HOSTS, HOST_LIST_PARENT);
}

function create_host_card_group(hostList, parentSelector) {
    const hostGroupHTML = '<div id="host-group" class="row row-cols-1 row-cols-md-2 row-cols-xl-4"></div>';

    let parent = document.querySelector(parentSelector);
    parent.innerHTML = hostGroupHTML;

    parent = parent.querySelector('#host-group');
    for (let host of hostList) {
        create_host_card(parent, host);
    }
}

function create_host_card(parent, hostData) {
    const hostCardID = `host-${hostData.general.id}`;
    const hostCardHTML = `
    <div class="col mt-4">
        <div id="${hostCardID}" class="card">
            <div class="card-header">
                <img src="imgs/pc.svg" alt="PC" class="card-img-top card-icon"> 
                <span class="float-end">
                    <i class="fa-solid fa-circle ${hostData.general.online ? 'fa-circle-on' : 'fa-circle-off'}"></i> ${hostData.general.online ? 'online' : 'offline'}
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
                        <i class="fa-solid fa-circle-info"></i>
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

    document.querySelector(`#${hostCardID} .btn-primary`).onclick = async () => hostDetails.refresh_host_details(hostData);
    document.querySelector(`#${hostCardID} .btn-outline-danger`).onclick = () => del_host_event(hostData);
}


export default { load };
