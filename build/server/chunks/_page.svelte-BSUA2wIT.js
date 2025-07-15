import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-2UI1-8SA.js';
import { C as Card_description } from './card-description-DBEtfUW_.js';
import { S as Separator } from './separator-Dp6kZbL1.js';
import { S as Search } from './search-B0fDvFmU.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-D8prpRXC.js';
import { P as Pencil } from './pencil-RVjprur7.js';
import { A as Arrow_up, a as Arrow_down } from './arrow-up-CsewfvOZ.js';
import { U as User } from './user-BbuafAHW.js';
import { T as sanitize_props, I as spread_props, C as slot } from './index-C7g5K6pr.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';
import { F as Fish } from './fish-DoyYKSor.js';
import { G as Grid_3x3, B as Building } from './grid-3x3-C_nqfxpE.js';
import { B as Briefcase } from './briefcase-D_CUshXW.js';
import { P as Package } from './package-Cj-QtyxP.js';
import './utils-CgnlkBsb.js';
import './attrs-CWQZy0Ma.js';
import './create-id-DFnkhZAm.js';

function Cake($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"
      }
    ],
    [
      "path",
      {
        "d": "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"
      }
    ],
    ["path", { "d": "M2 21h20" }],
    ["path", { "d": "M7 8v3" }],
    ["path", { "d": "M12 8v3" }],
    ["path", { "d": "M17 8v3" }],
    ["path", { "d": "M7 4h0.01" }],
    ["path", { "d": "M12 4h0.01" }],
    ["path", { "d": "M17 4h0.01" }]
  ];
  Icon($$payload, spread_props([
    { name: "cake" },
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
function Phone($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "phone" },
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
function _page($$payload) {
  $$payload.out += `<div class="space-y-6 p-4 md:p-6"><h1 class="text-3xl font-bold">User Guide: Navigating Your Aquaculture Management System</h1> <p class="text-muted-foreground">Welcome to your comprehensive guide for the Aquaculture Management System! This document is designed to help you quickly understand the core functionalities of the platform, enabling you to manage your operations efficiently and with confidence.</p> <p class="text-muted-foreground">Our goal is to provide you with a powerful yet intuitive tool. This guide will walk you through the main sections of the application and clarify the purpose of various interactive elements you'll encounter.</p> `;
  Separator($$payload, { class: "my-6" });
  $$payload.out += `<!----> `;
  Card($$payload, {
    children: ($$payload2) => {
      Card_header($$payload2, {
        children: ($$payload3) => {
          Card_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->1. Overview of Main Functions`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->The system is organized into several key modules, accessible via the sidebar navigation, each designed to streamline a specific aspect of your aquaculture business:`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        class: "space-y-4",
        children: ($$payload3) => {
          $$payload3.out += `<div class="space-y-2"><h3 class="text-lg font-semibold">Dashboard</h3> <p class="text-muted-foreground">Your central hub for real-time insights. This page provides a high-level overview of key metrics, financial summaries, production data, and recent activities through interactive charts and summary cards. It's your go-to for a quick pulse check on your operations.</p></div> <div class="space-y-2"><h3 class="text-lg font-semibold">Clients</h3> <p class="text-muted-foreground">Manage all your aquaculture operators. Here, you can add new clients, view their profiles, and update their contact and operational details. This ensures you have a complete and organized record of your clientele.</p></div> <div class="space-y-2"><h3 class="text-lg font-semibold">Inventory</h3> <p class="text-muted-foreground">Keep track of your valuable resources. This section is further divided into:</p> <ul class="list-disc list-inside ml-4 space-y-1 text-muted-foreground"><li><span class="font-medium text-foreground">Feeds:</span> Monitor your feed stock, including quantity, cost, and usage. Essential for managing consumption and reordering.</li> <li><span class="font-medium text-foreground">Hardware:</span> Oversee all physical assets, from equipment to tools. Track quantities, costs, and who each item is assigned to.</li> <li><span class="font-medium text-foreground">Stocks:</span> Manage your fish or fingerling stocks, including stocking events and related details.</li></ul></div> <div class="space-y-2"><h3 class="text-lg font-semibold">Bookings</h3> <p class="text-muted-foreground">Schedule and manage appointments with clients. Whether for consultations or reservations, this module helps you organize your calendar and client interactions.</p></div> <div class="space-y-2"><h3 class="text-lg font-semibold">Reports</h3> <p class="text-muted-foreground">Generate detailed reports on various aspects of your operations, providing deeper analysis and aiding in strategic decision-making.</p></div> <div class="space-y-2"><h3 class="text-lg font-semibold">Employees</h3> <p class="text-muted-foreground">Manage your team members. This section allows you to maintain employee records, roles, and assignments, ensuring smooth internal operations.</p></div> <div class="space-y-2"><h3 class="text-lg font-semibold">Settings</h3> <p class="text-muted-foreground">Customize your application preferences and manage system-wide configurations.</p></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Card($$payload, {
    children: ($$payload2) => {
      Card_header($$payload2, {
        children: ($$payload3) => {
          Card_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->2. Understanding Table Actions and Icons`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->Throughout the system, especially within tables, you'll find various icons and buttons that allow you to perform specific actions on individual records. Here's a breakdown of the most common ones:`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<div class="overflow-x-auto"><table class="w-full border-collapse"><thead><tr class="border-b"><th class="p-2 text-left text-sm font-semibold text-muted-foreground">Icon / Action Button</th><th class="p-2 text-left text-sm font-semibold text-muted-foreground">Tooltip Text</th><th class="p-2 text-left text-sm font-semibold text-muted-foreground">Description</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Search($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> Search Bar</td><td class="p-2 text-muted-foreground">"Search by..."</td><td class="p-2 text-muted-foreground">Filters the table data based on your input in real-time or upon pressing Enter.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Plus($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> Add Button</td><td class="p-2 text-muted-foreground">"Add [Item Type]"</td><td class="p-2 text-muted-foreground">Initiates the process to create a new record (e.g., "Add Client," "Add Employee").</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Pencil($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Pen/Pencil)</td><td class="p-2 text-muted-foreground">"Edit" or "Edit [Record Type]"</td><td class="p-2 text-muted-foreground">Opens a form to modify the details of the selected record.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Trash_2($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Trash Can)</td><td class="p-2 text-muted-foreground">"Delete" or "Delete [Record Type]"</td><td class="p-2 text-muted-foreground">Prompts you to confirm the permanent removal of the selected record.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Arrow_up($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Arrow Up)</td><td class="p-2 text-muted-foreground">"Sort Ascending"</td><td class="p-2 text-muted-foreground">Indicates the column is currently sorted in ascending order. Clicking will reverse the sort.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Arrow_down($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Arrow Down)</td><td class="p-2 text-muted-foreground">"Sort Descending"</td><td class="p-2 text-muted-foreground">Indicates the column is currently sorted in descending order. Clicking will reverse the sort.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Chevrons_up_down($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Arrow Up Down)</td><td class="p-2 text-muted-foreground">"Sort"</td><td class="p-2 text-muted-foreground">Indicates the column is not currently sorted. Clicking will sort it in ascending order.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          User($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (User Icon)</td><td class="p-2 text-muted-foreground">"Assigned To" or "Requested By"</td><td class="p-2 text-muted-foreground">Often used in inventory to show which employee an item is assigned to or requested by.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Phone($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Phone Icon)</td><td class="p-2 text-muted-foreground">"Contact Number"</td><td class="p-2 text-muted-foreground">Represents a contact number field.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Cake($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Cake Icon)</td><td class="p-2 text-muted-foreground">"Birthday"</td><td class="p-2 text-muted-foreground">Represents a birthday field.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Fish($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Fish Icon)</td><td class="p-2 text-muted-foreground">"Pond Operator"</td><td class="p-2 text-muted-foreground">Indicates a client or operation related to pond aquaculture.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Grid_3x3($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Grid Icon)</td><td class="p-2 text-muted-foreground">"Cage Operator"</td><td class="p-2 text-muted-foreground">Indicates a client or operation related to cage aquaculture.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Building($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Building Icon)</td><td class="p-2 text-muted-foreground">"Organization"</td><td class="p-2 text-muted-foreground">Indicates a client or entity that is an organization.</td></tr><tr class="border-b"><td class="p-2 font-bold flex items-center gap-2">`;
          Briefcase($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Briefcase Icon)</td><td class="p-2 text-muted-foreground">"Role"</td><td class="p-2 text-muted-foreground">Represents an employee's role.</td></tr><tr><td class="p-2 font-bold flex items-center gap-2">`;
          Package($$payload3, { class: "h-4 w-4" });
          $$payload3.out += `<!----> (Package Icon)</td><td class="p-2 text-muted-foreground">"Inventory Assignment"</td><td class="p-2 text-muted-foreground">Indicates an assignment related to inventory.</td></tr></tbody></table></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Card($$payload, {
    children: ($$payload2) => {
      Card_header($$payload2, {
        children: ($$payload3) => {
          Card_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->3. General Navigation and UI Elements`;
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        class: "space-y-4",
        children: ($$payload3) => {
          $$payload3.out += `<div class="space-y-2"><h3 class="text-lg font-semibold">Sidebar Navigation</h3> <p class="text-muted-foreground">Located on the left, this provides quick access to all major sections of the application. Click on a main item to navigate directly, or expand a group (like "Inventory") to see its sub-sections.</p></div> <div class="space-y-2"><h3 class="text-lg font-semibold">Header Bar</h3> <p class="text-muted-foreground">At the top of the page, the header includes a toggle for the sidebar on smaller screens and a breadcrumb trail to show your current location within the application.</p></div> <div class="space-y-2"><h3 class="text-lg font-semibold">Alerts and Notifications</h3> <p class="text-muted-foreground">The system provides subtle alerts at the bottom of the screen to confirm successful actions (e.g., "Client added successfully!") or inform you of errors. These will automatically disappear after a few seconds.</p></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <p class="text-muted-foreground mt-8">We hope this guide helps you feel more comfortable and productive with the Aquaculture Management System. Should you have any further questions or require assistance, please do not hesitate to reach out to our support team.</p> <p class="text-muted-foreground font-semibold">Happy managing!</p> <p class="text-center">Made with <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">@sveltejs/kit</code> and <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">@shadcn-svelte</code></p></div>`;
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BSUA2wIT.js.map
