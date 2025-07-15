import { q as push, P as copy_payload, Q as assign_payload, u as pop, F as escape_html, S as ensure_array_like, O as stringify, z as attr, T as sanitize_props, I as spread_props, C as slot } from './index-C7g5K6pr.js';
import { g as goto, i as invalidate } from './client--FX0Csju.js';
import { B as Button } from './button-CTUnD44E.js';
import { I as Input } from './input-BZivlnJU.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-2UI1-8SA.js';
import { L as Label } from './label-BggOrNn6.js';
import { A as Alert } from './alert-xT3Jgele.js';
import { R as Root, T as Table, P as Portal, D as Dialog_overlay, a as Dialog_content, b as Table_header, c as Table_row, d as Table_head, e as Table_body, f as Table_cell, S as Square_pen, g as Dialog_header, h as Dialog_title, i as Dialog_description, A as Alert_circle, j as Alert_description } from './index4-R95s3f3p.js';
import { R as Root$3, S as Select_trigger, a as Select_content, b as Select_item } from './index5-rLJotoyG.js';
import { B as Badge } from './badge-CyI62jER.js';
import { R as Root$1, P as Portal$1, A as Alert_dialog_overlay, a as Alert_dialog_content, b as Alert_dialog_header, c as Alert_dialog_title, d as Alert_dialog_description, e as Alert_dialog_footer } from './index6-BARiXcRc.js';
import { P as Provider, R as Root$2 } from './index3-CWUAYMpH.js';
import { S as Separator } from './separator-Dp6kZbL1.js';
import { S as Search } from './search-B0fDvFmU.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-D8prpRXC.js';
import { U as User } from './user-BbuafAHW.js';
import { T as Tooltip_trigger, a as Tooltip_content } from './tooltip-content-KOo-haMz.js';
import { A as Arrow_up, a as Arrow_down } from './arrow-up-CsewfvOZ.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';
import { I as Info } from './info-DL3_Jdz5.js';
import { X as X_circle } from './x-circle-DhIVmoT-.js';
import { C as Check_circle } from './check-circle-BDZQhB0v.js';
import './exports-C8zAyQJJ.js';
import './utils-CgnlkBsb.js';
import './attrs-CWQZy0Ma.js';
import './create-id-DFnkhZAm.js';
import './popper-layer-force-mount-CN4ObkAy.js';
import './open-change-complete-BEHPw3Wp.js';
import './box-auto-reset.svelte-BjGOx143.js';
import './presence-layer-B_7GDLHC.js';
import './events-zWHOGqsb.js';
import './x-BoU3PBvV.js';
import './Icon3-UwsVBuas.js';

