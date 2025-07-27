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
const component = async () => component_cache ??= (await import('./_page.svelte-_x5wVm2H.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/3.C6D-4l42.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/AFOXVD51.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-DASoZnA9.js.map
