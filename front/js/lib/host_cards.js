import api from "../services/api.js";
import { show_host_details } from "./host_details.js";


/*
    Funções e eventos relacionados á exibição, adição e exclsão de cards de hosts
*/

const hostsResource = '/hosts';

add_host();

async function load_hosts(parentSelector){
    const hostList = await api.read(hostsResource);
    create_host_card_group(hostList, parentSelector);
}

function create_host_card_group(hostList, parentSelector){
    const hostGroupHTML = '<div id="host-group" class="row row-cols-1 row-cols-md-2 row-cols-xl-3"></div>';

    let parent = document.querySelector(parentSelector);
    parent.innerHTML = hostGroupHTML;

    parent = parent.querySelector('#host-group');
    for (let host of hostList){
        create_host_card(parent, host);
    }
}

function create_host_card(parent, hostData){
    const hostCardID = `host-${hostData.id}`;
    const hostCardHTML = `
    <div class="col mt-4">
        <div id="${hostCardID}" class="card">
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

    document.querySelector(`#${hostCardID} .btn-primary`).onclick = () => show_host_details(hostData);
    document.querySelector(`#${hostCardID} .btn-outline-danger`).onclick = () => del_host(hostData);
}

function add_host(){
    const addHostModal = new bootstrap.Modal(document.getElementById('add-host-modal'));
    const form = document.getElementById('add-host-form');

    document.getElementById('add-host-btn').onclick = () => addHostModal.show();

    form.onsubmit = (event) => {

        event.preventDefault();

        const id = new Date().getTime();
        const hostname = form.querySelector('#add-host-name').value;
        const ip = form.querySelector('#add-host-ip').value;
        const os = form.querySelector('#add-host-so').value;

        const newHost = {
            id: id,
            general: {
                hostname: hostname,
                ip: ip,
                os: os,
                online: true,
            },
        };

        api.create(hostsResource, newHost);

        form.reset();
        addHostModal.hide();
    };
}

function del_host(hostData){
    const delHostModalElement = document.getElementById('del-host-confirm-modal');
    const delHostModalBody = delHostModalElement.querySelector('.modal-body');
    const delHostConfirmButton = delHostModalElement.querySelector('.btn-danger');
    const delHostModal = new bootstrap.Modal(delHostModalElement);   

    delHostModalBody.innerHTML = `Deseja remover o host ${hostData.general.hostname} (${hostData.general.ip})?`;

    delHostConfirmButton.onclick = function() {
        api.destroy(`${hostsResource}/${hostData.id}`);
    };

    delHostModal.show();
}

export { load_hosts };
 