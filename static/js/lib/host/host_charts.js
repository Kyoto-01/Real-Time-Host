import format from '../data_format.js';


let chartList = [];


/* Funções para criação de gráficos de informações de hosts */


function plot_charts() {

    /* 
        Usa-se apenas depois que a estrutura (HTML) nescessária para a plotagem já está criada
    */

    for (let chart of chartList) {
        const canvas = document.getElementById(chart.canvas).getContext('2d');
        new Chart(canvas, chart.config);
    }

    chartList = [];
}

function create_space_usage_chart(data, dataset_label) {
    const chart = {
        type: 'pie',
        data: {
            labels: ['Espaço utilizado (bytes)', 'Espaço disponível (bytes)'],
            datasets: [{
                label: dataset_label,
                data: [data.used, data.available],
                backgroundColor: [
                    'rgba(0, 0, 255, 0.75)',
                    'rgba(255, 0, 255, 0.5)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                datalabels: {
                    display: true,
                    formatter: function (value, context) {
                        return format.format_bytes(value);
                    },
                    color: 'rgba(0, 0, 0, 1.0)',
                    backgroundColor: null,
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                },
            },
        },
    };

    return chart;
}

function record_device_usage_chart(canvasID, properties) {
    const chart_data = {
        canvas: canvasID,
        config: create_space_usage_chart(properties, 'Utilização de Disco')
    };
    chartList.push(chart_data);
}

function record_memory_usage_chart(canvasID, properties) {
    const chart_data = {
        canvas: canvasID,
        config: create_space_usage_chart(properties, 'Utilização da Memória'),
    };
    chartList.push(chart_data);
}

function record_cpu_usage_chart(canvasID, properties) {
    const chart_data = {
        canvas: canvasID,
        config: {
            type: 'gauge',
            data: {
                datasets: [{
                    value: properties.used,
                    minValue: 0,
                    data: [25, 50, 75, 100],
                    backgroundColor: [
                        'rgba(0,255,0,0.75)',
                        'rgba(255,255,0,0.75)',
                        'rgba(255,150,0,0.75)',
                        'rgba(255,0,0,0.75)'
                    ],
                }]
            },
            options: {
                needle: {
                    radiusPercentage: 2,
                    widthPercentage: 3.2,
                    lengthPercentage: 80,
                    color: 'rgba(42, 100, 187, 1)'
                },
                valueLabel: {
                    display: true,
                    formatter: (value) => {
                        return value + '%';
                    },
                    color: 'rgba(255, 255, 255, 1)',
                    backgroundColor: 'rgba(42, 100, 187, 1)',
                    borderRadius: 5,
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                },
                plugins: {
                    datalabels: {
                        display: true,
                        formatter: function (value, context) {
                            return value + '%';
                        },
                        color: 'rgba(0, 0, 0, 1.0)',
                        backgroundColor: null,
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                    },
                },
            }
        }
    };
    chartList.push(chart_data);
}

export default {
    plot_charts,
    record_memory_usage_chart,
    record_device_usage_chart,
    record_cpu_usage_chart
}
