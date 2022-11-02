import database from '../db/index.js';

async function read_all() {
    const conn = await database.connect();

    const sql = `
        SELECT
           *
        FROM
            agents
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
            agents
        WHERE
            id = ?
    `;

    return await conn.get(sql, [id]);
}

async function create(agent) {
    const conn = await database.connect();

    const sql = `
        INSERT INTO
            agents (addr)
        VALUES
            (?)
    `;

    const {addr} = agent;

    return await conn.run(sql, [addr]);
}

async function update(agent) {
    const conn = await database.connect();
  
    const sql = `
      UPDATE
        agents
      SET 
        addr = ?
      WHERE
        id = ?
    `;

    const { id, addr } = agent;
  
    return await conn.run(sql, [addr, id]);
}

async function remove(id) {
    const conn = await database.connect();

    const sql = `
      DELETE FROM
        agents
      WHERE
        id = ?
    `;

    return await conn.run(sql, [id]);
}

export default {
    read_all,
    read_by_id,
    create,
    update,
    remove
};