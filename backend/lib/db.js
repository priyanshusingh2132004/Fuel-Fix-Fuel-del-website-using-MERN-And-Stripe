import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults
db.defaults({ users: [], fuels: [], orders: [] }).write();

export default db;
