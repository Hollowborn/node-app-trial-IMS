import { T as sanitize_props, I as spread_props, C as slot } from './index-C7g5K6pr.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';

function Package($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m7.5 4.27 9 5.15" }],
    [
      "path",
      {
        "d": "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
      }
    ],
    ["path", { "d": "m3.3 7 8.7 5 8.7-5" }],
    ["path", { "d": "M12 22V12" }]
  ];
  Icon($$payload, spread_props([
    { name: "package" },
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

export { Package as P };
//# sourceMappingURL=package-Cj-QtyxP.js.map
