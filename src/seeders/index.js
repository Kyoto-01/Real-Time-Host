import fs from 'fs';
import path from 'path';

import userModel from '../models/user_model.js';
import agentModel from '../models/agent_model.js';

const dirname = path.resolve();


async function up() {
    const content = fs.readFileSync(path.join(dirname, 'src', 'seeders', 'data.json'));
    const data = JSON.parse(content);

    for (const user of data.users) {
       await userModel.create(user);
    }

    for (const agent of data.agents) {
       await agentModel.create(agent);
    }
}

 export default { up };