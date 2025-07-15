import { q as push, P as copy_payload, Q as assign_payload, u as pop, F as escape_html, S as ensure_array_like, z as attr } from './index-C7g5K6pr.js';
import { g as goto, i as invalidate } from './client--FX0Csju.js';
import { B as Button } from './button-CTUnD44E.js';
import { I as Input } from './input-BZivlnJU.js';
import { C as Card, a as Card_header, c as Card_content, b as Card_title } from './card-title-2UI1-8SA.js';
import { L as Label } from './label-BggOrNn6.js';
import { A as Alert } from './alert-xT3Jgele.js';
import { R as Root, T as Table, b as Table_header, c as Table_row, d as Table_head, e as Table_body, f as Table_cell, S as Square_pen, P as Portal, D as Dialog_overlay, a as Dialog_content, g as Dialog_header, h as Dialog_title, i as Dialog_description, A as Alert_circle, j as Alert_description } from './index4-R95s3f3p.js';
import { B as Badge } from './badge-CyI62jER.js';
import { R as Root$1, P as Portal$1, A as Alert_dialog_overlay, a as Alert_dialog_content, b as Alert_dialog_header, c as Alert_dialog_title, d as Alert_dialog_description, e as Alert_dialog_footer } from './index6-BARiXcRc.js';
import { R as Root$2 } from './index3-CWUAYMpH.js';
import { S as Separator } from './separator-Dp6kZbL1.js';
import { A as Arrow_left } from './arrow-left-CYasb3Bg.js';
import { S as Search } from './search-B0fDvFmU.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-D8prpRXC.js';
import { F as Fish } from './fish-DoyYKSor.js';
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
  let reportToDelete = null;
  let createSpeciesName = "";
  let createReportDate = "";
  let createTotalHarvestWeightKg = null;
  let createTotalHarvestCount = null;
  let createAverageFishWeightG = null;
  let createMortalityCount = 0;
  let createFeedConsumedKg = null;
  let createNotes = "";
  let editingId = null;
  let editingData = {};
  let currentSortBy = data.sortBy || "report_date";
  let currentSortOrder = data.sortOrder || "desc";
  let filteredReports = data.reports?.filter((report) => report.species_name.toLowerCase().includes(searchQuery.toLowerCase()) || report.notes?.toLowerCase().includes(searchQuery.toLowerCase())) || [];
  function startEdit(report) {
    editingId = report.id;
    ({ ...report });
    editingData = { ...report };
    showEditForm = true;
  }
  function cancelEdit() {
    editingId = null;
    editingData = {};
    showEditForm = false;
  }
  function openDeleteDialog(report) {
    reportToDelete = report;
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
  function handleAddReportClick() {
    showCreateForm = true;
    createSpeciesName = "";
    createReportDate = "";
    createTotalHarvestWeightKg = null;
    createTotalHarvestCount = null;
    createAverageFishWeightG = null;
    createMortalityCount = 0;
    createFeedConsumedKg = null;
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
    invalidate(`app:production_reports:${data.pond.id}`);
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
      href: "/dashboard/ponds",
      class: "mb-2 -ml-4",
      children: ($$payload3) => {
        Arrow_left($$payload3, { class: "h-4 w-4 mr-2" });
        $$payload3.out += `<!----> Back to Ponds`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <h1 class="text-2xl font-bold">Production Reports for ${escape_html(data.pond.pond_number)}</h1> <p class="text-gray-500">Location: ${escape_html(data.pond.location || "N/A")} | Status: ${escape_html(data.pond.status)}</p></div></div></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Total Reports for ${escape_html(data.pond.pond_number)}: ${escape_html(filteredReports.length)}`;
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
              placeholder: "Search by species or notes...",
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
              onclick: handleAddReportClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Report`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredReports.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No production reports found for this pond.</div>`;
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
                            onclick: () => handleSort("report_date"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Report Date <!---->`;
                              getSortIcon("report_date")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("total_harvest_weight_kg"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Harvest (kg) <!---->`;
                              getSortIcon("total_harvest_weight_kg")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("total_harvest_count"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Harvest (count) <!---->`;
                              getSortIcon("total_harvest_count")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("average_fish_weight_g"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Avg. Weight (g) <!---->`;
                              getSortIcon("average_fish_weight_g")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("mortality_count"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Mortality <!---->`;
                              getSortIcon("mortality_count")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("feed_consumed_kg"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Feed Used (kg) <!---->`;
                              getSortIcon("feed_consumed_kg")?.($$payload8, { class: "h-4 w-4" });
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
                      const each_array = ensure_array_like(filteredReports);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let report = each_array[i];
                        Table_row($$payload6, {
                          class: i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white dark:bg-background",
                          children: ($$payload7) => {
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                Badge($$payload8, {
                                  variant: "outline",
                                  class: "flex items-center gap-1",
                                  children: ($$payload9) => {
                                    Fish($$payload9, { class: "h-3 w-3" });
                                    $$payload9.out += `<!----> ${escape_html(report.species_name)}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(report.report_date))}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(report.total_harvest_weight_kg !== null ? report.total_harvest_weight_kg + " kg" : "N/A")}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(report.total_harvest_count !== null ? report.total_harvest_count : "N/A")}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(report.average_fish_weight_g !== null ? report.average_fish_weight_g + " g" : "N/A")}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(report.mortality_count)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(report.feed_consumed_kg !== null ? report.feed_consumed_kg + " kg" : "N/A")}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "max-w-xs truncate",
                              children: ($$payload8) => {
                                if (report.notes) {
                                  $$payload8.out += "<!--[-->";
                                  $$payload8.out += `<!---->`;
                                  Root$2($$payload8, {
                                    children: ($$payload9) => {
                                      $$payload9.out += `<!---->`;
                                      Tooltip_trigger($$payload9, {
                                        class: "truncate max-w-xs block",
                                        children: ($$payload10) => {
                                          $$payload10.out += `<!---->${escape_html(report.notes)}`;
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$payload9.out += `<!----> <!---->`;
                                      Tooltip_content($$payload9, {
                                        children: ($$payload10) => {
                                          $$payload10.out += `<p>${escape_html(report.notes)}</p>`;
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
                              class: "text-gray-500 text-sm",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(report.created_at))}`;
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
                                  onclick: () => startEdit(report),
                                  children: ($$payload9) => {
                                    Square_pen($$payload9, {});
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!----> `;
                                Button($$payload8, {
                                  variant: "outline",
                                  size: "sm",
                                  onclick: () => openDeleteDialog(report),
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
                        $$payload7.out += `<!---->Add New Production Report`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the production report details below.`;
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
                  for: "report_date_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Report Date *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "report_date_create",
                  name: "report_date",
                  type: "date",
                  required: true,
                  get value() {
                    return createReportDate;
                  },
                  set value($$value) {
                    createReportDate = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "total_harvest_weight_kg_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Total Harvest Weight (kg)`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "total_harvest_weight_kg_create",
                  name: "total_harvest_weight_kg",
                  type: "number",
                  step: "0.01",
                  get value() {
                    return createTotalHarvestWeightKg;
                  },
                  set value($$value) {
                    createTotalHarvestWeightKg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "total_harvest_count_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Total Harvest Count`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "total_harvest_count_create",
                  name: "total_harvest_count",
                  type: "number",
                  step: "1",
                  get value() {
                    return createTotalHarvestCount;
                  },
                  set value($$value) {
                    createTotalHarvestCount = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "average_fish_weight_g_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Average Fish Weight (g)`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "average_fish_weight_g_create",
                  name: "average_fish_weight_g",
                  type: "number",
                  step: "0.01",
                  get value() {
                    return createAverageFishWeightG;
                  },
                  set value($$value) {
                    createAverageFishWeightG = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "mortality_count_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Mortality Count`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "mortality_count_create",
                  name: "mortality_count",
                  type: "number",
                  step: "1",
                  get value() {
                    return createMortalityCount;
                  },
                  set value($$value) {
                    createMortalityCount = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "feed_consumed_kg_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feed Consumed (kg)`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "feed_consumed_kg_create",
                  name: "feed_consumed_kg",
                  type: "number",
                  step: "0.01",
                  get value() {
                    return createFeedConsumedKg;
                  },
                  set value($$value) {
                    createFeedConsumedKg = $$value;
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
                    $$payload6.out += `<!---->Add Report`;
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
                        $$payload7.out += `<!---->Edit Production Report`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the production report details below.`;
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
                  for: "report_date_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Report Date *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "report_date_edit",
                  name: "report_date",
                  type: "date",
                  required: true,
                  get value() {
                    return editingData.report_date;
                  },
                  set value($$value) {
                    editingData.report_date = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "total_harvest_weight_kg_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Total Harvest Weight (kg)`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "total_harvest_weight_kg_edit",
                  name: "total_harvest_weight_kg",
                  type: "number",
                  step: "0.01",
                  get value() {
                    return editingData.total_harvest_weight_kg;
                  },
                  set value($$value) {
                    editingData.total_harvest_weight_kg = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "total_harvest_count_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Total Harvest Count`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "total_harvest_count_edit",
                  name: "total_harvest_count",
                  type: "number",
                  step: "1",
                  get value() {
                    return editingData.total_harvest_count;
                  },
                  set value($$value) {
                    editingData.total_harvest_count = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "average_fish_weight_g_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Average Fish Weight (g)`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "average_fish_weight_g_edit",
                  name: "average_fish_weight_g",
                  type: "number",
                  step: "0.01",
                  get value() {
                    return editingData.average_fish_weight_g;
                  },
                  set value($$value) {
                    editingData.average_fish_weight_g = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "mortality_count_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Mortality Count`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "mortality_count_edit",
                  name: "mortality_count",
                  type: "number",
                  step: "1",
                  get value() {
                    return editingData.mortality_count;
                  },
                  set value($$value) {
                    editingData.mortality_count = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "feed_consumed_kg_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Feed Consumed (kg)`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "feed_consumed_kg_edit",
                  name: "feed_consumed_kg",
                  type: "number",
                  step: "0.01",
                  get value() {
                    return editingData.feed_consumed_kg;
                  },
                  set value($$value) {
                    editingData.feed_consumed_kg = $$value;
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
                        $$payload7.out += `<!---->Delete Production Report`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete the report for "${escape_html(reportToDelete?.species_name)}" on ${escape_html(formatDate(reportToDelete?.report_date))}? This action cannot be undone.`;
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
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", reportToDelete?.id)}/> `;
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
//# sourceMappingURL=_page.svelte-DEbnuq0L.js.map
