/*
 * cirar as funções:
    - read()
    - create(data)
    - update(id, data)
    - remove(id)

=======================================================================

Enquanto não usamos um banco de dados, vamos fazer
leituras e escritas em um arquivo de texto:

    import fs from 'fs'
        biblioteca para ler e escrever no arquivo .json

    JSON.parse(fs.readFileSync(caminho_do_json))
        lê arquivo JSON e converte em objeto javascript

    fs.writeFileSync(caminho_do_json, JSON.stringify(objeto_javascript))
        converte o objeto javascript em JSON e escreve-o no arquivo JSON
 */
import path from 'path';
import fs from 'fs';


const DBPATH = path.join(path.resolve('src', 'seeders', 'data.json'));


function read_all() {
    let hosts = JSON.parse(fs.readFileSync(DBPATH)).hosts;
    
    hosts = hosts.map((item) => { 
        return { general: item }; 
    });

    return hosts;
}

function create() {

}

function update() {

}

function remove() {

}


export default {
    read_all,
    create,
    update,
    remove
};