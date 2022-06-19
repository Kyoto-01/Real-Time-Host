import path from 'path';
import fs from 'fs';


const DBPATH = path.join(path.resolve("database", 'db.json'));
const db = () => JSON.parse(fs.readFileSync(DBPATH)).users;


function read_by_email(email) {
    const user = db().find((user) => user.email === email);

    return user;
}


export default { read_by_email };