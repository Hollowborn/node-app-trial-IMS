import { q as push, T as copy_payload, U as assign_payload, u as pop, N as escape_html, A as ensure_array_like, V as sanitize_props, M as spread_props, Q as slot } from './index-De8vQF1I.js';
import { g as goto } from './client-BhPeql-r.js';
import { I as Input } from './input-C9F7glNZ.js';
import { B as Button } from './button-BNxbTI-l.js';
import { C as Card, a as Card_header, c as Card_content, b as Card_title } from './card-title-w0WvgVlQ.js';
import { S as Separator } from './separator-BgdIaxnM.js';
import { B as Badge } from './badge-bTGkNV-T.js';
import { A as Arrow_left } from './arrow-left-Cea-Jn1z.js';
import { S as Search } from './search-Bhp7za9e.js';
import { U as User } from './user-u37ihTmq.js';
import { F as Fish } from './fish-r6GGQQtp.js';
import { I as Icon } from './Icon2-DDFPy3UW.js';
import { B as Briefcase } from './briefcase-Cuc9lEll.js';
import { W as Wheat } from './wheat-ouhpWEnu.js';
import { H as Hammer } from './hammer-sKvqxXWo.js';
import './exports-DV9d4DRW.js';
import './utils-ClAJye8o.js';
import './attrs-BUrL1FBy.js';
import './create-id-VJ-xBm53.js';

