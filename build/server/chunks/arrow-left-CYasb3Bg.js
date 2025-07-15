import { T as sanitize_props, I as spread_props, C as slot } from './index-C7g5K6pr.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';

function Arrow_left($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m12 19-7-7 7-7" }],
    ["path", { "d": "M19 12H5" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-left" },
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

export { Arrow_left as A };
//# sourceMappingURL=arrow-left-CYasb3Bg.js.map
