import { g as getSession } from './auth-CkYXVrx8.js';
import { d as db } from './database-BZRN5Cgi.js';
import './index2-Ddp2AB5f.js';
import 'bcryptjs';
import 'better-sqlite3';
import 'path';
import 'fs';

const load = async ({ cookies }) => {
  const sessionId = cookies.get("sessionId");
  const session = sessionId ? getSession(sessionId) : null;
  let user = null;
  let sessionForFrontend = null;
  if (session && session.userId) {
    try {
      const userDbData = db.prepare(
        "SELECT id, username, profile_image, role FROM users WHERE id = ?"
      ).get(session.userId);
      if (userDbData) {
        user = {
          id: userDbData.id,
          username: userDbData.username,
          profileImage: userDbData.profile_image,
          // Map from snake_case to camelCase
          role: userDbData.role
        };
        sessionForFrontend = {
          // Populate session data for frontend
          userId: session.userId,
          role: userDbData.role
          // Using role from fetched user data for consistency
        };
      }
    } catch (error) {
      console.error("Error fetching user in layout.server.ts:", error);
    }
  }
  return {
    // This 'user' object will be available as `data.user` in +layout.svelte and `(await parent()).user` in child loads
    user,
    // This 'session' object is now explicitly returned, making it available via `(await parent()).session`
    session: sessionForFrontend
    // Make sure to return this
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-Bpj1d6We.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.DcHRL7sq.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/Cppd9TIg.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/Ca16gRfA.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/DDxGkWpc.js","_app/immutable/chunks/BdKzLJUH.js","_app/immutable/chunks/BAa4oyvZ.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/EdVlTvtb.js"];
const stylesheets = ["_app/immutable/assets/0.Cbs7W5_h.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-WOBVOARg.js.map
