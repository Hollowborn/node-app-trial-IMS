import { T as sanitize_props, I as spread_props, C as slot } from './index-C7g5K6pr.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';

function Dollar_sign($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "2",
        "y2": "22"
      }
    ],
    [
      "path",
      {
        "d": "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "dollar-sign" },
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

export { Dollar_sign as D };
//# sourceMappingURL=dollar-sign-CDdfvTN_.js.map
