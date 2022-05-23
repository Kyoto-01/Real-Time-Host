import fs from 'fs';


// caminho absoluto para o DB
let DBPATH = '';
// DB com diferentes "tabelas"
let DBDATA = {};


function load_db(path){
    DBPATH = path;
    DBDATA = JSON.parse(fs.readFileSync(path));

    return DBDATA;
}

function read(refresh = false){
    if (refresh) {
        return load_db(DBPATH);
    }

    return DBDATA;
}

function create(tableName, data) {
    if (!(tableName in DBDATA)){
        DBDATA[tableName] = [];
    }
    DBDATA[tableName].unshift(data);

    refresh_db();

    return data;
}

function update(tableName, id, newData) {
    const index = DBDATA[tableName].findIndex(value => value.id === id);

    DBDATA[tableName][index] = newData;

    refresh_db();

    return newData;
}

function remove(tableName, id){
    const index = DBDATA[tableName].findIndex(value => value.id === id);
    const removed = DBDATA[tableName][index];

    DBDATA[tableName].splice(index, 1);

    refresh_db();

    return removed;
}

function refresh_db() {
    fs.writeFileSync(DBPATH, JSON.stringify(DBDATA));
}


export default { load_db, read, create, update, remove, refresh_db };
