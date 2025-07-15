import { q as push, u as pop, z as attr, A as head, B as store_get, C as slot, E as unsubscribe_stores } from './index-C7g5K6pr.js';
import { s as setInitialMode, m as modeStorageKey, t as themeStorageKey, d as darkClassNames, l as lightClassNames, a as disableTransitions, b as themeColors, c as defineConfig, p as page } from './mode-DhlKgu68.js';
import './attrs-CWQZy0Ma.js';
import { h as html } from './html-FW6Ia4bL.js';
import { P as Provider } from './index3-CWUAYMpH.js';
import './client--FX0Csju.js';
import './exports-C8zAyQJJ.js';
import './open-change-complete-BEHPw3Wp.js';
import './box-auto-reset.svelte-BjGOx143.js';
import './events-zWHOGqsb.js';

function Mode_watcher_lite($$payload, $$props) {
  push();
  let { themeColors: themeColors2 } = $$props;
  if (themeColors2) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}/>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Mode_watcher_full($$payload, $$props) {
  push();
  let { trueNonce = "", initConfig, themeColors: themeColors2 } = $$props;
  head($$payload, ($$payload2) => {
    if (themeColors2) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}/>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> ${html(`<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`;
  });
  pop();
}
function Mode_watcher($$payload, $$props) {
  push();
  let {
    defaultMode = "system",
    themeColors: themeColorsProp,
    disableTransitions: disableTransitionsProp = true,
    darkClassNames: darkClassNamesProp = ["dark"],
    lightClassNames: lightClassNamesProp = [],
    defaultTheme = "",
    nonce = "",
    themeStorageKey: themeStorageKeyProp = "mode-watcher-theme",
    modeStorageKey: modeStorageKeyProp = "mode-watcher-mode",
    disableHeadScriptInjection = false
  } = $$props;
  modeStorageKey.current = modeStorageKeyProp;
  themeStorageKey.current = themeStorageKeyProp;
  darkClassNames.current = darkClassNamesProp;
  lightClassNames.current = lightClassNamesProp;
  disableTransitions.current = disableTransitionsProp;
  themeColors.current = themeColorsProp;
  const initConfig = defineConfig({
    defaultMode,
    themeColors: themeColorsProp,
    darkClassNames: darkClassNamesProp,
    lightClassNames: lightClassNamesProp,
    defaultTheme,
    modeStorageKey: modeStorageKeyProp,
    themeStorageKey: themeStorageKeyProp
  });
  const trueNonce = typeof window === "undefined" ? nonce : "";
  if (disableHeadScriptInjection) {
    $$payload.out += "<!--[-->";
    Mode_watcher_lite($$payload, { themeColors: themeColors.current });
  } else {
    $$payload.out += "<!--[!-->";
    Mode_watcher_full($$payload, {
      trueNonce,
      initConfig,
      themeColors: themeColors.current
    });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let { $$slots, $$events, ...data } = $$props;
  Mode_watcher($$payload, {});
  $$payload.out += `<!----> `;
  Provider($$payload, {
    children: ($$payload2) => {
      if (store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/dashboard")) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div><!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="min-h-screen"><!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    }
  });
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-Cp1sMSJk.js.map
