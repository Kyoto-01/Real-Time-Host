import { hosts } from "../data/hosts.js";

function load_hosts(){
    const location = document.querySelector("#card-list .container .row");

    for (const host in hosts){
        create_host_card(location, host);
    }
}

function create_host_card(location, host_id){
    const host = hosts[host_id];
    const card = `
    <div class="col mt-4">
        <div id="host-${host_id}" class="card" onclick="show_details(${host_id});">
            <div class="card-header">
                <img src="images/pc.svg" alt="PC" class="card-img-top card-icon"> 
                <span class="float-end">
                    <i class="fa-solid fa-circle ${host.general.online ? 'fa-circle-on' : 'fa-circle-off' }"></i> ${host.general.online ? 'online' : 'offline'}
                </span>
            </div>
            <div class="card-body">
                <h5 class="card-title">${host.general.hostname}</h5>
                <ul class="list-group" style="list-style: none;">
                    <li>${host.general.ip}</li>
                    <li>${host.general.os}</li>
                </ul>
            </div>
        </div>
    </div>`;
    
    location.insertAdjacentHTML('beforeend', card);
}

function show_details(host_id){
    const selected_host = hosts[host_id];
    const modal = document.querySelector("#details-modal");
    const location = modal.querySelector('.modal-body');
    let details = '';

    for (let property in selected_host) {
        details += `
        <div id="${property}-detail" class="detail-item">
            <p>${property}</p>
            <table><tbody>`;

        for (let subproperty in selected_host[property]){
            if (typeof selected_host[property][subproperty] == 'object'){
                details += `<tr><th scope="row" rowspan="${Object.keys(selected_host[property][subproperty]).length + 1}">${subproperty}</th></tr>`;
                for (let subsubproperty in selected_host[property][subproperty]){
                    details += `<tr><td>${subsubproperty}</td><td>${selected_host[property][subproperty][subsubproperty]}</td></tr>`;
                }
            }
            else{
                details += `
                <tr>
                    <th scope="row">${subproperty}</th>
                    <td>${selected_host[property][subproperty]}</td>
                </tr>`;
            }
        }

        details += `</tbody></table></div><hr>`;
    }

    location.insertAdjacentHTML('beforeend', details); 
    let bootstrap_modal = new bootstrap.Modal(modal);

    bootstrap_modal.show();
}

window.show_details = show_details;

export {load_hosts}
