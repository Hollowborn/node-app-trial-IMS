import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "bfar.db");
if (!fs.existsSync(DB_DIR)) {
  console.log(`Creating database directory: ${DB_DIR}`);
  fs.mkdirSync(DB_DIR, { recursive: true });
}
const db = new Database(DB_PATH, { verbose: null });
db.pragma("foreign_keys = ON");

export { db as d };
//# sourceMappingURL=database-BZRN5Cgi.js.map