function Handshake($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m11 17 2 2a1 1 0 1 0 3-3" }],
    [
      "path",
      {
        "d": "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"
      }
    ],
    ["path", { "d": "m21 3 1 11h-2" }],
    [
      "path",
      { "d": "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" }
    ],
    ["path", { "d": "M3 4h8" }]
  ];
  Icon($$payload, spread_props([
    { name: "handshake" },
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
function Scale($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"
      }
    ],
    [
      "path",
      {
        "d": "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"
      }
    ],
    ["path", { "d": "M7 21h10" }],
    ["path", { "d": "M12 3v18" }],
    [
      "path",
      { "d": "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "scale" },
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
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let localSearchQuery = data.searchQuery || "";
  async function handleLocalSearch() {
    if (localSearchQuery.trim()) {
      await goto(`/dashboard/search-results?q=${encodeURIComponent(localSearchQuery.trim())}`, {});
    } else {
      await goto(`/dashboard/search-results`, {});
    }
  }
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return (/* @__PURE__ */ new Date(dateString + "T00:00:00")).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  let groupedResults = () => {
    const groups = {};
    data.searchResults.forEach((result) => {
      if (!groups[result.type]) {
        groups[result.type] = [];
      }
      groups[result.type].push(result);
    });
    return groups;
  };
  function getResultTypeDisplayName(type) {
    switch (type) {
      case "client":
        return "Clients";
      case "pond":
        return "Ponds";
      case "stocking_info":
        return "Stocking Information";
      case "harvest_info":
        return "Harvest Information";
      case "employee":
        return "Employees";
      case "feed_item":
        return "Feed Inventory";
      case "hardware_item":
        return "Hardware Inventory";
      default:
        return "Unknown";
    }
  }
  function getResultTypeIcon(type) {
    switch (type) {
      case "client":
        return User;
      case "pond":
        return Fish;
      case "stocking_info":
        return Handshake;
      case "harvest_info":
        return Scale;
      case "employee":
        return Briefcase;
      case "feed_item":
        return Wheat;
      case "hardware_item":
        return Hammer;
      default:
        return Search;
    }
  }
  function getDetailUrl(result) {
    switch (result.type) {
      case "client":
        return `/dashboard/clients/${result.id}`;
      case "pond":
        return `/dashboard/ponds/${result.id}`;
      case "stocking_info":
        return `/dashboard/clients/${result.client_id}/stocking-info/${result.id}`;
      case "harvest_info":
        return `/dashboard/clients/${result.client_id}/stocking-info/${result.stocking_id}/harvest-info`;
      case "employee":
        return `/dashboard/employees/${result.id}`;
      case "feed_item":
        return `/dashboard/inventory/feeds`;
      case "hardware_item":
        return `/dashboard/inventory/hardware`;
      default:
        return "#";
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="space-y-6"><div class="flex justify-between items-center"><div>`;
    Button($$payload2, {
      variant: "ghost",
      href: "/dashboard",
      class: "mb-2 -ml-4",
      children: ($$payload3) => {
        Arrow_left($$payload3, { class: "h-4 w-4 mr-2" });
        $$payload3.out += `<!----> Back to Dashboard`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <h1 class="text-2xl font-bold">Global Search Results</h1> <p class="text-gray-500">Showing results for: "${escape_html(data.searchQuery)}"</p></div></div></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Search Summary`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Separator($$payload4, { class: "my-2" });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<div class="flex items-center gap-4 mb-4"><div class="relative flex-1">`;
            Input($$payload4, {
              placeholder: "Refine search...",
              class: "pl-10",
              get value() {
                return localSearchQuery;
              },
              set value($$value) {
                localSearchQuery = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Search($$payload4, {
              class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            });
            $$payload4.out += `<!----></div> `;
            Button($$payload4, {
              onclick: handleLocalSearch,
              size: "lg",
              variant: "secondary",
              children: ($$payload5) => {
                Search($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Search`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (data.message) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">${escape_html(data.message)}</div>`;
            } else {
              $$payload4.out += "<!--[!-->";
              const each_array = ensure_array_like(Object.entries(groupedResults));
              $$payload4.out += `<div class="space-y-6"><!--[-->`;
              for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
                let [type, results] = each_array[$$index_1];
                Card($$payload4, {
                  children: ($$payload5) => {
                    Card_header($$payload5, {
                      class: "flex flex-row items-center justify-between space-y-0 pb-2",
                      children: ($$payload6) => {
                        $$payload6.out += `<div class="flex items-center gap-2"><!---->`;
                        getResultTypeIcon(type)?.($$payload6, { class: "h-5 w-5 text-muted-foreground" });
                        $$payload6.out += `<!----> `;
                        Card_title($$payload6, {
                          class: "text-lg font-medium",
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->${escape_html(getResultTypeDisplayName(type))} (${escape_html(results.length)})`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!----></div>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!----> `;
                    Card_content($$payload5, {
                      children: ($$payload6) => {
                        const each_array_1 = ensure_array_like(results);
                        $$payload6.out += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`;
                        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                          let result = each_array_1[$$index];
                          Card($$payload6, {
                            class: "p-4 border rounded-lg shadow-sm",
                            children: ($$payload7) => {
                              $$payload7.out += `<h3 class="font-semibold text-lg mb-1 flex items-center gap-2">`;
                              if (result.type === "client") {
                                $$payload7.out += "<!--[-->";
                                User($$payload7, { class: "h-4 w-4 text-primary" });
                                $$payload7.out += `<!----> ${escape_html(result.name)}`;
                              } else if (result.type === "pond") {
                                $$payload7.out += "<!--[1-->";
                                Fish($$payload7, { class: "h-4 w-4 text-primary" });
                                $$payload7.out += `<!----> Pond ${escape_html(result.pond_number)}`;
                              } else if (result.type === "stocking_info") {
                                $$payload7.out += "<!--[2-->";
                                Handshake($$payload7, { class: "h-4 w-4 text-primary" });
                                $$payload7.out += `<!----> Stocking: ${escape_html(result.species_name)} (${escape_html(formatDate(result.stocking_date))})`;
                              } else if (result.type === "harvest_info") {
                                $$payload7.out += "<!--[3-->";
                                Scale($$payload7, { class: "h-4 w-4 text-primary" });
                                $$payload7.out += `<!----> Harvest: ${escape_html(result.stocking_species_name)} (${escape_html(formatDate(result.harvest_date))})`;
                              } else if (result.type === "employee") {
                                $$payload7.out += "<!--[4-->";
                                Briefcase($$payload7, { class: "h-4 w-4 text-primary" });
                                $$payload7.out += `<!----> ${escape_html(result.name)} (${escape_html(result.role)})`;
                              } else if (result.type === "feed_item") {
                                $$payload7.out += "<!--[5-->";
                                Wheat($$payload7, { class: "h-4 w-4 text-primary" });
                                $$payload7.out += `<!----> Feed: ${escape_html(result.feed_name)} (${escape_html(result.feed_stage)})`;
                              } else if (result.type === "hardware_item") {
                                $$payload7.out += "<!--[6-->";
                                Hammer($$payload7, { class: "h-4 w-4 text-primary" });
                                $$payload7.out += `<!----> Hardware: ${escape_html(result.item_name)}`;
                              } else {
                                $$payload7.out += "<!--[!-->";
                              }
                              $$payload7.out += `<!--]--></h3> <p class="text-sm text-muted-foreground mb-2">Matched by: `;
                              Badge($$payload7, {
                                variant: "secondary",
                                children: ($$payload8) => {
                                  $$payload8.out += `<!---->${escape_html(result.match_field)}`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload7.out += `<!----></p> <ul class="text-sm space-y-1">`;
                              if (result.type === "client") {
                                $$payload7.out += "<!--[-->";
                                $$payload7.out += `<li><strong>Address:</strong> ${escape_html(result.address)}</li> <li><strong>Contact:</strong> ${escape_html(result.contact_number || "N/A")}</li>`;
                              } else if (result.type === "pond") {
                                $$payload7.out += "<!--[1-->";
                                $$payload7.out += `<li><strong>Location:</strong> ${escape_html(result.location || "N/A")}</li> <li><strong>Status:</strong> ${escape_html(result.status)}</li>`;
                              } else if (result.type === "stocking_info") {
                                $$payload7.out += "<!--[2-->";
                                $$payload7.out += `<li><strong>Client:</strong> ${escape_html(result.client_name)}</li> <li><strong>Species:</strong> ${escape_html(result.species_name)}</li> <li><strong>Size Range:</strong> ${escape_html(result.fish_size_range)}</li>`;
                              } else if (result.type === "harvest_info") {
                                $$payload7.out += "<!--[3-->";
                                $$payload7.out += `<li><strong>Notes:</strong> ${escape_html(result.notes || "N/A")}</li>`;
                              } else if (result.type === "employee") {
                                $$payload7.out += "<!--[4-->";
                                $$payload7.out += `<li><strong>Role:</strong> ${escape_html(result.role)}</li> <li><strong>Assignment:</strong> ${escape_html(result.inventory_assignment || "N/A")}</li>`;
                              } else if (result.type === "feed_item") {
                                $$payload7.out += "<!--[5-->";
                                $$payload7.out += `<li><strong>Stage:</strong> ${escape_html(result.feed_stage)}</li> <li><strong>Requested By:</strong> ${escape_html(result.requested_by_name || "N/A")}</li>`;
                              } else if (result.type === "hardware_item") {
                                $$payload7.out += "<!--[6-->";
                                $$payload7.out += `<li><strong>Assigned To:</strong> ${escape_html(result.assigned_to_name || "N/A")}</li>`;
                              } else {
                                $$payload7.out += "<!--[!-->";
                              }
                              $$payload7.out += `<!--]--></ul> <div class="mt-4 text-right">`;
                              Button($$payload7, {
                                variant: "outline",
                                size: "sm",
                                href: getDetailUrl(result),
                                children: ($$payload8) => {
                                  $$payload8.out += `<!---->View Details`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload7.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload6.out += `<!--]--></div>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
              }
              $$payload4.out += `<!--]--></div>`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-EcyBrx8y.js.map
