import { q as push, T as copy_payload, U as assign_payload, u as pop, N as escape_html, A as ensure_array_like, O as stringify, z as attr, V as sanitize_props, M as spread_props, Q as slot } from './index-De8vQF1I.js';
import { g as goto, i as invalidate } from './client-BhPeql-r.js';
import { B as Button } from './button-BNxbTI-l.js';
import { I as Input } from './input-C9F7glNZ.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-w0WvgVlQ.js';
import { L as Label } from './label-DHxoTVbD.js';
import { A as Alert } from './alert-BJiEFxI7.js';
import { R as Root, T as Table, b as Table_header, c as Table_row, d as Table_head, e as Table_body, f as Table_cell, S as Square_pen, P as Portal, D as Dialog_overlay, a as Dialog_content, g as Dialog_header, h as Dialog_title, i as Dialog_description, A as Alert_circle, j as Alert_description } from './index4-Bm79BWoC.js';
import { R as Root$3, S as Select_trigger, a as Select_content, b as Select_item } from './index5-C9xWMuUg.js';
import { B as Badge } from './badge-bTGkNV-T.js';
import { R as Root$1, P as Portal$1, A as Alert_dialog_overlay, a as Alert_dialog_content, b as Alert_dialog_header, c as Alert_dialog_title, d as Alert_dialog_description, e as Alert_dialog_footer } from './index6-Ck7H2Epb.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-CpMJPUdY.js';
import { R as Root$2 } from './index3-B7hh8Fwf.js';
import { I as Icon$1 } from './Icon-riXVCxKD.js';
import { S as Search } from './search-Bhp7za9e.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-IHt6qRQO.js';
import { B as Briefcase } from './briefcase-Cuc9lEll.js';
import { T as Tooltip_trigger, a as Tooltip_content } from './tooltip-content-CejHdlvl.js';
import { A as Arrow_up, a as Arrow_down } from './arrow-up-D6tSLWOK.js';
import { U as User } from './user-u37ihTmq.js';
import { I as Icon } from './Icon2-DDFPy3UW.js';
import { X as X_circle } from './x-circle-CZfVfbDi.js';
import './exports-DV9d4DRW.js';
import './utils-ClAJye8o.js';
import './attrs-BUrL1FBy.js';
import './create-id-VJ-xBm53.js';
import './popper-layer-force-mount-CWCEeiL8.js';
import './open-change-complete-nsl5CQHK.js';
import './box-auto-reset.svelte-BHAyrkVe.js';
import './presence-layer-D9TE1rr0.js';
import './events-Cou-NJi3.js';
import './x-BqY7kI_B.js';
import './Icon3-XRLG_YcX.js';

