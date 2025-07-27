import { q as push, T as copy_payload, U as assign_payload, u as pop, N as escape_html, A as ensure_array_like, z as attr } from './index-De8vQF1I.js';
import { g as goto, i as invalidate } from './client-BhPeql-r.js';
import { B as Button } from './button-BNxbTI-l.js';
import { I as Input } from './input-C9F7glNZ.js';
import { C as Card, a as Card_header, c as Card_content, b as Card_title } from './card-title-w0WvgVlQ.js';
import { L as Label } from './label-DHxoTVbD.js';
import { A as Alert } from './alert-BJiEFxI7.js';
import { R as Root, T as Table, b as Table_header, c as Table_row, d as Table_head, e as Table_body, f as Table_cell, S as Square_pen, P as Portal, D as Dialog_overlay, a as Dialog_content, g as Dialog_header, h as Dialog_title, i as Dialog_description, A as Alert_circle, j as Alert_description } from './index4-Bm79BWoC.js';
import { R as Root$2, S as Select_trigger, a as Select_content, b as Select_item } from './index5-C9xWMuUg.js';
import { B as Badge } from './badge-bTGkNV-T.js';
import { R as Root$1, P as Portal$1, A as Alert_dialog_overlay, a as Alert_dialog_content, b as Alert_dialog_header, c as Alert_dialog_title, d as Alert_dialog_description, e as Alert_dialog_footer } from './index6-Ck7H2Epb.js';
import { S as Separator } from './separator-BgdIaxnM.js';
import { S as Search } from './search-Bhp7za9e.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-IHt6qRQO.js';
import { U as User } from './user-u37ihTmq.js';
import { A as Arrow_up, a as Arrow_down } from './arrow-up-D6tSLWOK.js';
import './exports-DV9d4DRW.js';
import './utils-ClAJye8o.js';
import './attrs-BUrL1FBy.js';
import './create-id-VJ-xBm53.js';
import './Icon2-DDFPy3UW.js';
import './popper-layer-force-mount-CWCEeiL8.js';
import './open-change-complete-nsl5CQHK.js';
import './box-auto-reset.svelte-BHAyrkVe.js';
import './presence-layer-D9TE1rr0.js';
import './events-Cou-NJi3.js';
import './x-BqY7kI_B.js';
import './Icon3-XRLG_YcX.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let searchQuery = data.search || "";
  let error = null;
  let showCreateForm = false;
  let showEditForm = false;
  let showDeleteDialog = false;
  let hardwareItemToDelete = null;
  let createAssignedTo = void 0;
  let editAssignedTo = void 0;
  let editingId = null;
  let editingData = {};
  let currentSortBy = data.sortBy || "created_at";
  let currentSortOrder = data.sortOrder || "desc";
  function formatCurrency(value) {
    if (value === null || value === void 0) {
      return "₱0.00";
    }
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
  let filteredHardwareItems = data.hardwareItems?.filter((item) => item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) || item.assigned_to_name && item.assigned_to_name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
  function startEdit(item) {
    editingId = item.id;
    editingData = { ...item };
    ({ ...item });
    editAssignedTo = item.assigned_to;
    showEditForm = true;
  }
  function cancelEdit() {
    editingId = null;
    editingData = {};
    showEditForm = false;
  }
  function openDeleteDialog(item) {
    hardwareItemToDelete = item;
    showDeleteDialog = true;
  }
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  }
  function handleAddHardwareItemClick() {
    showCreateForm = true;
    editingData = {};
    createAssignedTo = void 0;
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
  function getSortIcon(column, sortBy, sortOrder) {
    if (sortBy === column) {
      if (sortOrder === "asc") {
        return Arrow_up;
      } else if (sortOrder === "desc") {
        return Arrow_down;
      }
    }
    return Chevrons_up_down;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="space-y-6"><div class="flex justify-between items-center"><div><h1 class="text-2xl font-bold">Hardware Inventory Management</h1> <p class="text-gray-500">Manage hardware stock and assignments</p></div></div></div>  `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Total Hardware: ${escape_html(filteredHardwareItems.length)}`;
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
              placeholder: "Search by item name or assigned employee...",
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
              onclick: handleAddHardwareItemClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Hardware Item`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredHardwareItems.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No hardware items found</div>`;
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
                            onclick: () => handleSort("item_name"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Item Name <!---->`;
                              getSortIcon("item_name", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("quantity"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Quantity <!---->`;
                              getSortIcon("quantity", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("cost"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Cost per Unit <!---->`;
                              getSortIcon("cost", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("total_cost"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Total Cost <!---->`;
                              getSortIcon("total_cost", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("assigned_to_name"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Assigned To <!---->`;
                              getSortIcon("assigned_to_name", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("date_requested"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Date Requested <!---->`;
                              getSortIcon("date_requested", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
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
                              getSortIcon("created_at", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
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
                      const each_array = ensure_array_like(filteredHardwareItems);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let item = each_array[i];
                        Table_row($$payload6, {
                          class: i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white dark:bg-background",
                          children: ($$payload7) => {
                            Table_cell($$payload7, {
                              class: "font-bold",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(item.item_name)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(item.quantity)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatCurrency(item.cost))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatCurrency(item.total_cost))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: !item.assigned_to_name ? "text-gray-400 italic" : "",
                              children: ($$payload8) => {
                                Badge($$payload8, {
                                  variant: "outline",
                                  class: "flex items-center gap-1",
                                  children: ($$payload9) => {
                                    User($$payload9, { class: "h-3 w-3" });
                                    $$payload9.out += `<!----> ${escape_html(item.assigned_to_name || "N/A")}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(item.date_requested))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "text-gray-500 text-sm",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(item.created_at))}`;
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
                                  onclick: () => startEdit(item),
                                  children: ($$payload9) => {
                                    Square_pen($$payload9, {});
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!----> `;
                                Button($$payload8, {
                                  variant: "outline",
                                  size: "sm",
                                  onclick: () => openDeleteDialog(item),
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
                        $$payload7.out += `<!---->Add New Hardware Item`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the hardware item's information below.`;
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
                  for: "item_name_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Item Name *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "item_name_create",
                  name: "item_name",
                  required: true,
                  maxlength: "40",
                  get value() {
                    return editingData.item_name;
                  },
                  set value($$value) {
                    editingData.item_name = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "quantity_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Quantity *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "quantity_create",
                  name: "quantity",
                  type: "number",
                  step: "1",
                  required: true,
                  get value() {
                    return editingData.quantity;
                  },
                  set value($$value) {
                    editingData.quantity = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "cost_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cost per Unit *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "cost_create",
                  name: "cost",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.cost;
                  },
                  set value($$value) {
                    editingData.cost = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "assigned_to_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Assigned To`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
                  type: "single",
                  get value() {
                    return createAssignedTo;
                  },
                  set value($$value) {
                    createAssignedTo = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(data.employees.find((e) => e.id === createAssignedTo)?.name || "Select employee (Optional)")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        const each_array_1 = ensure_array_like(data.employees);
                        Select_item($$payload7, {
                          value: null,
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->N/A (No Assignment)`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> <!--[-->`;
                        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                          let employee = each_array_1[$$index_1];
                          Select_item($$payload7, {
                            value: employee.id,
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->${escape_html(employee.name)}`;
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
                $$payload5.out += `<!----> <input type="hidden" name="assigned_to"${attr("value", createAssignedTo !== null && createAssignedTo !== void 0 ? createAssignedTo.toString() : "")}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "date_requested_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Date Requested *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "date_requested_create",
                  name: "date_requested",
                  type: "date",
                  required: true,
                  get value() {
                    return editingData.date_requested;
                  },
                  set value($$value) {
                    editingData.date_requested = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="flex gap-2 pt-4">`;
                Button($$payload5, {
                  type: "submit",
                  class: "flex-1",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Add Hardware Item`;
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
                        $$payload7.out += `<!---->Edit Hardware Item`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the hardware item's information below.`;
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
                  for: "item_name_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Item Name *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "item_name_edit",
                  name: "item_name",
                  required: true,
                  maxlength: "40",
                  get value() {
                    return editingData.item_name;
                  },
                  set value($$value) {
                    editingData.item_name = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "quantity_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Quantity *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "quantity_edit",
                  name: "quantity",
                  type: "number",
                  step: "1",
                  required: true,
                  get value() {
                    return editingData.quantity;
                  },
                  set value($$value) {
                    editingData.quantity = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "cost_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cost per Unit *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "cost_edit",
                  name: "cost",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.cost;
                  },
                  set value($$value) {
                    editingData.cost = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "assigned_to_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Assigned To`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
                  type: "single",
                  get value() {
                    return editAssignedTo;
                  },
                  set value($$value) {
                    editAssignedTo = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(data.employees.find((e) => e.id === editAssignedTo)?.name || "Select employee (Optional)")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        const each_array_2 = ensure_array_like(data.employees);
                        Select_item($$payload7, {
                          value: null,
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->N/A (No Assignment)`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> <!--[-->`;
                        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                          let employee = each_array_2[$$index_2];
                          Select_item($$payload7, {
                            value: employee.id,
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->${escape_html(employee.name)}`;
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
                $$payload5.out += `<!----> <input type="hidden" name="assigned_to"${attr("value", editAssignedTo !== null && editAssignedTo !== void 0 ? editAssignedTo.toString() : "")}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "date_requested_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Date Requested *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "date_requested_edit",
                  name: "date_requested",
                  type: "date",
                  required: true,
                  get value() {
                    return editingData.date_requested;
                  },
                  set value($$value) {
                    editingData.date_requested = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="flex gap-2 pt-4">`;
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
                        $$payload7.out += `<!---->Delete Hardware Item`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete "${escape_html(hardwareItemToDelete?.item_name)}"? This action cannot be undone.`;
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
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", hardwareItemToDelete?.id)}/> `;
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
//# sourceMappingURL=_page.svelte-DCK_OLdx.js.map
