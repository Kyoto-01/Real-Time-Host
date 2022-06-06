import format from '../data_format.js';
import hostCharts from './host_charts.js';
import hosts from './hosts.js';


const detailsModalElement = document.getElementById('details-host-modal');
const detailsModalObject = new bootstrap.Modal(detailsModalElement);
let detailsModalInterval;

const waitModalElement = document.getElementById('wait-modal');
const waitModalObject = new bootstrap.Modal(waitModalElement);


detailsModalElement.addEventListener('hidden.bs.modal', () => {
    clearInterval(detailsModalInterval);
});

async function refresh_host_details(hostData) {
    // para construir e mostrar modal com informações sobre um host
    const modalTitle = detailsModalElement.querySelector('.modal-title');
    const modalBody = detailsModalElement.querySelector('.modal-body');

    waitModalObject.show();

    await show_host_details(hostData, modalTitle, modalBody);
    // aguarda algum tempo pra o caso da busca por detalhes ser rápida demais, isso para que o modal.hide() funcione corretamente.
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    waitModalObject.hide();

    detailsModalInterval = setInterval(async () => {
        await show_host_details(hostData, modalTitle, modalBody);
    }, 5000);

    detailsModalObject.show();
}

async function show_host_details(hostData, modalTitle, modalBody) {
    const hostAll = await hosts.get_host_all(hostData);

    let detailsHTML = `
    <div id="details-host-list">
        ${get_host_details(hostAll)}
    </div>`;

    modalTitle.innerHTML = `Detalhes de Monitoramento ( ${hostAll.general.hostname} - ${hostAll.general.ip} )`;
    modalBody.innerHTML = detailsHTML;
    hostCharts.plot_charts();
}

function get_host_details(hostData) {

    // para construir estrutura HTML para as informações do host
    let hostDataHTML = '';

    for (let categoryName in hostData) {

        // categoryName --> general, memory, cpu, ...
        if (categoryName != 'id') {
            hostDataHTML += `
            <div id="${categoryName}-detail" class="detail-item">
                ${format_category_properties(categoryName, hostData)}
            </div>`;
        }
    }

    return hostDataHTML;
}

function format_category_properties(categoryName, hostData) {
    const properties = hostData[categoryName];
    const formatFunctions = {
        general: format_general_properties,
        memory: format_memory_properties,
        cpu: format_cpu_properties,
        nic: format_nics_properties,
        devices: format_devices_properties,
    }

    return formatFunctions[categoryName](properties);
}

function generate_property_table(title, rows) {
    const table = `
    <table class="table table-bordered table-primary">
        <thead>
            <tr>
                <th class="text-center th-details" scope="col" colspan="999">${title}</th>
            </tr>
        </thead>
        <tbody>
            ${generate_property_table_rows(rows)}
        </tbody>
    </table>`;

    return table;
}

function generate_property_table_rows(rows) {
    let rowList = '';

    for (let row of rows) {
        if (Array.isArray(row)) {
            rowList += `
            <th scope="row" rowspan="${row[0].value}">${row[0].key}</th>
            ${generate_property_table_rows(row.slice(1))}
            <tr>
                <td colspan="999" style="background-color: transparent;"></td>
            </tr>`;
        }
        else {
            rowList += `
            <tr>
                <th scope="row">${row.key}</th>
                <td>${row.value}</td>
            </tr>`;
        }
    }

    return rowList;
}

function format_general_properties(properties) {
    const title = 'Geral';
    const rows = [
        {
            key: "Hostname",
            value: properties.hostname,
        },
        {
            key: "IP",
            value: properties.ip,
        },
        {
            key: "Sistema Operacional",
            value: properties.os,
        },
        {
            key: "Online",
            value: format.format_bool(properties.online),
        }
    ]

    return generate_property_table(title, rows);
}

