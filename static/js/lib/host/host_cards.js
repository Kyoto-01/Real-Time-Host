import hosts from './hosts.js'
import hostDetails from "./host_details.js";


/*
    Funções e eventos relacionados á exibição, adição e exclsão de cards de hosts
*/


document.getElementById("search-btn").onclick = async function() {
    const hostsearch = await hosts.filter_hosts(document.getElementById("search-host").value);
    create_host_card_group(hostsearch, '#card-list .container');};

async function load_hosts(parentSelector) {
    const hostList = await hosts.get_hosts();

    hosts.host_events();
    create_host_card_group(hostList, parentSelector);
}

function create_host_card_group(hostList, parentSelector) {
    const hostGroupHTML = '<div id="host-group" class="row row-cols-1 row-cols-md-2 row-cols-xl-3"></div>';

    let parent = document.querySelector(parentSelector);
    parent.innerHTML = hostGroupHTML;

    parent = parent.querySelector('#host-group');
    for (let host of hostList.hosts) {
        create_host_card(parent, host);
    }
}

function create_host_card(parent, hostData) {
    const hostCardID = `host-${hostData.id}`;
    const hostCardHTML = `
    <div class="col mt-4">
        <div id="${hostCardID}" class="card">
            <div class="card-header">
                <img src="images/pc.svg" alt="PC" class="card-img-top card-icon"> 
                <span class="float-end">
                    <i class="fa-solid fa-circle ${hostData.online ? 'fa-circle-on' : 'fa-circle-off'}"></i> ${hostData.online ? 'online' : 'offline'}
                </span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${hostData.hostname}</h5>
                <ul class="list-group" style="list-style: none;">
                    <li>${hostData.ip}</li>
                    <li>${hostData.os}</li>
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

    document.querySelector(`#${hostCardID} .btn-primary`).onclick = () => hostDetails.show_host_details(hostData);
    document.querySelector(`#${hostCardID} .btn-outline-danger`).onclick = () => hosts.del_host(hostData);
}



export default { load_hosts };
