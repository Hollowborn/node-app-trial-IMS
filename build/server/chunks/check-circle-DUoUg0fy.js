import { V as sanitize_props, M as spread_props, Q as slot } from './index-De8vQF1I.js';
import { I as Icon } from './Icon2-DDFPy3UW.js';

function Check_circle($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M22 11.08V12a10 10 0 1 1-5.93-9.14" }
    ],
    ["path", { "d": "m9 11 3 3L22 4" }]
  ];
  Icon($$payload, spread_props([
    { name: "check-circle" },
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

export { Check_circle as C };
//# sourceMappingURL=check-circle-DUoUg0fy.js.map
