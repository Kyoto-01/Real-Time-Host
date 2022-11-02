/*
    Funções e eventos relacionados á exibição, adição e exclusão de cards de hosts
*/

import hosts from './hosts.js'
import hostDetails from "./host_details.js";

let hostListParent = '';
let hostFilterString = '';
let loadedHosts = [];

async function load(parent) {
    hostListParent = document.querySelector(parent);

    add_host_event();
    search_host_event();
    await create_host_card_group();
    start_update();
}

function start_update() {
    return setInterval(() => update_hosts(), 1000);
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
        await create_host_card_group();
    };
}

function search_host_event() {
    document.getElementById("search-form").onkeydown = (event) => event.key != 'Enter';

    document.getElementById("search-btn").onclick = async function () {
        this.blur();

        hostFilterString = document.getElementById("search-host").value;
        await create_host_card_group();
    };
}

function del_host_event(hostData) {
    const delHostModalElement = document.getElementById('del-host-confirm-modal');
    const delHostModalBody = delHostModalElement.querySelector('.modal-body');
    const delHostConfirmButton = delHostModalElement.querySelector('.btn-danger');
    const delHostModal = new bootstrap.Modal(delHostModalElement);

    delHostModalBody.innerHTML = `Deseja remover o host ${hostData.general.hostname} (${hostData.general.ip})?`;

    delHostConfirmButton.onclick = async () => {
        await hosts.del_host(hostData);
        await load_hosts()
        await create_host_card_group();
    };

    delHostModal.show();
}

async function load_hosts() {
    loadedHosts = await hosts.get_hosts();
    loadedHosts = await hosts.filter_hosts(hostFilterString, loadedHosts);
}

async function create_host_card_group() {
    const hostGroupHTML = '<div id="host-group" class="row row-cols-1 row-cols-md-2 row-cols-xl-4"></div>';

    hostListParent.innerHTML = hostGroupHTML;

    const hostGroup = hostListParent.querySelector('#host-group');

    await load_hosts();
    loadedHosts.reverse();

    for (let host of loadedHosts) {
        create_host_card(hostGroup, host);
    }
}

function create_host_card(parent, hostData) {
    const hostCardID = `host-${hostData.id}`;
    const hostCardHTML = `
        <div class="col mt-4">
            <div id="${hostCardID}" class="card">
                <div class="card-header">
                    <img src="imgs/pc.svg" alt="PC" class="card-img-top card-icon"> 
                    <span class="float-end">
                        <i class="fa-solid fa-circle ${hostData.online ? 'fa-circle-on' : 'fa-circle-off'}"></i> ${hostData.online ? 'online' : 'offline'}
                    </span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${hostData.system.hostname}</h5>
                    <ul class="list-group" style="list-style: none;">
                        <li>${hostData.addr}</li>
                        <li>${hostData.system.os}</li>
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

async function update_hosts() {
    await load_hosts();
    update_host_card_group();
}

function update_host_card_group() {
    for (let host of loadedHosts) {
        update_host_card(host);
    }
}

function update_host_card(hostData) {
    const hostCard = document.querySelector(`#host-${hostData.id}`);
    const hostCardHeader = hostCard.querySelector(".card-header");
    const hostCardBody = hostCard.querySelector(".card-body");

    const hostCardHeaderHTML = `
        <img src="imgs/pc.svg" alt="PC" class="card-img-top card-icon"> 
        <span class="float-end">
            <i class="fa-solid fa-circle ${hostData.online ? 'fa-circle-on' : 'fa-circle-off'}"></i> ${hostData.online ? 'online' : 'offline'}
        </span>`;

    const hostCardBodyHTML = `
        <h5 class="card-title">${hostData.system.hostname}</h5>
        <ul class="list-group" style="list-style: none;">
            <li>${hostData.addr}</li>
            <li>${hostData.system.os}</li>
        </ul>`;

    hostCardHeader.innerHTML = hostCardHeaderHTML;
    hostCardBody.innerHTML = hostCardBodyHTML;
}

export default { load };
