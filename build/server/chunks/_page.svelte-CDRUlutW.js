import { q as push, P as copy_payload, Q as assign_payload, u as pop, F as escape_html, z as attr, S as ensure_array_like } from './index-C7g5K6pr.js';
import { g as goto, i as invalidate } from './client--FX0Csju.js';
import { B as Button } from './button-CTUnD44E.js';
import { I as Input } from './input-BZivlnJU.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-2UI1-8SA.js';
import { L as Label } from './label-BggOrNn6.js';
import { A as Alert } from './alert-xT3Jgele.js';
import { R as Root, T as Table, b as Table_header, e as Table_body, P as Portal, D as Dialog_overlay, a as Dialog_content, g as Dialog_header, c as Table_row, d as Table_head, f as Table_cell, S as Square_pen, h as Dialog_title, i as Dialog_description, A as Alert_circle, j as Alert_description } from './index4-R95s3f3p.js';
import { R as Root$2, S as Select_trigger, a as Select_content, b as Select_item } from './index5-rLJotoyG.js';
import { B as Badge } from './badge-CyI62jER.js';
import { R as Root$1, P as Portal$1, A as Alert_dialog_overlay, a as Alert_dialog_content, b as Alert_dialog_header, e as Alert_dialog_footer, c as Alert_dialog_title, d as Alert_dialog_description } from './index6-BARiXcRc.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-8usMkB_x.js';
import { P as Provider, R as Root$3 } from './index3-CWUAYMpH.js';
import { S as Separator } from './separator-Dp6kZbL1.js';
import { S as Search } from './search-B0fDvFmU.js';
import { P as Plus, T as Trash_2, C as Chevrons_up_down } from './trash-2-D8prpRXC.js';
import { F as Fish } from './fish-DoyYKSor.js';
import { G as Grid_3x3, B as Building } from './grid-3x3-C_nqfxpE.js';
import { I as Info } from './info-DL3_Jdz5.js';
import { T as Tooltip_trigger, a as Tooltip_content } from './tooltip-content-KOo-haMz.js';
import { C as Check_circle } from './check-circle-BDZQhB0v.js';
import { X as X_circle } from './x-circle-DhIVmoT-.js';
import { C as Clipboard_list } from './clipboard-list-Golqt3lc.js';
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
  let editingClient = null;
  let showCreateForm = false;
  let showEditForm = false;
  let showDeleteDialog = false;
  let clientToDelete = null;
  let createOperatorType = void 0;
  let editingId = null;
  let editingData = {};
  let newClientName = "";
  let profileImageFile = null;
  let profileImagePreviewUrl = null;
  let currentSortBy = data.sortBy || "created_at";
  let currentSortOrder = data.sortOrder || "desc";
  let filteredClients = data.clients?.filter((client) => client.name.toLowerCase().includes(searchQuery.toLowerCase()) || client.address.toLowerCase().includes(searchQuery.toLowerCase()) || client.contact_number && client.contact_number.includes(searchQuery)) || [];
  function startEdit(client) {
    editingId = client.id;
    editingData = { ...client };
    editingClient = { ...client };
    profileImagePreviewUrl = client.profile_image || null;
    showEditForm = true;
  }
  function cancelEdit() {
    removeProfileImage();
    editingId = null;
    editingData = {};
    showEditForm = false;
  }
  function openDeleteDialog(client) {
    clientToDelete = client;
    showDeleteDialog = true;
  }
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  }
  function getOperatorTypeLabel(type) {
    const types = {
      "pond": "Pond",
      "cage": "Cage",
      "org": "Organization"
    };
    return types[type] || type;
  }
  function getOperatorTypeBadgeVariant(type) {
    return "outline";
  }
  function handleFileChange(event) {
    const input = event.target;
    const selectedFile = input.files?.[0];
    if (selectedFile) {
      profileImageFile = selectedFile;
      profileImagePreviewUrl = URL.createObjectURL(selectedFile);
    } else {
      profileImageFile = null;
      profileImagePreviewUrl = editingClient?.profile_image || null;
    }
  }
  function removeProfileImage() {
    profileImageFile = null;
    profileImagePreviewUrl = null;
  }
  function handleAddClientClick() {
    showCreateForm = true;
    newClientName = "";
    createOperatorType = void 0;
    editingData.status = "active";
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
    $$payload2.out += `<div class="space-y-6"><div class="flex justify-between items-center"><div><h1 class="text-2xl font-bold">Clients Management</h1> <p class="text-gray-500">Manage aquaculture operators and their information</p></div></div></div> `;
    Card($$payload2, {
      children: ($$payload3) => {
        Card_header($$payload3, {
          class: "h-4",
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Total Clients: ${escape_html(filteredClients.length)}`;
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
              onclick: handleAddClientClick,
              children: ($$payload5) => {
                Plus($$payload5, { class: "h-4 w-4 mr-2" });
                $$payload5.out += `<!----> Add Client`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div> `;
            if (filteredClients.length === 0) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<div class="text-center py-8 text-gray-500">No clients found</div>`;
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
                            onclick: () => handleSort("operator_type"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Operator Type <!---->`;
                              getSortIcon("operator_type")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("address"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Address <!---->`;
                              getSortIcon("address")?.($$payload8, { class: "h-4 w-4" });
                              $$payload8.out += `<!----></div>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Table_head($$payload7, {
                            class: "text-sm font-semibold text-gray-600 dark:text-gray-400 border-b pb-2 mb-2 cursor-pointer",
                            onclick: () => handleSort("contact_number"),
                            children: ($$payload8) => {
                              $$payload8.out += `<div class="flex items-center gap-1">Contact Number <!---->`;
                              getSortIcon("contact_number")?.($$payload8, { class: "h-4 w-4" });
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
                      const each_array = ensure_array_like(filteredClients);
                      $$payload6.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let client = each_array[i];
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
                                    Avatar_image($$payload9, { src: client.profile_image || void 0 });
                                    $$payload9.out += `<!----> <!---->`;
                                    Avatar_fallback($$payload9, {
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->${escape_html(client.name.substring(0, 2).toUpperCase())}`;
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
                                $$payload8.out += `<!---->${escape_html(client.name)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              children: ($$payload8) => {
                                Badge($$payload8, {
                                  variant: getOperatorTypeBadgeVariant(client.operator_type),
                                  class: "flex items-center gap-1",
                                  children: ($$payload9) => {
                                    if (client.operator_type === "pond") {
                                      $$payload9.out += "<!--[-->";
                                      Fish($$payload9, { class: "h-3 w-3" });
                                    } else if (client.operator_type === "cage") {
                                      $$payload9.out += "<!--[1-->";
                                      Grid_3x3($$payload9, { class: "h-3 w-3" });
                                    } else if (client.operator_type === "org") {
                                      $$payload9.out += "<!--[2-->";
                                      Building($$payload9, { class: "h-3 w-3" });
                                    } else {
                                      $$payload9.out += "<!--[!-->";
                                      Info($$payload9, { class: "h-3 w-3" });
                                    }
                                    $$payload9.out += `<!--]--> ${escape_html(getOperatorTypeLabel(client.operator_type))}`;
                                  },
                                  $$slots: { default: true }
                                });
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: "max-w-xs truncate",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->`;
                                Provider($$payload8, {
                                  delayDuration: 100,
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->`;
                                    Root$3($$payload9, {
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->`;
                                        Tooltip_trigger($$payload10, {
                                          class: "truncate max-w-xs block",
                                          children: ($$payload11) => {
                                            $$payload11.out += `<!---->${escape_html(client.address)}`;
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$payload10.out += `<!----> <!---->`;
                                        Tooltip_content($$payload10, {
                                          children: ($$payload11) => {
                                            $$payload11.out += `<p>${escape_html(client.address)}</p>`;
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
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: !client.contact_number ? "text-gray-400 italic" : "",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(client.contact_number || "N/A")}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> `;
                            Table_cell($$payload7, {
                              class: !client.birthday ? "text-gray-400 italic" : "",
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(formatDate(client.birthday))}`;
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
                                    if (client.status === "active") {
                                      $$payload9.out += "<!--[-->";
                                      Check_circle($$payload9, { class: "h-3 w-3 text-green-500" });
                                    } else if (client.status === "inactive") {
                                      $$payload9.out += "<!--[1-->";
                                      X_circle($$payload9, { class: "h-3 w-3 text-red-500" });
                                    } else {
                                      $$payload9.out += "<!--[!-->";
                                    }
                                    $$payload9.out += `<!--]--> ${escape_html(client.status?.charAt(0).toUpperCase() + client.status?.slice(1))}`;
                                  },
                                  $$slots: { default: true }
                                });
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
                                    Root$3($$payload9, {
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->`;
                                        Tooltip_trigger($$payload10, {
                                          class: "truncate max-w-xs block",
                                          children: ($$payload11) => {
                                            Button($$payload11, {
                                              variant: "outline",
                                              size: "sm",
                                              href: `/dashboard/clients/${client.id}/stocking-info`,
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
                                            $$payload11.out += `<p>View Stocking Info</p>`;
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
                                  onclick: () => startEdit(client),
                                  children: ($$payload9) => {
                                    Square_pen($$payload9, {});
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!----> `;
                                Button($$payload8, {
                                  variant: "outline",
                                  size: "sm",
                                  onclick: () => openDeleteDialog(client),
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
                        $$payload7.out += `<!---->Add New Client`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Enter the client's information below.`;
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
                      alt: "Client profile"
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Avatar_fallback($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->CN`;
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
                    return newClientName;
                  },
                  set value($$value) {
                    newClientName = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "operator_type_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Operator Type *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return createOperatorType;
                  },
                  set value($$value) {
                    createOperatorType = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(createOperatorType || "Select operator type")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "pond",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Pond`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "cage",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Cage`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "org",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Organization`;
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
                $$payload5.out += `<!----> <input type="hidden" name="operator_type"${attr("value", createOperatorType)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "address_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Address *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "address_create",
                  name: "address",
                  required: true,
                  type: "text",
                  maxlength: 60
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "contact_number_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Contact Number or Email Address`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "contact_number_create",
                  name: "contact_number",
                  type: "text",
                  maxlength: 30
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "birthday_create",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Birthday`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "birthday_create",
                  name: "birthday",
                  type: "date"
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
                Root$2($$payload5, {
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
                        $$payload7.out += `<span>${escape_html(editingData.status || "Select status")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "active",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Active`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "inactive",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Inactive`;
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
                    $$payload6.out += `<!---->Create Client`;
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
                        $$payload7.out += `<!---->Edit Client`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Update the client's information below.`;
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
                      alt: "Client profile"
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Avatar_fallback($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->CN`;
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
                  for: "operator_type_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Operator Type *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
                  type: "single",
                  required: true,
                  get value() {
                    return editingData.operator_type;
                  },
                  set value($$value) {
                    editingData.operator_type = $$value;
                    $$settled = false;
                  },
                  children: ($$payload6) => {
                    Select_trigger($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span>${escape_html(editingData.operator_type || "Select operator type")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "pond",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Pond`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "cage",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Cage`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "org",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Organization`;
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
                $$payload5.out += `<!----> <input type="hidden" name="operator_type"${attr("value", editingData.operator_type)}/></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "address_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Address *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "address_edit",
                  name: "address",
                  required: true,
                  type: "text",
                  maxlength: 60,
                  get value() {
                    return editingData.address;
                  },
                  set value($$value) {
                    editingData.address = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "contact_number_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Contact Number or Email Address`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "contact_number_edit",
                  name: "contact_number",
                  type: "text",
                  maxlength: 30,
                  get value() {
                    return editingData.contact_number;
                  },
                  set value($$value) {
                    editingData.contact_number = $$value;
                    $$settled = false;
                  }
                });
                $$payload5.out += `<!----></div> <div class="space-y-2">`;
                Label($$payload5, {
                  for: "birthday_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Birthday`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Input($$payload5, {
                  id: "birthday_edit",
                  name: "birthday",
                  type: "date",
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
                  for: "status_edit",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Status *`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                Root$2($$payload5, {
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
                        $$payload7.out += `<span>${escape_html(editingData.status || "Select status")}</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Select_content($$payload6, {
                      children: ($$payload7) => {
                        Select_item($$payload7, {
                          value: "active",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Active`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Select_item($$payload7, {
                          value: "inactive",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Inactive`;
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
                        $$payload7.out += `<!---->Delete Client`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Alert_dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Are you sure you want to delete "${escape_html(clientToDelete?.name)}"? This action cannot be undone.`;
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
                    $$payload6.out += `<form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", clientToDelete?.id)}/> `;
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
//# sourceMappingURL=_page.svelte-CDRUlutW.js.map
