import { q as push, T as copy_payload, U as assign_payload, u as pop, N as escape_html, A as ensure_array_like, z as attr } from './index-De8vQF1I.js';
import { g as goto, i as invalidate } from './client-BhPeql-r.js';
import { B as Button } from './button-BNxbTI-l.js';
import { I as Input } from './input-C9F7glNZ.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-w0WvgVlQ.js';
import { L as Label } from './label-DHxoTVbD.js';
import { A as Alert } from './alert-BJiEFxI7.js';
import { R as Root, T as Table, b as Table_header, c as Table_row, d as Table_head, e as Table_body, f as Table_cell, P as Portal, D as Dialog_overlay, a as Dialog_content, g as Dialog_header, h as Dialog_title, i as Dialog_description, S as Square_pen, A as Alert_circle, j as Alert_description } from './index4-Bm79BWoC.js';
import './badge-bTGkNV-T.js';
import { R as Root$1, P as Portal$1, A as Alert_dialog_overlay, a as Alert_dialog_content, b as Alert_dialog_header, c as Alert_dialog_title, d as Alert_dialog_description, e as Alert_dialog_footer } from './index6-Ck7H2Epb.js';
import { R as Root$2 } from './index3-B7hh8Fwf.js';
import { S as Separator } from './separator-BgdIaxnM.js';
import { A as Arrow_left } from './arrow-left-Cea-Jn1z.js';
import { S as Search } from './search-Bhp7za9e.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-IHt6qRQO.js';
import { T as Tooltip_trigger, a as Tooltip_content } from './tooltip-content-CejHdlvl.js';
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
  let harvestToDelete = null;
  let createHarvestDate = "";
  let createActualBodyWeightG = null;
  let createCultureDays = null;
  let createHarvestVolumeKg = null;
  let createPricePerKg = null;
  let createNotes = "";
  let editingId = null;
  let editingData = {};
  let currentSortBy = data.sortBy || "harvest_date";
  let currentSortOrder = data.sortOrder || "desc";
  let filteredHarvestRecords = data.harvestRecords?.filter((record) => record.notes?.toLowerCase().includes(searchQuery.toLowerCase()) || record.harvest_date.toLowerCase().includes(searchQuery.toLowerCase())) || [];
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
    harvestToDelete = record;
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
  function handleAddHarvestClick() {
    showCreateForm = true;
    createHarvestDate = "";
    createActualBodyWeightG = null;
    createCultureDays = null;
    createHarvestVolumeKg = null;
    createPricePerKg = null;
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
    invalidate(`app:harvest_info:${data.stocking.id}`);
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
    $$payload2.out += `<!----> <h1 class="text-2xl font-bold">Harvest Records for ${escape_html(data.client.name)} - Stocking on ${escape_html(formatDate(data.stocking.stocking_date))} (${escape_html(data.stocking.species_name)})</h1> <p class="text-gray-500">Stocking ID: ${escape_html(data.stocking.id)} | Fingerlings Stocked: ${escape_html(data.stocking.fingerlings_stocked_count_ma)}</p></div></div></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Total Harvest Records: ${escape_html(filteredHarvestRecords.length)}`;
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
              placeholder: "Search by notes or harvest date...",
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
              onclick: handleAddHarvestClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Harvest`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredHarvestRecords.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No harvest records found for this stocking event.</div>`;
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
                            onclick: () => handleSort("harvest_date"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Harvest Date <!---->`;
                              getSortIcon("harvest_date")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("actual_body_weight_g"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Avg. Body Weight (g) <!---->`;
                              getSortIcon("actual_body_weight_g")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("culture_days"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Culture Days <!---->`;
                              getSortIcon("culture_days")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("harvest_volume_kg"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Harvest Volume (kg) <!---->`;
                              getSortIcon("harvest_volume_kg")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("price_per_kg"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Price per Kg (₱) <!---->`;
                              getSortIcon("price_per_kg")?.($$payload8, { class: "h-4 w-4" });
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
                      const each_array = ensure_array_like(filteredHarvestRecords);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let record = each_array[i];
                        Table_row($$payload6, {
                          class: i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white dark:bg-background",
                          children: ($$payload7) => {
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(record.harvest_date))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(record.actual_body_weight_g)} g`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(record.culture_days)} days`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(record.harvest_volume_kg)} kg`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->₱${escape_html(record.price_per_kg.toFixed(2))}`;
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
                        $$payload7.out += `<!---->Add New Harvest Record`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the harvest details below.`;
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
                  for: "harvest_date_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Harvest Date *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "harvest_date_create",
                  name: "harvest_date",
                  type: "date",
                  required: true,
                  get value() {
                    return createHarvestDate;
                  },
                  set value($$value) {
                    createHarvestDate = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "actual_body_weight_g_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Average Body Weight (g) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "actual_body_weight_g_create",
                  name: "actual_body_weight_g",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return createActualBodyWeightG;
                  },
                  set value($$value) {
                    createActualBodyWeightG = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "culture_days_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Culture Days *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "culture_days_create",
                  name: "culture_days",
                  type: "number",
                  step: "1",
                  required: true,
                  get value() {
                    return createCultureDays;
                  },
                  set value($$value) {
                    createCultureDays = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "harvest_volume_kg_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Harvest Volume (kg) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "harvest_volume_kg_create",
                  name: "harvest_volume_kg",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return createHarvestVolumeKg;
                  },
                  set value($$value) {
                    createHarvestVolumeKg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "price_per_kg_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Price per Kg (₱) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "price_per_kg_create",
                  name: "price_per_kg",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return createPricePerKg;
                  },
                  set value($$value) {
                    createPricePerKg = $$value;
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
                    $$payload6.out += `<!---->Add Harvest`;
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
                        $$payload7.out += `<!---->Edit Harvest Record`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the harvest details below.`;
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
                  for: "harvest_date_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Harvest Date *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "harvest_date_edit",
                  name: "harvest_date",
                  type: "date",
                  required: true,
                  get value() {
                    return editingData.harvest_date;
                  },
                  set value($$value) {
                    editingData.harvest_date = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "actual_body_weight_g_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Average Body Weight (g) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "actual_body_weight_g_edit",
                  name: "actual_body_weight_g",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.actual_body_weight_g;
                  },
                  set value($$value) {
                    editingData.actual_body_weight_g = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "culture_days_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Culture Days *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "culture_days_edit",
                  name: "culture_days",
                  type: "number",
                  step: "1",
                  required: true,
                  get value() {
                    return editingData.culture_days;
                  },
                  set value($$value) {
                    editingData.culture_days = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "harvest_volume_kg_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Harvest Volume (kg) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "harvest_volume_kg_edit",
                  name: "harvest_volume_kg",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.harvest_volume_kg;
                  },
                  set value($$value) {
                    editingData.harvest_volume_kg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "price_per_kg_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Price per Kg (₱) *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "price_per_kg_edit",
                  name: "price_per_kg",
                  type: "number",
                  step: "0.01",
                  required: true,
                  get value() {
                    return editingData.price_per_kg;
                  },
                  set value($$value) {
                    editingData.price_per_kg = $$value;
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
                        $$payload7.out += `<!---->Delete Harvest Record`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete the harvest record for ${escape_html(formatDate(harvestToDelete?.harvest_date))}? This action cannot be undone.`;
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
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", harvestToDelete?.id)}/> `;
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
//# sourceMappingURL=_page.svelte-Is4fwD1y.js.map
