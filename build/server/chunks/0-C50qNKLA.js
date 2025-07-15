import { g as getSession } from './auth-D4luyh-r.js';
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
const imports = ["_app/immutable/nodes/0.DGIHhnlU.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/DM098JB-.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/CD-1ytIX.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/D40UmvHY.js","_app/immutable/chunks/CBLA49U0.js","_app/immutable/chunks/BMspJ8Yh.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/Cd7yCszS.js"];
const stylesheets = ["_app/immutable/assets/0.CXB3NCLt.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-C50qNKLA.js.map
