import { V as sanitize_props, M as spread_props, Q as slot } from './index-De8vQF1I.js';
import { I as Icon } from './Icon2-DDFPy3UW.js';

function Briefcase($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "7",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "path",
      {
        "d": "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "briefcase" },
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

export { Briefcase as B };
//# sourceMappingURL=briefcase-Cuc9lEll.js.map
