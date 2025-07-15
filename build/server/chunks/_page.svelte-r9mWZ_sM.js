import { B as Button } from './button-CTUnD44E.js';
import './index-C7g5K6pr.js';
import './utils-CgnlkBsb.js';

function _page($$payload) {
  $$payload.out += `<div class="flex flex-col items-center justify-centter min-h-screen bg-gray-50"><div class="div"><h1>Welcome to SvelteKit</h1> <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> `;
  Button($$payload, {
    href: "/dashboard-01",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Dashboard`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    href: "/login-05",
    variant: "secondary",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Login`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-r9mWZ_sM.js.map
