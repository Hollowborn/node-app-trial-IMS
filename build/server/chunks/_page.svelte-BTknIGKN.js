import { q as push, P as copy_payload, Q as assign_payload, u as pop, F as escape_html, S as ensure_array_like, z as attr } from './index-C7g5K6pr.js';
import { g as goto, i as invalidate } from './client--FX0Csju.js';
import { B as Button } from './button-CTUnD44E.js';
import { I as Input } from './input-BZivlnJU.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-2UI1-8SA.js';
import { L as Label } from './label-BggOrNn6.js';
import { A as Alert } from './alert-xT3Jgele.js';
import { R as Root, T as Table, b as Table_header, c as Table_row, e as Table_body, P as Portal, D as Dialog_overlay, a as Dialog_content, g as Dialog_header, h as Dialog_title, i as Dialog_description, d as Table_head, f as Table_cell, S as Square_pen, A as Alert_circle, j as Alert_description } from './index4-R95s3f3p.js';
import { B as Badge } from './badge-CyI62jER.js';
import { R as Root$1, P as Portal$1, A as Alert_dialog_overlay, a as Alert_dialog_content, b as Alert_dialog_header, c as Alert_dialog_title, d as Alert_dialog_description, e as Alert_dialog_footer } from './index6-BARiXcRc.js';
import { R as Root$2, P as Provider } from './index3-CWUAYMpH.js';
import { S as Separator } from './separator-Dp6kZbL1.js';
import { A as Arrow_left } from './arrow-left-CYasb3Bg.js';
import { S as Search } from './search-B0fDvFmU.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-D8prpRXC.js';
import { F as Fish } from './fish-DoyYKSor.js';
import { T as Tooltip_trigger, a as Tooltip_content } from './tooltip-content-KOo-haMz.js';
import { C as Clipboard_list } from './clipboard-list-Golqt3lc.js';
import { D as Dollar_sign } from './dollar-sign-CDdfvTN_.js';
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
  let stockingToDelete = null;
  let createStockingDate = "";
  let createSpeciesName = "";
  let createFingerlingsStockedCountMa = null;
  let createFishSizeRange = "";
  let createCost = null;
  let createEstimatedMortalityRatePercent = null;
  let createNotes = "";
  let editingId = null;
  let editingData = {};
  let currentSortBy = data.sortBy || "stocking_date";
  let currentSortOrder = data.sortOrder || "desc";
  let filteredStockingRecords = data.stockingInfoRecords?.filter((record) => record.species_name.toLowerCase().includes(searchQuery.toLowerCase()) || record.fish_size_range.toLowerCase().includes(searchQuery.toLowerCase()) || record.notes?.toLowerCase().includes(searchQuery.toLowerCase())) || [];
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
    stockingToDelete = record;
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
  function handleAddStockingClick() {
    showCreateForm = true;
    createStockingDate = "";
    createSpeciesName = "";
    createFingerlingsStockedCountMa = null;
    createFishSizeRange = "";
    createCost = null;
    createEstimatedMortalityRatePercent = null;
    createNotes = "";
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
    invalidate(`app:stocking_info:${data.client.id}`);
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
      href: "/dashboard/clients",
      class: "mb-2 -ml-4",
      children: ($$payload3) => {
        Arrow_left($$payload3, { class: "h-4 w-4 mr-2" });
        $$payload3.out += `<!----> Back to Clients`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <h1 class="text-2xl font-bold">Stocking Information for ${escape_html(data.client.name)}</h1> <p class="text-gray-500">Operator Type: ${escape_html(data.client.operator_type)} | Address: ${escape_html(data.client.address)}</p></div></div></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Total Stocking Records for ${escape_html(data.client.name)}: ${escape_html(filteredStockingRecords.length)}`;
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
              placeholder: "Search by species, size range, or notes...",
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
              onclick: handleAddStockingClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Stocking`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredStockingRecords.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No stocking records found for this client.</div>`;
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
                            onclick: () => handleSort("stocking_date"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Stocking Date <!---->`;
                              getSortIcon("stocking_date")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("species_name"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Species <!---->`;
                              getSortIcon("species_name")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("fingerlings_stocked_count_ma"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Fingerlings Stocked <!---->`;
                              getSortIcon("fingerlings_stocked_count_ma")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2",
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Fish Size Range`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("cost"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Cost <!---->`;
                              getSortIcon("cost")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2",
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Est. Mortality (%)`;
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
                      const each_array = ensure_array_like(filteredStockingRecords);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let record = each_array[i];
                        Table_row($$payload6, {
                          class: i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white dark:bg-background",
                          children: ($$payload7) => {
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(record.stocking_date))}`;
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
                                    Fish($$payload9, { class: "h-3 w-3" });
                                    $$payload9.out += `<!----> ${escape_html(record.species_name)}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(record.fingerlings_stocked_count_ma)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(record.fish_size_range)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->₱${escape_html(record.cost.toFixed(2))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(record.estimated_mortality_rate_percent !== null ? record.estimated_mortality_rate_percent + "%" : "N/A")}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "max-w-xs truncate",
                              children: ($$payload8) => {
                                if (record.notes) {
                                  $$payload8.out += "<!--[-->";
                                  $$payload8.out += `<!---->`;
                                  Root$2($$payload8, {
                                    children: ($$payload9) => {
                                      $$payload9.out += `<!---->`;
                                      Tooltip_trigger($$payload9, {
                                        class: "truncate max-w-xs block",
                                        children: ($$payload10) => {
                                          $$payload10.out += `<!---->${escape_html(record.notes)}`;
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$payload9.out += `<!----> <!---->`;
                                      Tooltip_content($$payload9, {
                                        children: ($$payload10) => {
                                          $$payload10.out += `<p>${escape_html(record.notes)}</p>`;
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
                                $$payload8.out += `<div class="flex flex justify-center space-x-2"><!---->`;
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
                                            Button($$payload11, {
                                              variant: "outline",
                                              size: "sm",
                                              href: `/dashboard/clients/${record.client_id}/stocking-info/${record.id}/harvest-info`,
                                              title: "View Harvest Info",
                                              children: ($$payload12) => {
                                                Clipboard_list($$payload12, { class: "h-4 w-4" });
                                              },
                                              $$slots: { default: true }
                                            });
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$payload10.out += `<!----> <!---->`;
                                        Tooltip_content($$payload10, {
                                          children: ($$payload11) => {
                                            $$payload11.out += `<p>View Harvest Info</p>`;
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$payload10.out += `<!---->`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload9.out += `<!----> <!---->`;
                                    Root$2($$payload9, {
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->`;
                                        Tooltip_trigger($$payload10, {
                                          class: "truncate max-w-xs block",
                                          children: ($$payload11) => {
                                            Button($$payload11, {
                                              variant: "outline",
                                              size: "sm",
                                              href: `/dashboard/clients/${record.client_id}/stocking-info/${record.id}/sales`,
                                              title: "View Sales Info",
                                              children: ($$payload12) => {
                                                Dollar_sign($$payload12, { class: "h-4 w-4" });
                                              },
                                              $$slots: { default: true }
                                            });
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$payload10.out += `<!----> <!---->`;
                                        Tooltip_content($$payload10, {
                                          children: ($$payload11) => {
                                            $$payload11.out += `<p>View Sales Info</p>`;
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
                                $$payload8.out += `<!----> `;
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
                        $$payload7.out += `<!---->Add New Stocking Information`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the stocking details below for ${escape_html(data.client.name)}.`;
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
                  for: "stocking_date_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Stocking Date *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "stocking_date_create",
                  name: "stocking_date",
                  type: "date",
                  required: true,
                  get value() {
                    return createStockingDate;
                  },
                  set value($$value) {
                    createStockingDate = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "species_name_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Species Name *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "species_name_create",
                  name: "species_name",
                  type: "text",
                  required: true,
                  maxlength: 50,
                  get value() {
                    return createSpeciesName;
                  },
                  set value($$value) {
                    createSpeciesName = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "fingerlings_stocked_count_ma_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Fingerlings Stocked (Actual Count) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "fingerlings_stocked_count_ma_create",
                  name: "fingerlings_stocked_count_ma",
                  type: "number",
                  step: "1",
                  required: true,
                  get value() {
                    return createFingerlingsStockedCountMa;
                  },
                  set value($$value) {
                    createFingerlingsStockedCountMa = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "fish_size_range_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Fish Size Range (e.g., "1-2 cm", "5-10g") *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "fish_size_range_create",
                  name: "fish_size_range",
                  type: "text",
                  required: true,
                  maxlength: 50,
                  get value() {
                    return createFishSizeRange;
                  },
                  set value($$value) {
                    createFishSizeRange = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "cost_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cost (₱) *`;
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
                    return createCost;
                  },
                  set value($$value) {
                    createCost = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "estimated_mortality_rate_percent_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Estimated Mortality Rate (%)`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "estimated_mortality_rate_percent_create",
                  name: "estimated_mortality_rate_percent",
                  type: "number",
                  step: "0.01",
                  min: "0",
                  max: "100",
                  get value() {
                    return createEstimatedMortalityRatePercent;
                  },
                  set value($$value) {
                    createEstimatedMortalityRatePercent = $$value;
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
                $$payload5.out += `<!----></div> <div class="flex gap-2 pt-4">`;
                Button($$payload5, {
                  type: "submit",
                  class: "flex-1",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Add Stocking`;
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
                        $$payload7.out += `<!---->Edit Stocking Information`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the stocking details below for ${escape_html(data.client.name)}.`;
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
                  for: "stocking_date_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Stocking Date *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "stocking_date_edit",
                  name: "stocking_date",
                  type: "date",
                  required: true,
                  get value() {
                    return editingData.stocking_date;
                  },
                  set value($$value) {
                    editingData.stocking_date = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "species_name_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Species Name *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "species_name_edit",
                  name: "species_name",
                  type: "text",
                  required: true,
                  maxlength: 50,
                  get value() {
                    return editingData.species_name;
                  },
                  set value($$value) {
                    editingData.species_name = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "fingerlings_stocked_count_ma_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Fingerlings Stocked (Actual Count) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "fingerlings_stocked_count_ma_edit",
                  name: "fingerlings_stocked_count_ma",
                  type: "number",
                  step: "1",
                  required: true,
                  get value() {
                    return editingData.fingerlings_stocked_count_ma;
                  },
                  set value($$value) {
                    editingData.fingerlings_stocked_count_ma = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "fish_size_range_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Fish Size Range (e.g., "1-2 cm", "5-10g") *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "fish_size_range_edit",
                  name: "fish_size_range",
                  type: "text",
                  required: true,
                  maxlength: 50,
                  get value() {
                    return editingData.fish_size_range;
                  },
                  set value($$value) {
                    editingData.fish_size_range = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "cost_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Cost (₱) *`;
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
                  for: "estimated_mortality_rate_percent_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Estimated Mortality Rate (%)`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "estimated_mortality_rate_percent_edit",
                  name: "estimated_mortality_rate_percent",
                  type: "number",
                  step: "0.01",
                  min: "0",
                  max: "100",
                  get value() {
                    return editingData.estimated_mortality_rate_percent;
                  },
                  set value($$value) {
                    editingData.estimated_mortality_rate_percent = $$value;
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
                        $$payload7.out += `<!---->Delete Stocking Information`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete the stocking record for "${escape_html(stockingToDelete?.species_name)}" on ${escape_html(formatDate(stockingToDelete?.stocking_date))}? This will also delete all associated harvest records. This action cannot be undone.`;
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
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", stockingToDelete?.id)}/> `;
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
//# sourceMappingURL=_page.svelte-BTknIGKN.js.map
