import { e as error } from './index2-Ddp2AB5f.js';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

const UPLOADS_BASE_DIR = path.join(process.cwd(), "uploads");
async function GET({ params }) {
  const requestedPath = params.path;
  const filePath = path.join(UPLOADS_BASE_DIR, requestedPath);
  const absolutePath = path.resolve(filePath);
  if (!absolutePath.startsWith(UPLOADS_BASE_DIR)) {
    throw error(403, "Forbidden: Attempted directory traversal");
  }
  if (!existsSync(absolutePath)) {
    throw error(404, "Not Found");
  }
  try {
    const fileContent = readFileSync(absolutePath);
    const mimeType = getMimeType(absolutePath);
    return new Response(fileContent, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000"
        // Cache images for a year
      }
    });
  } catch (e) {
    console.error(`Error serving file ${absolutePath}:`, e);
    throw error(500, "Internal Server Error: Failed to serve image");
  }
}
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    // Add SVG if you support it
    // Add more types as needed
    default:
      return "application/octet-stream";
  }
}

export { GET };
//# sourceMappingURL=_server.ts-BnDS0MuQ.js.map
