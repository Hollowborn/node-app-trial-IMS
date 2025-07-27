import { q as push, B as spread_attributes, C as clsx, S as bind_props, u as pop } from './index-De8vQF1I.js';
import { c as cn } from './utils-ClAJye8o.js';
import { c as ce } from './button-BNxbTI-l.js';

const alertVariants = ce({
  base: "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive: "text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current"
    }
  },
  defaultVariants: { variant: "default" }
});
function Alert($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    variant = "default",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "alert",
      class: clsx(cn(alertVariants({ variant }), className)),
      ...restProps,
      role: "alert"
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}

export { Alert as A };
//# sourceMappingURL=alert-BJiEFxI7.js.map
