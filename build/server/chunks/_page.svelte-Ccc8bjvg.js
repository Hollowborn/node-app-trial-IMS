import { q as push, X as props_id, B as spread_attributes, C as clsx, S as bind_props, u as pop, M as spread_props, O as stringify } from './index-De8vQF1I.js';
import { L as Label } from './label-DHxoTVbD.js';
import { I as Input } from './input-C9F7glNZ.js';
import { B as Button } from './button-BNxbTI-l.js';
import { c as cn } from './utils-ClAJye8o.js';
import { I as Icon } from './Icon3-XRLG_YcX.js';
import './attrs-BUrL1FBy.js';
import './create-id-VJ-xBm53.js';

function Gallery_vertical_end($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M7 2h10" }],
    ["path", { "d": "M5 6h14" }],
    [
      "rect",
      {
        "width": "18",
        "height": "12",
        "x": "3",
        "y": "10",
        "rx": "2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "gallery-vertical-end" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Login_form($$payload, $$props) {
  push();
  const id = props_id($$payload);
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cn("flex flex-col gap-6", className)),
      ...restProps
    },
    null
  )}><form><div class="flex flex-col gap-6"><div class="flex flex-col items-center gap-2"><a href="##" class="flex flex-col items-center gap-2 font-medium"><div class="flex size-8 items-center justify-center rounded-md">`;
  Gallery_vertical_end($$payload, { class: "size-6" });
  $$payload.out += `<!----></div> <span class="sr-only">Acme Inc.</span></a> <h1 class="text-xl font-bold">Welcome to Acme Inc.</h1> <div class="text-center text-sm">Don't have an account? <a href="##" class="underline underline-offset-4">Sign up</a></div></div> <div class="flex flex-col gap-6"><div class="grid gap-3">`;
  Label($$payload, {
    for: `email-${stringify(id)}`,
    children: ($$payload2) => {
      $$payload2.out += `<!---->Email`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Input($$payload, {
    id: `email-${stringify(id)}`,
    type: "email",
    placeholder: "m@example.com",
    required: true
  });
  $$payload.out += `<!----></div> `;
  Button($$payload, {
    type: "submit",
    class: "w-full",
    href: "/dashboard-01",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Login`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"><span class="bg-background text-muted-foreground relative z-10 px-2">Or</span></div> <div class="grid gap-4 sm:grid-cols-2">`;
  Button($$payload, {
    variant: "outline",
    type: "button",
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor"></path></svg> Continue with Apple`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    variant: "outline",
    type: "button",
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"></path></svg> Continue with Google`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></form> <div class="text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance text-center text-xs">By clicking continue, you agree to our <a href="##">Terms of Service</a> and <a href="##">Privacy Policy</a>.</div></div>`;
  bind_props($$props, { ref });
  pop();
}
function _page($$payload) {
  $$payload.out += `<div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"><div class="w-full max-w-sm">`;
  Login_form($$payload, {});
  $$payload.out += `<!----></div></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Ccc8bjvg.js.map