function Circle_dot($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "10" }
    ],
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "1" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "circle-dot" },
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
function Gender_male($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"
      }
    ],
    ["path", { "d": "M19 5l-5.4 5.4" }],
    ["path", { "d": "M19 5h-5" }],
    ["path", { "d": "M19 5v5" }]
  ];
  Icon$1($$payload, spread_props([
    { type: "outline", name: "gender-male" },
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
function Gender_female($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"
      }
    ],
    ["path", { "d": "M12 14v7" }],
    ["path", { "d": "M9 18h6" }]
  ];
  Icon$1($$payload, spread_props([
    { type: "outline", name: "gender-female" },
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
  let editingEmployee = null;
  let showCreateForm = false;
  let showEditForm = false;
  let showDeleteDialog = false;
  let employeeToDelete = null;
  let createGender = void 0;
  let editingId = null;
  let editingData = {};
  let newEmployeeName = "";
  let profileImageFile = null;
  let profileImagePreviewUrl = null;
  let currentSortBy = data.sortBy || "created_at";
  let currentSortOrder = data.sortOrder || "desc";
  let filteredEmployees = data.employees?.filter((employee) => employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || employee.role.toLowerCase().includes(searchQuery.toLowerCase()) || employee.inventory_assignment && employee.inventory_assignment.toLowerCase().includes(searchQuery.toLowerCase())) || [];
  function startEdit(employee) {
    editingId = employee.id;
    editingData = { ...employee };
    editingEmployee = { ...employee };
    profileImagePreviewUrl = employee.profile_image || null;
    showEditForm = true;
  }
  function cancelEdit() {
    removeProfileImage();
    editingId = null;
    editingData = {};
    showEditForm = false;
  }
  function openDeleteDialog(employee) {
    employeeToDelete = employee;
    showDeleteDialog = true;
  }
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  }
  function getGenderLabel(gender) {
    const genders = {
      "male": "Male",
      "female": "Female",
      "other": "Other"
    };
    return genders[gender] || gender;
  }
  function getGenderIcon(gender) {
    switch (gender) {
      case "male":
        return Gender_male;
      case "female":
        return Gender_female;
      case "other":
        return Circle_dot;
      default:
        return User;
    }
  }
  function handleFileChange(event) {
    const input = event.target;
    const selectedFile = input.files?.[0];
    if (selectedFile) {
      profileImageFile = selectedFile;
      profileImagePreviewUrl = URL.createObjectURL(selectedFile);
    } else {
      profileImageFile = null;
      profileImagePreviewUrl = editingEmployee?.profile_image || null;
    }
  }
  function removeProfileImage() {
    profileImageFile = null;
    profileImagePreviewUrl = null;
  }
  function handleAddEmployeeClick() {
    showCreateForm = true;
    newEmployeeName = "";
    createGender = void 0;
    editingData = {};
    error = null;
    profileImageFile = null;
    profileImagePreviewUrl = null;
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
    $$payload2.out += `<div class="space-y-6"><div class="flex justify-between items-center"><div><h1 class="text-2xl font-bold">Employees Management</h1> <p class="text-gray-500">Manage company employees and their assignments</p></div></div></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Employees: ${escape_html(filteredEmployees.length)}`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<div class="flex items-center gap-4 mb-4"><div class="relative flex-1">`;
            Input($$payload4, {
              placeholder: "Search by name, address, or contact number...",
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
              onclick: handleAddEmployeeClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Client`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredEmployees.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No employees found</div>`;
            } else {
              $$payload4.out += "<!--[!-->";
              Table($$payload4, {
                class: "border rounded-lg",
                children: ($$payload5) => {
                  Table_header($$payload5, {
                    children: ($$payload6) => {
                      Table_row($$payload6, {
                        children: ($$payload7) => {
                          Table_head($$payload7, {
                            class: "text-muted",
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->---`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("name"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Name <!---->`;
                              getSortIcon("name")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("gender"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Gender <!---->`;
                              getSortIcon("gender")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("birthday"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Birthday <!---->`;
                              getSortIcon("birthday")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("role"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Role <!---->`;
                              getSortIcon("role")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("inventory_assignment"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Inventory Assignment <!---->`;
                              getSortIcon("inventory_assignment")?.($$payload8, { class: "h-4 w-4" });
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
                      const each_array = ensure_array_like(filteredEmployees);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let employee = each_array[i];
                        Table_row($$payload6, {
                          class: i % 2 === 0 ? "bg-gray-50 dark:bg-card" : "bg-white dark:bg-background",
                          children: ($$payload7) => {
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->`;
                                Avatar($$payload8, {
                                  class: "h-10 w-10",
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->`;
                                    Avatar_image($$payload9, { src: employee.profile_image || void 0 });
                                    $$payload9.out += `<!----> <!---->`;
                                    Avatar_fallback($$payload9, {
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->${escape_html(employee.name.substring(0, 2).toUpperCase())}`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload9.out += `<!---->`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!---->`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "font-bold",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(employee.name)}`;
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
                                    getGenderIcon(employee.gender)?.($$payload9, { class: "h-3 w-3" });
                                    $$payload9.out += `<!----> ${escape_html(getGenderLabel(employee.gender))}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: !employee.birthday ? "text-gray-400 italic" : "",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(employee.birthday))}`;
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
                                    Briefcase($$payload9, { class: "h-3 w-3" });
                                    $$payload9.out += `<!----> ${escape_html(employee.role)}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: `max-w-xs truncate ${stringify(!employee.inventory_assignment ? "text-gray-400 italic" : "")}`,
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->`;
                                Root$2($$payload8, {
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->`;
                                    Tooltip_trigger($$payload9, {
                                      class: "truncate max-w-xs block",
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->${escape_html(employee.inventory_assignment || "N/A")}`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload9.out += `<!----> <!---->`;
                                    Tooltip_content($$payload9, {
                                      children: ($$payload10) => {
                                        $$payload10.out += `<p>${escape_html(employee.inventory_assignment || "No Inventory Assignment")}</p>`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload9.out += `<!---->`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!---->`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "text-gray-500 text-sm",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(employee.created_at))}`;
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
                                  onclick: () => startEdit(employee),
                                  children: ($$payload9) => {
                                    Square_pen($$payload9, {});
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!----> `;
                                Button($$payload8, {
                                  variant: "outline",
                                  size: "sm",
                                  onclick: () => openDeleteDialog(employee),
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
                        $$payload7.out += `<!---->Add New Employee`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the employee's information below.`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <form method="POST" action="?/create" enctype="multipart/form-data"><div class="space-y-4 mt-6">`;
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
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Profile Image`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <div class="flex items-center gap-4"><!---->`;
                Avatar($$payload5, {
                  class: "h-20 w-20",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Avatar_image($$payload6, {
                      src: profileImagePreviewUrl || void 0,
                      alt: "Employee profile"
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Avatar_fallback($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->EM`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <div class="flex flex-col gap-2">`;
                Input($$payload5, {
                  id: "profile_image_create",
                  name: "profile_image",
                  type: "file",
                  accept: "image/*",
                  onchange: handleFileChange
                });
                $$payload5.out += `<!----> `;
                if (profileImagePreviewUrl) {
                  $$payload5.out += "<!--[-->";
                  Button($$payload5, {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onclick: removeProfileImage,
                    children: ($$payload6) => {
                      X_circle($$payload6, { class: "h-4 w-4 mr-1 text-red-500" });
                      $$payload6.out += `<!----> Remove Image`;
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--></div></div> `;
                if (profileImageFile && profileImageFile.size > 1024 * 1024 * 5) {
                  $$payload5.out += "<!--[-->";
                  $$payload5.out += `<p class="text-red-500 text-sm">Image size exceeds 5MB limit.</p>`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "name_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Name *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "name_create",
                  name: "name",
                  required: true,
                  maxlength: 40,
                  get value() {
                    return newEmployeeName;
                  },
                  set value($$value) {
                    newEmployeeName = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "gender_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Gender *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$3($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return createGender;
                  },
                  set value($$value) {
                    createGender = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(createGender ? getGenderLabel(createGender) : "Select gender")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "male",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Male`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "female",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Female`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "other",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Other`;
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
                $$payload5.out += `<!----> <input type="hidden" name="gender"${attr("value", createGender)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "birthday_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Birthday *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "birthday_create",
                  name: "birthday",
                  type: "date",
                  required: true,
                  get value() {
                    return editingData.birthday;
                  },
                  set value($$value) {
                    editingData.birthday = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "role_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Role *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "role_create",
                  name: "role",
                  required: true,
                  maxlength: 40,
                  get value() {
                    return editingData.role;
                  },
                  set value($$value) {
                    editingData.role = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "inventory_assignment_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Inventory Assignment`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "inventory_assignment_create",
                  name: "inventory_assignment",
                  maxlength: 20,
                  get value() {
                    return editingData.inventory_assignment;
                  },
                  set value($$value) {
                    editingData.inventory_assignment = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="flex gap-2 pt-4">`;
                Button($$payload5, {
                  type: "submit",
                  class: "flex-1",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Create Employee`;
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
                        $$payload7.out += `<!---->Edit Employee`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the employee's information below.`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <form method="POST" action="?/update" enctype="multipart/form-data"><input type="hidden" name="id"${attr("value", editingId)}/> <div class="space-y-4 mt-6">`;
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
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Profile Image`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <div class="flex items-center gap-4"><!---->`;
                Avatar($$payload5, {
                  class: "h-20 w-20",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Avatar_image($$payload6, {
                      src: profileImagePreviewUrl || void 0,
                      alt: "Employee profile"
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Avatar_fallback($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->EM`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <div class="flex flex-col gap-2">`;
                Input($$payload5, {
                  id: "profile_image_edit",
                  name: "profile_image",
                  type: "file",
                  accept: "image/*",
                  onchange: handleFileChange
                });
                $$payload5.out += `<!----> `;
                if (profileImagePreviewUrl) {
                  $$payload5.out += "<!--[-->";
                  Button($$payload5, {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onclick: removeProfileImage,
                    children: ($$payload6) => {
                      X_circle($$payload6, { class: "h-4 w-4 mr-1 text-red-500" });
                      $$payload6.out += `<!----> Remove Image`;
                    },
                    $$slots: { default: true }
                  });
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--></div></div> `;
                if (profileImageFile && profileImageFile.size > 1024 * 1024 * 5) {
                  $$payload5.out += "<!--[-->";
                  $$payload5.out += `<p class="text-red-500 text-sm">Image size exceeds 5MB limit.</p>`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]--></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "name_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Name *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "name_edit",
                  name: "name",
                  required: true,
                  maxlength: 40,
                  get value() {
                    return editingData.name;
                  },
                  set value($$value) {
                    editingData.name = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "gender_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Gender *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$3($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return editingData.gender;
                  },
                  set value($$value) {
                    editingData.gender = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(editingData.gender ? getGenderLabel(editingData.gender) : "Select gender")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "male",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Male`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "female",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Female`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "other",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Other`;
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
                $$payload5.out += `<!----> <input type="hidden" name="gender"${attr("value", editingData.gender)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "birthday_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Birthday *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "birthday_edit",
                  name: "birthday",
                  type: "date",
                  required: true,
                  get value() {
                    return editingData.birthday;
                  },
                  set value($$value) {
                    editingData.birthday = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "role_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Role *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "role_edit",
                  name: "role",
                  required: true,
                  maxlength: 40,
                  get value() {
                    return editingData.role;
                  },
                  set value($$value) {
                    editingData.role = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "inventory_assignment_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Inventory Assignment`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "inventory_assignment_edit",
                  name: "inventory_assignment",
                  maxlength: 60,
                  get value() {
                    return editingData.inventory_assignment;
                  },
                  set value($$value) {
                    editingData.inventory_assignment = $$value;
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
                        $$payload7.out += `<!---->Delete Employee`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete "${escape_html(employeeToDelete?.name)}"? This action cannot be undone.`;
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
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", employeeToDelete?.id)}/> `;
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
//# sourceMappingURL=_page.svelte-BNBr75pp.js.map
