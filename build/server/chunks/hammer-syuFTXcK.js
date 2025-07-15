import { T as sanitize_props, I as spread_props, C as slot } from './index-C7g5K6pr.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';

function Hammer($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" }
    ],
    ["path", { "d": "m18 15 4-4" }],
    [
      "path",
      {
        "d": "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "hammer" },
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

export { Hammer as H };
//# sourceMappingURL=hammer-syuFTXcK.js.map
