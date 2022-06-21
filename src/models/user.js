import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';


const DBPATH = path.join(path.resolve('src', 'seeders', 'data.json'));
const DB = () => JSON.parse(fs.readFileSync(DBPATH));

const saltRounds = 12;


function read_by_email(email) {
    const user = DB().users.find((user) => user.email === email);

    return user;
}

async function create(user) {
    const id = String(new Date().getTime());

    const { name, email, password } = user;

    const newUser = { ...user, id };

    const hash = await bcrypt.hash(password, saltRounds);

    const db = DB();

    db.users.push({ ...newUser, password: hash });
    fs.writeFileSync(DBPATH, JSON.stringify(db));

    return { id, name, email };
}



export default { read_by_email, create };