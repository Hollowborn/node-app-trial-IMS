import { q as push, J as spread_attributes, K as clsx, M as bind_props, u as pop } from './index-C7g5K6pr.js';
import { c as cn } from './utils-CgnlkBsb.js';

function Input($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    type,
    files = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (type === "file") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<input${spread_attributes(
      {
        "data-slot": "input",
        class: clsx(cn("selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className)),
        type: "file",
        ...restProps
      },
      null
    )}/>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<input${spread_attributes(
      {
        "data-slot": "input",
        class: clsx(cn("border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className)),
        type,
        value,
        ...restProps
      },
      null
    )}/>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value, files });
  pop();
}

export { Input as I };
//# sourceMappingURL=input-BZivlnJU.js.map
