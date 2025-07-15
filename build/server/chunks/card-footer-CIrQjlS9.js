import { q as push, J as spread_attributes, K as clsx, M as bind_props, u as pop } from './index-C7g5K6pr.js';
import { c as cn } from './utils-CgnlkBsb.js';

function Card_footer($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "card-footer",
      class: clsx(cn("[.border-t]:pt-6 flex items-center px-6", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}

export { Card_footer as C };
//# sourceMappingURL=card-footer-CIrQjlS9.js.map
