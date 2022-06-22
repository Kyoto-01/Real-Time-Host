import bcrypt from 'bcrypt';
import database from '../db/index.js';


const saltRounds = 12;


async function read_all() {
    const conn = await database.connect();

    const sql = `
        SELECT
            id, name, email
        FROM
            users
    `;

    return await conn.all(sql);
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

    const hash = await bcrypt.hash(password, saltRounds);

    const { lastID } = conn.run(sql, [name, email, hash]);

    return { id, name, email };
}



export default { read_by_email, create };