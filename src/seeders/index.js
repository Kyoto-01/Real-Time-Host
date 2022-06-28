import fs from 'fs';
import path from 'path';

import userModel from '../models/user.js';
import hostModel from '../models/host.js';

const dirname = path.resolve();


async function up() {
    const content = fs.readFileSync(path.join(dirname, 'src', 'seeders', 'data.json'));
    const data = JSON.parse(content);

    for (const user of data.users) {
       await userModel.create(user);
    }

    for (const host of data.hosts) {
       await hostModel.create(host);
    }
}

 export default { up };