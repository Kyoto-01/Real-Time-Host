import database from '../db/index.js';

async function read_by_id(id) {
    const conn = await database.connect();

    const sql = `
        SELECT
            id, name, email
        FROM
            users
        WHERE
            id = ?
    `;

    return await conn.get(sql, [id]);
}

async function read_by_email(email) {
    const conn = await database.connect();

    const sql = `
        SELECT
            id, name, email, password
        FROM
            users
        WHERE
            email = ?
    `;

    return await conn.get(sql, [email]);
}

async function create(user) {
    const conn = await database.connect();

    const sql = `
        INSERT INTO
            users (name, email, password)
        VALUES
            (?, ?, ?)
    `;

    return await conn.run(sql, [user.name, user.email, user.password]);
}

export default {
    read_by_id,
    read_by_email,
    create
};
