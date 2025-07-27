import { q as push, B as spread_attributes, C as clsx, S as bind_props, u as pop } from './index-De8vQF1I.js';
import { c as cn } from './utils-ClAJye8o.js';

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
//# sourceMappingURL=card-description-CsPPPvKz.js.map