function Book_open($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
      }
    ],
    [
      "path",
      {
        "d": "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "book-open" },
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
function Calendar_check($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 10h18" }],
    ["path", { "d": "m9 16 2 2 4-4" }]
  ];
  Icon($$payload, spread_props([
    { name: "calendar-check" },
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
function Check_circle_2($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "10" }
    ],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  Icon($$payload, spread_props([
    { name: "check-circle-2" },
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
function Eye_off($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M9.88 9.88a3 3 0 1 0 4.24 4.24" }
    ],
    [
      "path",
      {
        "d": "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
      }
    ],
    [
      "path",
      {
        "d": "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
      }
    ],
    [
      "line",
      {
        "x1": "2",
        "x2": "22",
        "y1": "2",
        "y2": "22"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "eye-off" },
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
function History($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
      }
    ],
    ["path", { "d": "M3 3v5h5" }],
    ["path", { "d": "M12 7v5l4 2" }]
  ];
  Icon($$payload, spread_props([
    { name: "history" },
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
function Hourglass($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M5 22h14" }],
    ["path", { "d": "M5 2h14" }],
    [
      "path",
      {
        "d": "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"
      }
    ],
    [
      "path",
      {
        "d": "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "hourglass" },
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
function Message_square($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "message-square" },
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
  let searchQuery = data.search || "";
  let error = null;
  let showCreateForm = false;
  let showEditForm = false;
  let showDeleteDialog = false;
  let bookingToDelete = null;
  let createClientId = void 0;
  let createPurpose = void 0;
  let createDate = "";
  let createTime = "";
  let createNotes = "";
  let createStatus = "pending";
  let editingId = null;
  let editingData = {};
  let currentSortBy = data.sortBy || "date";
  let currentSortOrder = data.sortOrder || "asc";
  let filteredBookings = data.bookings?.filter((booking) => booking.client_name.toLowerCase().includes(searchQuery.toLowerCase()) || booking.purpose.toLowerCase().includes(searchQuery.toLowerCase()) || booking.status.toLowerCase().includes(searchQuery.toLowerCase())) || [];
  function startEdit(booking) {
    editingId = booking.id;
    ({ ...booking });
    editingData = { ...booking };
    showEditForm = true;
  }
  function cancelEdit() {
    editingId = null;
    editingData = {};
    showEditForm = false;
  }
  function openDeleteDialog(booking) {
    bookingToDelete = booking;
    showDeleteDialog = true;
  }
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return (/* @__PURE__ */ new Date(dateString + "T00:00:00")).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  function formatTime(timeString) {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    const date = /* @__PURE__ */ new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }
  function getPurposeLabel(purpose) {
    const purposes = {
      "reservation": "Reservation",
      "consultation": "Consultation"
    };
    return purposes[purpose] || purpose;
  }
  function getStatusLabel(status) {
    const statuses = {
      "pending": "Pending",
      "confirmed": "Confirmed",
      "completed": "Completed",
      "cancelled": "Cancelled",
      "no_show": "No Show",
      "expired": "Expired"
    };
    return statuses[status] || status;
  }
  function getPurposeIcon(purpose) {
    switch (purpose) {
      case "reservation":
        return Calendar_check;
      case "consultation":
        return Message_square;
      default:
        return Book_open;
    }
  }
  function getStatusIcon(status) {
    switch (status) {
      case "pending":
        return Hourglass;
      case "confirmed":
        return Check_circle;
      case "completed":
        return Check_circle_2;
      case "cancelled":
        return X_circle;
      case "no_show":
        return Eye_off;
      case "expired":
        return History;
      default:
        return Info;
    }
  }
  function getStatusBadgeVariant(status) {
    return "outline";
  }
  function getStatusIconColorClass(status) {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "confirmed":
      case "completed":
        return "text-green-500";
      case "cancelled":
      case "no_show":
      case "expired":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  }
  function handleAddBookingClick() {
    showCreateForm = true;
    createClientId = void 0;
    createPurpose = void 0;
    createDate = "";
    createTime = "";
    createNotes = "";
    createStatus = "pending";
    error = null;
  }
  async function handleSort(column) {
    let newSortBy = column;
    let newSortOrder;
    if (currentSortBy === column) {
      if (currentSortOrder === "asc") {
        newSortOrder = "desc";
      } else {
        newSortOrder = "asc";
      }
    } else {
      newSortBy = column;
      newSortOrder = "asc";
    }
    currentSortBy = newSortBy;
    currentSortOrder = newSortOrder;
    const url = new URL(window.location.href);
    url.searchParams.set("sort", currentSortBy);
    url.searchParams.set("order", currentSortOrder);
    console.log("Navigating to:", url.pathname + url.search);
    await goto(url.pathname + url.search);
    invalidate();
  }
  function getSortIcon(column) {
    if (currentSortBy === column) {
      if (currentSortOrder === "asc") {
        return Arrow_up;
      } else if (currentSortOrder === "desc") {
        return Arrow_down;
      }
    }
    return Chevrons_up_down;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="space-y-6"><div class="flex justify-between items-center"><div><h1 class="text-2xl font-bold">Bookings Management</h1> <p class="text-gray-500">Manage client reservations and consultations</p></div></div></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Total Bookings: ${escape_html(filteredBookings.length)}`;
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
              placeholder: "Search by client name, purpose, or status...",
              class: "pl-10",
              get value() {
                return searchQuery;
              },
              set value($$value) {
                searchQuery = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            Search($$payload4, {
              class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            });
            $$payload4.out += `<!----></div> `;
            Button($$payload4, {
              onclick: handleAddBookingClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Booking`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredBookings.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No bookings found</div>`;
            } else {
              $$payload4.out += "<!--[!-->";
              $$payload4.out += `<div class="border rounded-lg">`;
              Table($$payload4, {
                children: ($$payload5) => {
                  Table_header($$payload5, {
                    children: ($$payload6) => {
                      Table_row($$payload6, {
                        children: ($$payload7) => {
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("client_name"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Client <!---->`;
                              getSortIcon("client_name")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("purpose"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Purpose <!---->`;
                              getSortIcon("purpose")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("date"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Date <!---->`;
                              getSortIcon("date")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("time"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Time <!---->`;
                              getSortIcon("time")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2",
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Notes`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("status"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Status <!---->`;
                              getSortIcon("status")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("created_at"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Created At <!---->`;
                              getSortIcon("created_at")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 text-center",
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Actions`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Table_body($$payload5, {
                    children: ($$payload6) => {
                      const each_array = ensure_array_like(filteredBookings);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let booking = each_array[i];
                        Table_row($$payload6, {
                          class: `${stringify(i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white dark:bg-background")} `,
                          children: ($$payload7) => {
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                Badge($$payload8, {
                                  variant: "outline",
                                  class: "flex items-center gap-1",
                                  children: ($$payload9) => {
                                    User($$payload9, { class: "h-3 w-3" });
                                    $$payload9.out += `<!----> ${escape_html(booking.client_name)}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                Badge($$payload8, {
                                  variant: "outline",
                                  class: "flex items-center gap-1",
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->`;
                                    getPurposeIcon(booking.purpose)?.($$payload9, { class: "h-3 w-3" });
                                    $$payload9.out += `<!----> ${escape_html(getPurposeLabel(booking.purpose))}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(booking.date))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatTime(booking.time))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "max-w-xs truncate",
                              children: ($$payload8) => {
                                if (booking.notes) {
                                  $$payload8.out += "<!--[-->";
                                  $$payload8.out += `<!---->`;
                                  Provider($$payload8, {
                                    delayDuration: 100,
                                    children: ($$payload9) => {
                                      $$payload9.out += `<!---->`;
                                      Root$2($$payload9, {
                                        children: ($$payload10) => {
                                          $$payload10.out += `<!---->`;
                                          Tooltip_trigger($$payload10, {
                                            class: "truncate max-w-xs block",
                                            children: ($$payload11) => {
                                              $$payload11.out += `<!---->${escape_html(booking.notes)}`;
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$payload10.out += `<!----> <!---->`;
                                          Tooltip_content($$payload10, {
                                            children: ($$payload11) => {
                                              $$payload11.out += `<p>${escape_html(booking.notes)}</p>`;
                                            },
                                            $$slots: { default: true }
                                          });
                                          $$payload10.out += `<!---->`;
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$payload9.out += `<!---->`;
                                    }
                                  });
                                  $$payload8.out += `<!---->`;
                                } else {
                                  $$payload8.out += "<!--[!-->";
                                  $$payload8.out += `<span class="text-gray-400 italic">N/A</span>`;
                                }
                                $$payload8.out += `<!--]-->`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                Badge($$payload8, {
                                  variant: getStatusBadgeVariant(booking.status),
                                  class: "flex items-center gap-1",
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->`;
                                    getStatusIcon(booking.status)?.($$payload9, {
                                      class: getStatusIconColorClass(booking.status) + " h-3 w-3"
                                    });
                                    $$payload9.out += `<!----> ${escape_html(getStatusLabel(booking.status))}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "text-gray-500 text-sm",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(booking.created_at))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<div class="flex flex justify-center space-x-2">`;
                                Button($$payload8, {
                                  variant: "outline",
                                  size: "sm",
                                  onclick: () => startEdit(booking),
                                  children: ($$payload9) => {
                                    Square_pen($$payload9, {});
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!----> `;
                                Button($$payload8, {
                                  variant: "outline",
                                  size: "sm",
                                  onclick: () => openDeleteDialog(booking),
                                  children: ($$payload9) => {
                                    Trash_2($$payload9, { class: "h-4 w-4 text-red-500" });
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!----></div>`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----></div>`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Root($$payload2, {
      get open() {
        return showCreateForm;
      },
      set open($$value) {
        showCreateForm = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Portal($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Dialog_overlay($$payload4, {});
            $$payload4.out += `<!----> <!---->`;
            Dialog_content($$payload4, {
              class: "sm:max-w-[425px] p-6",
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Dialog_header($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Dialog_title($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Add New Booking`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the booking details below.`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <form method="POST" action="?/create"><div class="space-y-4 mt-6">`;
                if (error) {
                  $$payload5.out += "<!--[-->";
                  Alert($$payload5, {
                    variant: "destructive",
                    children: ($$payload6) => {
                      Alert_circle($$payload6, { class: "h-4 w-4" });
                      $$payload6.out += `<!----> `;
                      Alert_description($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->${escape_html(error)}`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "client_id_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Client *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$3($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return createClientId;
                  },
                  set value($$value) {
                    createClientId = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(data.clients.find((c) => c.id === createClientId)?.name || "Select client")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        const each_array_1 = ensure_array_like(data.clients);
                        $$payload7.out += `<!--[-->`;
                        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                          let client = each_array_1[$$index_1];
                          Select_item($$payload7, {
                            value: client.id,
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->${escape_html(client.name)}`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload7.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <input type="hidden" name="client_id"${attr("value", createClientId)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "purpose_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Purpose *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$3($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return createPurpose;
                  },
                  set value($$value) {
                    createPurpose = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(createPurpose || "Select purpose")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "reservation",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Reservation`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "consultation",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Consultation`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <input type="hidden" name="purpose"${attr("value", createPurpose)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "date_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Date *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "date_create",
                  name: "date",
                  type: "date",
                  required: true,
                  get value() {
                    return createDate;
                  },
                  set value($$value) {
                    createDate = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "time_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Time *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "time_create",
                  name: "time",
                  type: "time",
                  required: true,
                  get value() {
                    return createTime;
                  },
                  set value($$value) {
                    createTime = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "notes_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Notes`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "notes_create",
                  name: "notes",
                  type: "text",
                  maxlength: 255,
                  get value() {
                    return createNotes;
                  },
                  set value($$value) {
                    createNotes = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "status_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Status *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$3($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return createStatus;
                  },
                  set value($$value) {
                    createStatus = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(getStatusLabel(createStatus) || "Select status")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "pending",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Pending`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "confirmed",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Confirmed`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "completed",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Completed`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "cancelled",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Cancelled`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "no_show",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->No Show`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "expired",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Expired`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <input type="hidden" name="status"${attr("value", createStatus)}/></div> <div class="flex gap-2 pt-4">`;
                Button($$payload5, {
                  type: "submit",
                  class: "flex-1",
                  variant: "secondary",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Add Booking`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Button($$payload5, {
                  type: "button",
                  variant: "outline",
                  onclick: () => showCreateForm = false,
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cancel`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div></div></form>`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Root($$payload2, {
      get open() {
        return showEditForm;
      },
      set open($$value) {
        showEditForm = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Portal($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Dialog_overlay($$payload4, {});
            $$payload4.out += `<!----> <!---->`;
            Dialog_content($$payload4, {
              class: "sm:max-w-[425px] p-6",
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Dialog_header($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Dialog_title($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Edit Booking`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the booking details below.`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <form method="POST" action="?/update"><input type="hidden" name="id"${attr("value", editingId)}/> <div class="space-y-4 mt-6">`;
                if (error) {
                  $$payload5.out += "<!--[-->";
                  Alert($$payload5, {
                    variant: "destructive",
                    children: ($$payload6) => {
                      Alert_circle($$payload6, { class: "h-4 w-4" });
                      $$payload6.out += `<!----> `;
                      Alert_description($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->${escape_html(error)}`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "client_id_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Client *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$3($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return editingData.client_id;
                  },
                  set value($$value) {
                    editingData.client_id = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(data.clients.find((c) => c.id === editingData.client_id)?.name || "Select client")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        const each_array_2 = ensure_array_like(data.clients);
                        $$payload7.out += `<!--[-->`;
                        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                          let client = each_array_2[$$index_2];
                          Select_item($$payload7, {
                            value: client.id,
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->${escape_html(client.name)}`;
                            },
                            $$slots: { default: true }
                          });
                        }
                        $$payload7.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <input type="hidden" name="client_id"${attr("value", editingData.client_id)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "purpose_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Purpose *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$3($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return editingData.purpose;
                  },
                  set value($$value) {
                    editingData.purpose = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(editingData.purpose || "Select purpose")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "reservation",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Reservation`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "consultation",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Consultation`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <input type="hidden" name="purpose"${attr("value", editingData.purpose)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "date_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Date *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "date_edit",
                  name: "date",
                  type: "date",
                  required: true,
                  get value() {
                    return editingData.date;
                  },
                  set value($$value) {
                    editingData.date = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "time_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Time *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "time_edit",
                  name: "time",
                  type: "time",
                  required: true,
                  get value() {
                    return editingData.time;
                  },
                  set value($$value) {
                    editingData.time = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "notes_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Notes`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "notes_edit",
                  name: "notes",
                  type: "text",
                  maxlength: 255,
                  get value() {
                    return editingData.notes;
                  },
                  set value($$value) {
                    editingData.notes = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "status_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Status *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$3($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return editingData.status;
                  },
                  set value($$value) {
                    editingData.status = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(getStatusLabel(editingData.status || "") || "Select status")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "pending",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Pending`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "confirmed",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Confirmed`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "completed",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Completed`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "cancelled",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Cancelled`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "no_show",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->No Show`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "expired",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Expired`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <input type="hidden" name="status"${attr("value", editingData.status)}/></div> <div class="flex gap-2 pt-4">`;
                Button($$payload5, {
                  type: "submit",
                  class: "flex-1",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Save Changes`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Button($$payload5, {
                  type: "button",
                  variant: "outline",
                  onclick: cancelEdit,
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cancel`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div></div></form>`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Root$1($$payload2, {
      get open() {
        return showDeleteDialog;
      },
      set open($$value) {
        showDeleteDialog = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Portal$1($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Alert_dialog_overlay($$payload4, {});
            $$payload4.out += `<!----> <!---->`;
            Alert_dialog_content($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Alert_dialog_header($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Alert_dialog_title($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Delete Booking`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete the booking for "${escape_html(bookingToDelete?.client_name)}" on ${escape_html(formatDate(bookingToDelete?.date))} at ${escape_html(formatTime(bookingToDelete?.time))}? This action cannot be undone.`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Alert_dialog_footer($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", bookingToDelete?.id)}/> `;
                    Button($$payload6, {
                      type: "button",
                      variant: "outline",
                      onclick: () => showDeleteDialog = false,
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Cancel`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Button($$payload6, {
                      type: "submit",
                      variant: "destructive",
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Delete`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----></form>`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <div class="fixed inset-x-0 bottom-6 flex justify-center z-50 pointer-events-none">`;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
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
//# sourceMappingURL=_page.svelte-D3nvwZ7V.js.map
