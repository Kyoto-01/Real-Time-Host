import format from './data_format.js';

/*
    Funções relacionadas á exibição do modal de informações detalhadas de um host
*/

const detailsModal = document.getElementById('details-host-modal');
let chartList = [];


detailsModal.addEventListener('hidden.bs.modal', () => document.getElementById('details-host-list').remove());


function show_host_details(hostData) {

    // para construir e mostrar modal com informações sobre um host
    const modalTitle = detailsModal.querySelector('.modal-title');
    const modalBody = detailsModal.querySelector('.modal-body');

    let detailsHTML = `
    <div id="details-host-list">
        ${get_host_details(hostData)}
    </div>`;

    modalTitle.innerHTML = `Detalhes de Monitoramento ( ${hostData.general.hostname} - ${hostData.general.ip} )`;
    modalBody.innerHTML = detailsHTML;
    plot_charts();

    const bootstrapModal = new bootstrap.Modal(detailsModal);
    bootstrapModal.show();
}

function plot_charts() {
    for (let chart of chartList) {
        const canvas = document.getElementById(chart.canvas).getContext('2d');
        new Chart(canvas, chart.config);
    }

    chartList = [];
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
                <canvas id="memory-chart"></canvas>
            </div>`,
        }
    ]

    record_memory_usage_chart("memory-chart", properties);

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
            value: `${properties.used}%`,
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
            <div id="cpu-chart-container" class="m-auto" style="width:50%;">
                <canvas id="cpu-chart"></canvas>
            </div>`,
        }
    ]

    record_cpu_usage_chart('cpu-chart', properties);

    return generate_property_table(title, rows);
}

function format_nics_properties(nicList) {
    const title = 'Rede';
    const rows = [];

    for (let nic in nicList) {
        const properties = nicList[nic];
        const subRows = [
            {
                key: nic, // nome da subrow
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
                key: dev, // nome da subrow
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
                <div id="dev-${dev}-chart-container" class="m-auto" style="width:350px;height:350px;border:1px solid red;">
                    <canvas id="dev-${dev}-chart"></canvas>
                </div>`,
            }
        ];

        rows.push(subRows);
        record_device_usage_chart(`dev-${dev}-chart`, properties);
    }

    return generate_property_table(title, rows);
}

function record_device_usage_chart(canvasID, properties) {
    const chart_data = {
        canvas: canvasID,
        config: {
            type: 'pie',
            data: {
                labels: ['Espaço utilizado', 'Espaço disponível'],
                datasets: [{
                    label: `Utilização do Disco`,
                    data: [properties.used, properties.available],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                    ],
                    borderColor: [
                        'rgba(100, 0, 0, 1)',
                        'rgba(0, 100, 0, 1)',
                    ],
                    borderWidth: 1
                }]
            },
        }
    }
    chartList.push(chart_data);
}

function record_memory_usage_chart(canvasID, properties) {
    const chart_data = {
        canvas: canvasID,
        config: {
            type: 'pie',
            data: {
                labels: ['Espaço utilizado', 'Espaço disponível'],
                datasets: [{
                    label: `Utilização da Memória`,
                    data: [properties.used, properties.available],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                    ],
                    borderColor: [
                        'rgba(100, 0, 0, 1)',
                        'rgba(0, 100, 0, 1)',
                    ],
                    borderWidth: 1
                }]
            },
        }
    }
    chartList.push(chart_data);
}

function record_cpu_usage_chart(canvasID, properties) {
    // const labels = Array.apply(0, Array(60)).map((_, i) => 60 - i);
    // labels[0] += ' seg.';

    const chart_data = {
        canvas: canvasID,
        config: {
            type: 'gauge',
            data: {
                datasets: [{
                    value: 0.5,
                    minValue: 0,
                    data: [1, 2, 3, 4],
                    backgroundColor: ['green', 'yellow', 'orange', 'red'],
                }]
            },
            options: {
                needle: {
                    radiusPercentage: 2,
                    widthPercentage: 3.2,
                    lengthPercentage: 80,
                    color: 'rgba(0, 0, 0, 1)'
                },
                valueLabel: {
                    display: true,
                    formatter: (value) => {
                        return '$' + Math.round(value);
                    },
                    color: 'rgba(255, 255, 255, 1)',
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    borderRadius: 5,
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        }
    }
    chartList.push(chart_data);
}

export default { show_host_details }
