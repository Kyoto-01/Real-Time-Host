import fs from 'fs';
import path from 'path';

import userModel from '../models/user.js';


const dirname = path.resolve();


function up() {
    const content = fs.readFileSync(path.join(dirname, 'src', 'seeders', 'data.json'));
    const data = JSON.parse(content);

    for (const user of data.users) {
        userModel.create(user);
    }

    // for (const host of data.hosts) {
    //     hostModel.create(host);
    // }
}

export default { up };