function format_memory_properties(properties) {
    const title = 'Memória';
    const rows = [
        {
            key: "Espaço Total",
            value: format.format_bytes(properties.total),
        },
        {
            key: "Espaço Utilizado",
            value: format.format_bytes(properties.used),
        },
        {
            key: "Espaço Disponível",
            value: format.format_bytes(properties.available),
        },
        {
            key: "Gráfico de Utilização",
            value: `
            <div id="memory-chart-container" class="m-auto" style="width:250px;height:250px;">
                <canvas id="memory-chart" style="width:inherit;height:inherit;"></canvas>
            </div>`,
        }
    ]

    hostCharts.record_memory_usage_chart("memory-chart", properties);

    return generate_property_table(title, rows);
}

function format_cpu_properties(properties) {
    const title = 'CPU';
    const rows = [
        {
            key: "Modelo",
            value: properties.model,
        },
        {
            key: "Arquitetura",
            value: properties.architecture,
        },
        {
            key: "Cores",
            value: properties.cores,
        },
        {
            key: "Threads por Core",
            value: properties.threads_core,
        },
        {
            key: "Sockets",
            value: properties.sockets,
        },
        {
            key: "Utilização",
            value: format.format_percent(properties.used),
        },
        {
            key: "Temperatura",
            value: `${properties.temperature}\u00B0`,
        },
        {
            key: "Clock",
            value: `${properties.clock} MHz`,
        },
        {
            key: "Clock Máximo",
            value: `${properties.clock_max} MHz`,
        },
        {
            key: "Clock Mínimo",
            value: `${properties.clock_min} MHz`,
        },
        {
            key: "Gráfico de Utilização (%)",
            value: `
            <div id="cpu-chart-container" class="m-auto" style="width:300px;height:200px;">
                <canvas id="cpu-chart" style="width:inherit;height:inherit;"></canvas>
            </div>`,
        }
    ]

    hostCharts.record_cpu_usage_chart('cpu-chart', properties);

    return generate_property_table(title, rows);
}

function format_nics_properties(nicList) {
    const title = 'Rede';
    const rows = [];

    for (let nic in nicList) {
        const properties = nicList[nic];
        const subRows = [
            {
                key: properties.name, // nome da subrow
                value: Object.keys(properties).length + 1 // quantidade de rows que ocupa
            },
            {
                key: "IP",
                value: properties.ip,
            },
            {
                key: "Máscara",
                value: properties.mask,
            },
            {
                key: "MAC",
                value: properties.mac,
            },
            {
                key: "Pacotes Transmitidos",
                value: properties.tx_pckts,
            },
            {
                key: "Pacotes Recebidos",
                value: properties.rx_pckts,
            }
        ];
        rows.push(subRows);
    }

    return generate_property_table(title, rows);
}

function format_devices_properties(deviceList) {
    const title = 'Armazenamento';
    const rows = [];

    for (let dev in deviceList) {
        const properties = deviceList[dev];
        const subRows = [
            {
                key: properties.name, // nome da subrow
                value: Object.keys(properties).length + 2, // quantidade de rows que ocupa
            },
            {
                key: "Espaço Total",
                value: format.format_bytes(properties.total),
            },
            {
                key: "Espaço Utilizado",
                value: format.format_bytes(properties.used),
            },
            {
                key: "Espaço Disponível",
                value: format.format_bytes(properties.available),
            },
            {
                key: "Ponto de Montagem",
                value: properties.mount_point,
            },
            {
                key: "Gráfico de Utilização",
                value: `
                <div id="dev-${dev}-chart-container" class="m-auto" style="width:250px;height:250px;">
                    <canvas id="dev-${dev}-chart" style="width:inherit;height:inherit;"></canvas>
                </div>`,
            }
        ];

        rows.push(subRows);
        hostCharts.record_device_usage_chart(`dev-${dev}-chart`, properties);
    }

    return generate_property_table(title, rows);
}

export default { refresh_host_details }
