import { hosts } from "../data/hosts.js";

function load_hosts(hostList){
    const location = document.querySelector("#card-list .container .row");

    for (const host of hostList){
        create_host_card(location, host);
    }
}

function create_host_card(location, host){
    const card = `
    <div class="col mt-4">
        <div id="host-${host.general.id}" class="card" onclick="show_details(${host.general.id});">
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

function show_details(host){
    const selected_host = hosts[host];
    const modal = document.querySelector("#details-modal");
    const location = modal.querySelector('.modal-body');
    const details = `
    <div class="detail-item">
        <p>Memória</p>
        <table>
            <tbody>
                <tr>
                    <th scope="row">Espaço Total</th>
                    <td>${selected_host.memory.total}</td>
                </tr>  
                <tr>
                    <th scope="row">Espaço utilizado</th>
                    <td>${selected_host.memory.used}</td>
                </tr>  
                <tr>
                    <th scope="row">Espaço Disponível</th>
                    <td>${selected_host.memory.available}</td>
                </tr> 
            </tbody>
        </table>
    </div>
    <hr>
    <div class="detail-item">
        <p>CPU</p>
    </div>`;

    location.insertAdjacentHTML('beforeend', details); 
    let bootstrap_modal = new bootstrap.Modal(modal);

    bootstrap_modal.show();
}

window.show_details = show_details;

export {load_hosts}
