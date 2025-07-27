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
  let feedItemToDelete = null;
  let createFeedStage = void 0;
  let editFeedStage = void 0;
  let createRequestedBy = void 0;
  let editRequestedBy = void 0;
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
  let filteredFeedItems = data.feedItems?.filter((item) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const matchesFeedName = item.feed_name.toLowerCase().includes(lowerCaseSearchQuery);
    const matchesFeedStage = item.feed_stage.toLowerCase().includes(lowerCaseSearchQuery);
    const matchesRequestedByName = item.requested_by_name && item.requested_by_name.toLowerCase().includes(lowerCaseSearchQuery);
    return matchesFeedName || matchesFeedStage || matchesRequestedByName;
  }) || [];
  function startEdit(item) {
    editingId = item.id;
    editingData = { ...item };
    ({ ...item });
    editFeedStage = item.feed_stage;
    editRequestedBy = item.requested_by;
    showEditForm = true;
  }
  function cancelEdit() {
    editingId = null;
    editingData = {};
    showEditForm = false;
  }
  function openDeleteDialog(item) {
    feedItemToDelete = item;
    showDeleteDialog = true;
  }
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  }
  function handleAddFeedItemClick() {
    showCreateForm = true;
    editingData = {};
    createFeedStage = void 0;
    createRequestedBy = void 0;
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
    $$payload2.out += `<div class="space-y-6"><div class="flex justify-between items-center"><div><h1 class="text-2xl font-bold">Feeds Inventory Management</h1> <p class="text-gray-500">Manage feed stock and consumption records</p></div></div></div>  `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Total Feeds: ${escape_html(filteredFeedItems.length)}`;
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
              placeholder: "Search by feed name, stage, or requested by...",
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
              onclick: handleAddFeedItemClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Feed Item`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredFeedItems.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No feed items found</div>`;
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
                            onclick: () => handleSort("feed_name"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Feed Name <!---->`;
                              getSortIcon("feed_name", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("feed_stage"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Feed Stage <!---->`;
                              getSortIcon("feed_stage", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("quantity_kg"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Quantity (kg) <!---->`;
                              getSortIcon("quantity_kg", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("cost_per_unit"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Cost per Unit <!---->`;
                              getSortIcon("cost_per_unit", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
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
                            onclick: () => handleSort("requested_by_name"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Requested By <!---->`;
                              getSortIcon("requested_by_name", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
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
                              getSortIcon("date", currentSortBy, currentSortOrder)?.($$payload8, { class: "h-4 w-4" });
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
                      const each_array = ensure_array_like(filteredFeedItems);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let item = each_array[i];
                        Table_row($$payload6, {
                          class: i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white dark:bg-background",
                          children: ($$payload7) => {
                            Table_cell($$payload7, {
                              class: "font-bold",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(item.feed_name)}`;
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
                                    $$payload9.out += `<!---->${escape_html(item.feed_stage)}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(item.current_stock_kg)} / ${escape_html(item.quantity_kg)} kg`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatCurrency(item.cost_per_unit))}`;
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
                              class: !item.requested_by_name ? "text-gray-400 italic" : "",
                              children: ($$payload8) => {
                                Badge($$payload8, {
                                  variant: "outline",
                                  class: "flex items-center gap-1",
                                  children: ($$payload9) => {
                                    User($$payload9, { class: "h-3 w-3" });
                                    $$payload9.out += `<!----> ${escape_html(item.requested_by_name || "N/A")}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(item.date))}`;
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
                        $$payload7.out += `<!---->Add New Feed Item`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the feed item's information below.`;
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
                  for: "feed_name_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feed Name *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "feed_name_create",
                  name: "feed_name",
                  required: true,
                  maxlength: 40,
                  get value() {
                    return editingData.feed_name;
                  },
                  set value($$value) {
                    editingData.feed_name = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "feed_stage_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feed Stage *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return createFeedStage;
                  },
                  set value($$value) {
                    createFeedStage = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(createFeedStage || "Select feed stage")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "Fry Booster",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Fry Booster`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "Pre Starter",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Pre Starter`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "Finisher",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Finisher`;
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
                $$payload5.out += `<!----> <input type="hidden" name="feed_stage"${attr("value", createFeedStage)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "current_kg_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Current Quantity (kg) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "current_kg_create",
                  name: "current_stock_kg",
                  type: "number",
                  step: "0.01",
                  max: 1e4,
                  min: 1,
                  get value() {
                    return editingData.current_stock_kg;
                  },
                  set value($$value) {
                    editingData.current_stock_kg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "quantity_kg_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Quantity (kg) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "quantity_kg_create",
                  name: "quantity_kg",
                  type: "number",
                  step: "0.01",
                  max: 1e4,
                  min: 1,
                  get value() {
                    return editingData.quantity_kg;
                  },
                  set value($$value) {
                    editingData.quantity_kg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "cost_per_unit_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cost per Unit *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "cost_per_unit_create",
                  name: "cost_per_unit",
                  type: "number",
                  step: "0.01",
                  max: 1e8,
                  min: 1,
                  required: true,
                  get value() {
                    return editingData.cost_per_unit;
                  },
                  set value($$value) {
                    editingData.cost_per_unit = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "requested_by_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Requested By`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
                  type: "single",
                  get value() {
                    return createRequestedBy;
                  },
                  set value($$value) {
                    createRequestedBy = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(data.employees.find((e) => e.id === createRequestedBy)?.name || "Select employee (Optional)")}</span>`;
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
                $$payload5.out += `<!----> <input type="hidden" name="requested_by"${attr("value", createRequestedBy)}/></div> <div class="space-y-2">`;
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
                    return editingData.date;
                  },
                  set value($$value) {
                    editingData.date = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="flex gap-2 pt-4">`;
                Button($$payload5, {
                  type: "submit",
                  class: "flex-1",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Add Feed Item`;
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
                        $$payload7.out += `<!---->Edit Feed Item`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the feed item's information below.`;
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
                  for: "feed_name_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feed Name *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "feed_name_edit",
                  name: "feed_name",
                  required: true,
                  maxlength: 40,
                  get value() {
                    return editingData.feed_name;
                  },
                  set value($$value) {
                    editingData.feed_name = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "feed_stage_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feed Stage *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return editFeedStage;
                  },
                  set value($$value) {
                    editFeedStage = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(editFeedStage || "Select feed stage")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "Fry Booster",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Fry Booster`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "Pre Starter",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Pre Starter`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "Finisher",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Finisher`;
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
                $$payload5.out += `<!----> <input type="hidden" name="feed_stage"${attr("value", editFeedStage)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "current_kg_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Current Quantity (kg) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "current_kg_edit",
                  name: "current_stock_kg",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.current_stock_kg;
                  },
                  set value($$value) {
                    editingData.current_stock_kg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "quantity_kg_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Quantity (kg) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "quantity_kg_edit",
                  name: "quantity_kg",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.quantity_kg;
                  },
                  set value($$value) {
                    editingData.quantity_kg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "cost_per_unit_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cost per Unit *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "cost_per_unit_edit",
                  name: "cost_per_unit",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.cost_per_unit;
                  },
                  set value($$value) {
                    editingData.cost_per_unit = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "requested_by_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Requested By`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
                  type: "single",
                  get value() {
                    return editRequestedBy;
                  },
                  set value($$value) {
                    editRequestedBy = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(data.employees.find((e) => e.id === editRequestedBy)?.name || "Select employee (Optional)")}</span>`;
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
                $$payload5.out += `<!----> <input type="hidden" name="requested_by"${attr("value", editRequestedBy)}/></div> <div class="space-y-2">`;
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
                        $$payload7.out += `<!---->Delete Feed Item`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete "${escape_html(feedItemToDelete?.feed_name)}"? This action cannot be undone.`;
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
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", feedItemToDelete?.id)}/> `;
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
//# sourceMappingURL=_page.svelte-B-tDNhKM.js.map
