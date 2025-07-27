import { q as push, N as escape_html, u as pop, V as sanitize_props, M as spread_props, Q as slot } from './index-De8vQF1I.js';
import './client-BhPeql-r.js';
import { B as Button } from './button-BNxbTI-l.js';
import { I as Input } from './input-C9F7glNZ.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-w0WvgVlQ.js';
import { C as Card_description } from './card-description-CsPPPvKz.js';
import { C as Card_footer } from './card-footer-PiHpeD8x.js';
import { L as Label } from './label-DHxoTVbD.js';
import './alert-BJiEFxI7.js';
import { U as User } from './user-u37ihTmq.js';
import { I as Icon } from './Icon2-DDFPy3UW.js';
import './exports-DV9d4DRW.js';
import './utils-ClAJye8o.js';
import './attrs-BUrL1FBy.js';
import './create-id-VJ-xBm53.js';

function Key_round($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"
      }
    ],
    [
      "circle",
      {
        "cx": "16.5",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "key-round" },
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
  $$payload.out += `<div class="bg-muted min-h-screen flex items-center justify-center flex-col">`;
  Card($$payload, {
    class: "w-[400px]",
    children: ($$payload2) => {
      Card_header($$payload2, {
        children: ($$payload3) => {
          Card_title($$payload3, {
            class: "text-center",
            children: ($$payload4) => {
              $$payload4.out += `<!---->BFAR Inventory System`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            class: "text-center",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Sign in to your account`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <form method="POST">`;
      Card_content($$payload2, {
        class: "space-y-4",
        children: ($$payload3) => {
          {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <div class="space-y-2">`;
          Label($$payload3, {
            for: "username",
            children: ($$payload4) => {
              User($$payload4, {});
              $$payload4.out += `<!---->Username`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Input($$payload3, {
            id: "username",
            name: "username",
            type: "text",
            required: true
          });
          $$payload3.out += `<!----></div> <div class="space-y-2">`;
          Label($$payload3, {
            for: "password",
            children: ($$payload4) => {
              Key_round($$payload4, {});
              $$payload4.out += `<!----> Password`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Input($$payload3, {
            id: "password",
            name: "password",
            type: "password",
            required: true
          });
          $$payload3.out += `<!----></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <div class="space-y-2 mt-2">`;
      Card_footer($$payload2, {
        children: ($$payload3) => {
          Button($$payload3, {
            type: "submit",
            class: "w-full mt-2",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Sign In`;
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div></form>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="text-center text-xs text-muted-foreground mt-8 space-y-1"><p>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Bureau of Fisheries and Aquatic Resources (BFAR). All rights reserved.</p></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bi6u8F_A.js.map
