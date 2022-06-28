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

    const { lastID } = await conn.run(sql, [hostname, ip, os, online]);

    return await read_by_id(lastID);
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
  
    await conn.run(sql, [hostname, ip, os, online, id]);
  
    return await read_by_id(id);
}

async function remove(id) {
    const conn = await database.connect();

    const sql = `
      DELETE FROM
        hosts
      WHERE
        id = ?
    `;
  
    await conn.run(sql, [id]);
}


export default {
    read_all,
    create,
    update,
    remove
};