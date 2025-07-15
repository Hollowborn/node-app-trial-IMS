import { f as fail, r as redirect } from './index2-Ddp2AB5f.js';
import { b as login } from './auth-D4luyh-r.js';
import './database-BZRN5Cgi.js';
import 'better-sqlite3';
import 'path';
import 'fs';
import 'bcryptjs';

const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get("username");
    const password = data.get("password");
    if (!username || !password) {
      return fail(400, {
        error: "Username and password are required"
      });
    }
    const result = await login(username.toString(), password.toString());
    if (!result.success) {
      return fail(400, {
        error: result.message
      });
    }
    if (!result.sessionId) {
      return fail(500, {
        error: "Failed to create session"
      });
    }
    console.log("DEBUG: process.env.NODE_ENV =", process.env.NODE_ENV);
    console.log(
      "DEBUG: Cookie secure flag will be =",
      process.env.NODE_ENV === "production"
    );
    cookies.set("sessionId", result.sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      // <-- CHANGE THIS TO LAX
      secure: false,
      // Keep this as is for now
      maxAge: 60 * 60 * 24 * 7
      // 1 week
    });
    throw redirect(303, "/dashboard");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CU0XWzVW.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/18.ChSFKZsi.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/q_geWe1R.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/Cl_oq7nf.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/DTKX657x.js","_app/immutable/chunks/KVJ3k5BI.js","_app/immutable/chunks/BUlJYItk.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/C43ptUaS.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/DOotmoI5.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-xV9y7yVq.js.map
