import database from 'sqlite-async';

async function connect() {
    return await database.open('src/db/db.sqlite')
}

export default { connect };
