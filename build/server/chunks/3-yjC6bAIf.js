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
const imports = ["_app/immutable/nodes/3.sxKKBMn3.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/BjxZ6Dx9.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-yjC6bAIf.js.map
