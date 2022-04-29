
/* Funções de formatação de dados p/ exibição p/ o usuário */

function format_property_name(propertyName, propertyCase) {

    /* 
        As chaves abaixo são equivalentes a algumas chaves do JSON que é buscado por esta aplicação 
    */

    const keys = {
        "general": "geral",
        "os": "sistema operacional",
        "online_bool_": "online",
        "memory": "memória",
        "used_byte_": "utilizado",
        "used_percent_": "utilizado",
        "available_byte_": "disponível",
        "total_byte_": "total",
        "model": "modelo",
        "architecture": "arquitetura",
        "threads_core": "threads por core",
        "temperature_deg_": "temperatura",
        "clock_mhz_": "clock",
        "clock_max_mhz_": "clock máximo",
        "clock_min_mhz_": "clock mínimo",
        "nic": "rede",
        "mask": "máscara",
        "tx_pckts": "pacotes TX",
        "rx_pckts": "pacotes RX",
        "devices": "armazenamento",
        "mount_point": "ponto de montagem"
    }

    const hr_property = propertyName in keys ? keys[propertyName] : propertyName;
    
    return set_str_case(hr_property, propertyCase);
}

function format_property_value(propertyName, propertyValue) {
    const propertyType = get_propety_type(propertyName);

    switch (propertyType) {
        case undefined:
            return propertyValue;
        case '_byte_':
            return format_bytes(propertyValue);
        case '_percent_':
            return `${propertyValue}%`;
        case '_deg_':
            return `${propertyValue}\u00B0`;
        case '_mhz_':
            return `${propertyValue} MHz`;
        case '_bool_':
            return format_bool(propertyValue);
    }
}

function get_propety_type(propertyName) {
    const types = ['_byte_', '_percent_', '_deg_', '_mhz_', '_bool_'];
    const type = types.filter((value) => propertyName.endsWith(value));

    return type[0];
}

function set_str_case(str, caseName) {
    return caseName === 'upper' ? str.toUpperCase() :
    caseName === 'first upper' ? `${str[0].toUpperCase()}${str.slice(1)}` :
    str;
}

function format_bytes(sizeBytes) {
    const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
    let finalSize = sizeBytes;
    let finalUnit = 0;

    while (finalSize >= 1024) {
        finalSize /= 1024;
        finalUnit++;
    }

    finalSize = Math.round(finalSize * 10) / 10;

    return `${finalSize} ${units[finalUnit]}`;
}

function format_bool(value){
    return value ? 'Sim' : 'Não';
}

export default { format_property_name, format_property_value }
