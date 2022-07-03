import database from '../db/index.js';


async function read_all() {
    const conn = await database.connect();

    const sql = `
        SELECT
           *
        FROM
            hosts
        ORDER BY
            id DESC
    `;

    return await conn.all(sql)

}

async function read_by_id(id) {
    const conn = await database.connect();

    const sql = `
        SELECT
            *
        FROM
            hosts
        WHERE
            id = ?
    `;

    return await conn.get(sql, [id]);
}

async function create(host) {
    const conn = await database.connect();

    const sql = `
        INSERT INTO
            hosts (hostname, ip, os, online)
        VALUES
            (?, ?, ?, ?)
    `;

    const { hostname, ip, os, online } = host;

    const response = await conn.run(sql, [hostname, ip, os, online]);

    return response;
}


async function update(host) {
    const conn = await database.connect();

    const { id, hostname, ip, os, online } = host;
  
    const sql = `
      UPDATE
        hosts
      SET 
        hostname = ?, ip = ?, os = ?, online = ?
      WHERE
        id = ?
    `;
  
    const response = await conn.run(sql, [hostname, ip, os, online, id]);
  
    return response;
}

async function remove(id) {
    const conn = await database.connect();

    const sql = `
      DELETE FROM
        hosts
      WHERE
        id = ?
    `;
  
    const response = await conn.run(sql, [id]);

    return response;
}


export default {
    read_all,
    read_by_id,
    create,
    update,
    remove
};