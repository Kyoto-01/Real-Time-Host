
/* Funções de formatação de dados p/ exibição p/ o usuário */

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

export default { format_bytes, format_bool }
