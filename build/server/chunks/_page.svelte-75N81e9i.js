import { q as push, P as copy_payload, Q as assign_payload, u as pop, F as escape_html, S as ensure_array_like, z as attr } from './index-C7g5K6pr.js';
import { g as goto, i as invalidate } from './client--FX0Csju.js';
import { B as Button } from './button-CTUnD44E.js';
import { I as Input } from './input-BZivlnJU.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-2UI1-8SA.js';
import { L as Label } from './label-BggOrNn6.js';
import { A as Alert } from './alert-xT3Jgele.js';
import { R as Root, T as Table, b as Table_header, c as Table_row, d as Table_head, e as Table_body, f as Table_cell, S as Square_pen, P as Portal, D as Dialog_overlay, a as Dialog_content, g as Dialog_header, h as Dialog_title, i as Dialog_description, A as Alert_circle, j as Alert_description } from './index4-R95s3f3p.js';
import './badge-CyI62jER.js';
import { R as Root$1, P as Portal$1, A as Alert_dialog_overlay, a as Alert_dialog_content, b as Alert_dialog_header, c as Alert_dialog_title, d as Alert_dialog_description, e as Alert_dialog_footer } from './index6-BARiXcRc.js';
import { R as Root$2 } from './index3-CWUAYMpH.js';
import { S as Separator } from './separator-Dp6kZbL1.js';
import { A as Arrow_left } from './arrow-left-CYasb3Bg.js';
import { S as Search } from './search-B0fDvFmU.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-D8prpRXC.js';
import { T as Tooltip_trigger, a as Tooltip_content } from './tooltip-content-KOo-haMz.js';
import { A as Arrow_up, a as Arrow_down } from './arrow-up-CsewfvOZ.js';
import './exports-C8zAyQJJ.js';
import './utils-CgnlkBsb.js';
import './attrs-CWQZy0Ma.js';
import './create-id-DFnkhZAm.js';
import './Icon2-NvMOmgSA.js';
import './popper-layer-force-mount-CN4ObkAy.js';
import './open-change-complete-BEHPw3Wp.js';
import './box-auto-reset.svelte-BjGOx143.js';
import './presence-layer-B_7GDLHC.js';
import './events-zWHOGqsb.js';
import './x-BoU3PBvV.js';
import './Icon3-UwsVBuas.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let searchQuery = data.search || "";
  let error = null;
  let showCreateForm = false;
  let showEditForm = false;
  let showDeleteDialog = false;
  let salesToDelete = null;
  let createEstimatedSales = null;
  let createProjectedAmount = null;
  let createFeedsUsedKg = null;
  let createFeedCost = null;
  let createRemarks = "";
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
  let filteredSalesRecords = data.salesRecords?.filter((record) => record.remarks?.toLowerCase().includes(searchQuery.toLowerCase())) || // Add more search fields if needed
  [];
  function startEdit(record) {
    editingId = record.id;
    ({ ...record });
    editingData = { ...record };
    showEditForm = true;
  }
  function cancelEdit() {
    editingId = null;
    editingData = {};
    showEditForm = false;
  }
  function openDeleteDialog(record) {
    salesToDelete = record;
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
  function handleAddSalesClick() {
    showCreateForm = true;
    createEstimatedSales = null;
    createProjectedAmount = null;
    createFeedsUsedKg = null;
    createFeedCost = null;
    createRemarks = "";
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
    invalidate(`app:sales:${data.stocking.id}`);
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
    $$payload2.out += `<div class="space-y-6"><div class="flex justify-between items-center"><div>`;
    Button($$payload2, {
      variant: "ghost",
      href: `/dashboard/clients/${data.client.id}/stocking-info`,
      class: "mb-2 -ml-4",
      children: ($$payload3) => {
        Arrow_left($$payload3, { class: "h-4 w-4 mr-2" });
        $$payload3.out += `<!----> Back to Stocking Info`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <h1 class="text-2xl font-bold">Sales Records for ${escape_html(data.client.name)} - Stocking on ${escape_html(data.stocking ? formatDate(data.stocking.stocking_date) : "N/A")} (${escape_html(data.stocking ? data.stocking.species_name : "N/A")})</h1> <p class="text-gray-500">Stocking ID: ${escape_html(data.stocking ? data.stocking.id : "N/A")} | Fingerlings Stocked: ${escape_html(data.stocking ? data.stocking.fingerlings_stocked_count_ma : "N/A")}</p></div></div></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Total Sales Records: ${escape_html(filteredSalesRecords.length)}`;
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
              placeholder: "Search by remarks...",
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
              onclick: handleAddSalesClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Sales Record`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredSalesRecords.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No sales records found for this stocking event.</div>`;
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
                            onclick: () => handleSort("estimated_sales"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Estimated Sales (₱) <!---->`;
                              getSortIcon("estimated_sales")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("projected_amount"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Projected Amount (₱) <!---->`;
                              getSortIcon("projected_amount")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("feeds_used_kg"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Feeds Used (kg) <!---->`;
                              getSortIcon("feeds_used_kg")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("feed_cost"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Feed Cost (₱) <!---->`;
                              getSortIcon("feed_cost")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2",
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Remarks`;
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
                      const each_array = ensure_array_like(filteredSalesRecords);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let record = each_array[i];
                        Table_row($$payload6, {
                          class: i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white dark:bg-background",
                          children: ($$payload7) => {
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatCurrency(record.estimated_sales))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatCurrency(record.projected_amount))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(record.feeds_used_kg)} kg`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatCurrency(record.feed_cost))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "max-w-xs truncate",
                              children: ($$payload8) => {
                                if (record.remarks) {
                                  $$payload8.out += "<!--[-->";
                                  $$payload8.out += `<!---->`;
                                  Root$2($$payload8, {
                                    children: ($$payload9) => {
                                      $$payload9.out += `<!---->`;
                                      Tooltip_trigger($$payload9, {
                                        class: "truncate max-w-xs block",
                                        children: ($$payload10) => {
                                          $$payload10.out += `<!---->${escape_html(record.remarks)}`;
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$payload9.out += `<!----> <!---->`;
                                      Tooltip_content($$payload9, {
                                        children: ($$payload10) => {
                                          $$payload10.out += `<p>${escape_html(record.remarks)}</p>`;
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$payload9.out += `<!---->`;
                                    },
                                    $$slots: { default: true }
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
                                $$payload8.out += `<div class="flex flex justify-center space-x-2">`;
                                Button($$payload8, {
                                  variant: "outline",
                                  size: "sm",
                                  onclick: () => startEdit(record),
                                  children: ($$payload9) => {
                                    Square_pen($$payload9, {});
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!----> `;
                                Button($$payload8, {
                                  variant: "outline",
                                  size: "sm",
                                  onclick: () => openDeleteDialog(record),
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
                        $$payload7.out += `<!---->Add New Sales Record`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the sales details below.`;
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
                  for: "estimated_sales_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Estimated Sales (₱) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "estimated_sales_create",
                  name: "estimated_sales",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return createEstimatedSales;
                  },
                  set value($$value) {
                    createEstimatedSales = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "projected_amount_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Projected Amount (₱) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "projected_amount_create",
                  name: "projected_amount",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return createProjectedAmount;
                  },
                  set value($$value) {
                    createProjectedAmount = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "feeds_used_kg_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feeds Used (kg) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "feeds_used_kg_create",
                  name: "feeds_used_kg",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return createFeedsUsedKg;
                  },
                  set value($$value) {
                    createFeedsUsedKg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "feed_cost_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feed Cost (₱) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "feed_cost_create",
                  name: "feed_cost",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return createFeedCost;
                  },
                  set value($$value) {
                    createFeedCost = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "remarks_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Remarks`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "remarks_create",
                  name: "remarks",
                  type: "text",
                  maxlength: 255,
                  get value() {
                    return createRemarks;
                  },
                  set value($$value) {
                    createRemarks = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="flex gap-2 pt-4">`;
                Button($$payload5, {
                  type: "submit",
                  class: "flex-1",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Add Sales Record`;
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
                        $$payload7.out += `<!---->Edit Sales Record`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the sales details below.`;
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
                  for: "estimated_sales_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Estimated Sales (₱) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "estimated_sales_edit",
                  name: "estimated_sales",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.estimated_sales;
                  },
                  set value($$value) {
                    editingData.estimated_sales = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "projected_amount_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Projected Amount (₱) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "projected_amount_edit",
                  name: "projected_amount",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.projected_amount;
                  },
                  set value($$value) {
                    editingData.projected_amount = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "feeds_used_kg_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feeds Used (kg) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "feeds_used_kg_edit",
                  name: "feeds_used_kg",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.feeds_used_kg;
                  },
                  set value($$value) {
                    editingData.feeds_used_kg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "feed_cost_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feed Cost (₱) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "feed_cost_edit",
                  name: "feed_cost",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.feed_cost;
                  },
                  set value($$value) {
                    editingData.feed_cost = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "remarks_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Remarks`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "remarks_edit",
                  name: "remarks",
                  type: "text",
                  maxlength: 255,
                  get value() {
                    return editingData.remarks;
                  },
                  set value($$value) {
                    editingData.remarks = $$value;
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
                        $$payload7.out += `<!---->Delete Sales Record`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete this sales record (Estimated Sales: ${escape_html(formatCurrency(salesToDelete?.estimated_sales))})? This action cannot be undone.`;
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
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", salesToDelete?.id)}/> `;
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
//# sourceMappingURL=_page.svelte-75N81e9i.js.map
