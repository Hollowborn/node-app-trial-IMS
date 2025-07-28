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
const component = async () => component_cache ??= (await import('./_page.svelte-Bi6u8F_A.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/18.CJG8h979.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BOZ4giT5.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/C_qPImRn.js","_app/immutable/chunks/BgG39g1l.js","_app/immutable/chunks/Bo2GsiZ3.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/nTpf8bzQ.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/Ca16gRfA.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-BLxOyJ9O.js.map
