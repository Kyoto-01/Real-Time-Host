import bcrypt from 'bcrypt';
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

    const { name, email, password } = user;
    
    const { lastID } = conn.run(sql, [name, email, password]);

    return await read_by_id(lastID);
}


export default {
    read_by_id,
    read_by_email,
    create
};
