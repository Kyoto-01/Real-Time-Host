import migration from '../migrations/index.js';
import seed from '../seeders/index.js';

async function load() {
    await migration.up();
    seed.up();
}

load();
