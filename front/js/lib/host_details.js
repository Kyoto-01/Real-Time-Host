
/*
    Funções relacionadas á exibição do modal de informações detalhadas de um host
*/

function show_host_details(hostData){
    const modal = document.getElementById('details-host-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');

    let detailsHTML = `
    <div class="details-host-list">
        ${get_host_details(hostData)}
    </div>`;

    modalTitle.innerHTML = `Detalhes de Monitoramento ( ${hostData.general.hostname} - ${hostData.general.ip} )`;
    modalBody.innerHTML = detailsHTML; 

    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

function get_host_details(hostData){
    let hostDataHTML = '';

    for (let dataCategory in hostData) {
        if (dataCategory != 'id'){
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

export default { show_host_details }
