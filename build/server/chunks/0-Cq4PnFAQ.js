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
const component = async () => component_cache ??= (await import('./_layout.svelte-Cp1sMSJk.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.BEeewbR6.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/D4LbBUVP.js","_app/immutable/chunks/Bex-ZZ3I.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/CBm4oYYw.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/suOI_0RJ.js","_app/immutable/chunks/CPTLTW40.js","_app/immutable/chunks/0urWu8Wf.js","_app/immutable/chunks/DIvwaDiU.js","_app/immutable/chunks/CVjO-GJU.js"];
const stylesheets = ["_app/immutable/assets/0.CwT3inqh.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-Cq4PnFAQ.js.map
