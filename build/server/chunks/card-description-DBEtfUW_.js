import { q as push, J as spread_attributes, K as clsx, M as bind_props, u as pop } from './index-C7g5K6pr.js';
import { c as cn } from './utils-CgnlkBsb.js';

function Card_description($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<p${spread_attributes(
    {
      "data-slot": "card-description",
      class: clsx(cn("text-muted-foreground text-sm", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></p>`;
  bind_props($$props, { ref });
  pop();
}

export { Card_description as C };
//# sourceMappingURL=card-description-DBEtfUW_.js.map
