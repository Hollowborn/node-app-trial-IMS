import { r as redirect } from './index2-Ddp2AB5f.js';
import { l as logout } from './auth-D4luyh-r.js';
import './database-BZRN5Cgi.js';
import 'better-sqlite3';
import 'path';
import 'fs';
import 'bcryptjs';

const actions = {
  default: async ({ cookies }) => {
    const sessionId = cookies.get("sessionId");
    if (sessionId) {
      logout(sessionId);
      cookies.delete("sessionId", { path: "/" });
    }
    throw redirect(303, "/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 20;
const server_id = "src/routes/logout/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=20-CaSJ14U6.js.map
