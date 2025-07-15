import { q as push, u as pop, T as sanitize_props, I as spread_props, C as slot } from './index-C7g5K6pr.js';
import { B as Button } from './button-CTUnD44E.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-2UI1-8SA.js';
import { C as Card_description } from './card-description-DBEtfUW_.js';
import './client--FX0Csju.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';
import './utils-CgnlkBsb.js';
import './exports-C8zAyQJJ.js';

function Home($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      }
    ],
    [
      "polyline",
      { "points": "9 22 9 12 15 12 15 22" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "home" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Shield_off($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m2 2 20 20" }],
    [
      "path",
      {
        "d": "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"
      }
    ],
    [
      "path",
      {
        "d": "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "shield-off" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$payload, $$props) {
  push();
  $$payload.out += `<div class="flex min-h-screen items-center justify-center bg-background p-4">`;
  Card($$payload, {
    class: "w-full max-w-md text-center",
    children: ($$payload2) => {
      Card_header($$payload2, {
        class: "space-y-4",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex justify-center">`;
          Shield_off($$payload3, { class: "h-16 w-16 text-destructive" });
          $$payload3.out += `<!----></div> `;
          Card_title($$payload3, {
            class: "text-3xl font-bold text-destructive",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Access Denied`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            class: "text-muted-foreground",
            children: ($$payload4) => {
              $$payload4.out += `<!---->You do not have the necessary permissions to view this page.
        Please contact your administrator if you believe this is an error.`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        class: "pt-6",
        children: ($$payload3) => {
          Button($$payload3, {
            class: "w-full",
            children: ($$payload4) => {
              Home($$payload4, { class: "h-4 w-4 mr-2" });
              $$payload4.out += `<!----> Go to Home Page`;
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dod3kx2w.js.map
