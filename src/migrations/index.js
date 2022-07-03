import database from '../db/index.js';


async function up() {
    const conn = await database.connect();

    await conn.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);
    await conn.run(`
        CREATE TABLE IF NOT EXISTS hosts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hostname TEXT NOT NULL,
            ip TEXT NOT NULL,
            os TEXT NOT NULL,
            online BOOL NOT NULL
        )
    `);
}

async function down() {
    const conn = database.connect();

    await conn.run(`DROP TABLE users`); 
    await conn.run(`DROP TABLE hosts`); 
}


export default { up, down }
