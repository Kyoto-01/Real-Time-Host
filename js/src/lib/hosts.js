
/*
    Funções relacionadas á exibição de informações de hosts
*/

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
                <div id="btn-host-details" class="ms-2">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#host-details-modal" name="host_details">
                        Detalhes
                    </button>
                </div>
                <div id="btn-del-host" class="ms-2">
                    <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#modal-delconfirm" name="del_confirm">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
    
    parent.insertAdjacentHTML('beforeend', hostCardHTML);

    document.querySelector(`#host-${hostId} #btn-host-details`).onclick = function(){
        show_host_details(hostData);
    };
}

function show_host_details(hostData){
    const modal = create_host_details_modal(
        'body #modal-set',
        'host-details-modal',
        `Detalhes de Monitoramento ( ${hostData.general.hostname} - ${hostData.general.ip} )`);
    const parent = modal.querySelector('.modal-body');
    let detailsHTML = get_host_details(hostData);

    parent.insertAdjacentHTML('beforeend', detailsHTML); 

    const bootstrap_modal = new bootstrap.Modal(modal);
    bootstrap_modal.show();
}

function create_host_details_modal(parentSelector, modalID, modalTitle){
    const parent = document.querySelector(parentSelector);
    const modalHTML = `
    <div class="modal fade" id="${modalID}" tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${modalTitle}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
          </div>
        </div>
      </div>
    </div>`;

    parent.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById(modalID);

    modal.addEventListener('hidden.bs.modal', function(){
       modal.remove();
    });

    return modal;
}

function get_host_details(hostData){
    let hostDataHTML = '';

    for (let dataCategory in hostData) {
        const categoryObject = hostData[dataCategory];
        hostDataHTML += `
        <div id="${dataCategory}-detail" class="detail-item">
            <table class="table table-bordered table-primary">
                <thead>
                    <tr>
                        <th style="background-color: rgb(42, 100, 187); color: white;" class="text-center" scope="col" colspan="999">
                            ${dataCategory}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${get_host_properties(categoryObject)}
                </tbody>
            </table>
        </div>`;
    }

    return hostDataHTML;
}

function get_host_properties(propertyList){
    let propertyListHTML = '';

    for (let propertyName in propertyList){
        const propertyValue = propertyList[propertyName];

        if (typeof propertyValue == 'object'){
            propertyListHTML += `
            <tr>
                <th scope="row" rowspan=${Object.keys(propertyValue).length + 1}>${propertyName}</th>
            </tr>
            ${get_host_properties(propertyValue)}
            <tr>
                <td colspan="999" style="background-color: transparent;"></td>
            </tr>`;
        }
        else{
            propertyListHTML += `
            <tr>
                <th scope="row">${propertyName}</th>
                <td>${propertyValue}</td>
            </tr>`;
        }
    }

    return propertyListHTML;
}

export { load_hosts };
