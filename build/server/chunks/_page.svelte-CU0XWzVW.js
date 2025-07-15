import { q as push, u as pop, T as sanitize_props, I as spread_props, C as slot } from './index-C7g5K6pr.js';
import './client--FX0Csju.js';
import { B as Button } from './button-CTUnD44E.js';
import { I as Input } from './input-BZivlnJU.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-2UI1-8SA.js';
import { C as Card_description } from './card-description-DBEtfUW_.js';
import { C as Card_footer } from './card-footer-CIrQjlS9.js';
import { L as Label } from './label-BggOrNn6.js';
import './alert-xT3Jgele.js';
import { U as User } from './user-BbuafAHW.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';
import './exports-C8zAyQJJ.js';
import './utils-CgnlkBsb.js';
import './attrs-CWQZy0Ma.js';
import './create-id-DFnkhZAm.js';

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
  $$payload.out += `<div class="min-h-screen flex items-center justify-center">`;
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
  $$payload.out += `<!----></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CU0XWzVW.js.map
