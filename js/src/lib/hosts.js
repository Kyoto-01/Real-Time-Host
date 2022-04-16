import { hosts } from "../data/hosts.js";

/*
    Funções relacionadas á exibição de informações de hosts
*/

function load_hosts(){
    const location = document.querySelector("#card-list .container .row");

    for (const host in hosts){
        create_host_card(location, host);
    }
}

function show_host_details(host_id){
    const host = hosts[host_id];
    const modal = document.getElementById('details-modal');
    const location = modal.querySelector('.modal-body');
    let details = get_host_details(host);

    location.insertAdjacentHTML('beforeend', details); 

    const bootstrap_modal = new bootstrap.Modal(modal);
    bootstrap_modal.show();
}

function create_host_card(location, host_id){
    const host = hosts[host_id];
    const card = `
    <div class="col mt-4">
        <div id="host-${host_id}" class="card" onclick="show_host_details(${host_id});">
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

function get_host_details(host){
    let hostDetails = '';

    for (let category in host) {
        const categoryObject = host[category];
        hostDetails += `
        <div id="${category}-detail" class="detail-item">
            <p>${category}</p>
            <table>
                <tbody>
                    ${get_host_properties(categoryObject)}
                </tbody>
            </table>
        </div>
        <hr>`;
    }

    return hostDetails;
}

function get_host_properties(propertyList){
    let propertiesDetails = '';

    for (let propertyName in propertyList){
        const propertyValue = propertyList[propertyName];

        if (typeof propertyValue == 'object'){
            propertiesDetails += `
            <tr class="text-center">
                <td>${propertyName}</td>
            </tr>`;
            propertiesDetails += get_host_properties(propertyValue);
        }
        else{
            propertiesDetails += `
            <tr>
                <th scope="row">${propertyName}</th>
                <td>${propertyValue}</td>
            </tr>`;
        }
    }

    return propertiesDetails;
}

window.show_host_details = show_host_details;

export {load_hosts}
