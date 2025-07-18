import { f as fail, r as redirect } from './index2-Ddp2AB5f.js';
import { b as login } from './auth-CkYXVrx8.js';
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
const imports = ["_app/immutable/nodes/18.CryNRS0J.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/BO5sSAji.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/D8SxGvop.js","_app/immutable/chunks/Bex-ZZ3I.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/BDEhTM1z.js","_app/immutable/chunks/79yj6mvb.js","_app/immutable/chunks/C8nz08U9.js","_app/immutable/chunks/DIDi3WRX.js","_app/immutable/chunks/BWso7QFC.js","_app/immutable/chunks/BXiYU_fU.js","_app/immutable/chunks/B7wWqVz8.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/BnoYQOO4.js","_app/immutable/chunks/DG-I9f0P.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/BOqc4mWw.js","_app/immutable/chunks/DsUCSRu3.js","_app/immutable/chunks/FbqajOR9.js","_app/immutable/chunks/CsSzQ2UU.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-DneDBrCs.js.map
