import { e as error } from './index2-Ddp2AB5f.js';
import fsPromises from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'path';

const DB_BACKUPS_DIR = path.join(process.cwd(), "db_backups");
const GET = async ({ url }) => {
  const fileName = url.searchParams.get("filename");
  if (!fileName) {
    throw error(400, "Filename is required.");
  }
  const fullPath = path.join(DB_BACKUPS_DIR, fileName);
  if (!fullPath.startsWith(DB_BACKUPS_DIR)) {
    throw error(403, "Access denied: Invalid file path.");
  }
  if (!existsSync(fullPath)) {
    throw error(404, "File not found.");
  }
  try {
    const fileContent = await fsPromises.readFile(fullPath);
    const headers = new Headers();
    headers.set("Content-Type", "application/x-sqlite3");
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
    headers.set("Content-Length", fileContent.length.toString());
    fsPromises.unlink(fullPath).then(() => console.log(`Cleaned up temporary backup file: ${fullPath}`)).catch(
      (e) => console.error(
        `Failed to clean up temporary backup file ${fullPath}:`,
        e
      )
    );
    return new Response(fileContent, { headers });
  } catch (e) {
    console.error(`Error serving or deleting file ${fullPath}:`, e);
    throw error(500, "Failed to download file.");
  }
};

export { GET };
//# sourceMappingURL=_server.ts-4dLiWv09.js.map
