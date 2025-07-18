import { r as redirect } from './index2-Ddp2AB5f.js';

const load = async ({ locals }) => {
  if (locals.session) {
    throw redirect(303, "/login");
  }
  throw redirect(303, "/login");
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-r9mWZ_sM.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/3.DKxEn9TF.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/BDEhTM1z.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-D9bK5ZQj.js.map
