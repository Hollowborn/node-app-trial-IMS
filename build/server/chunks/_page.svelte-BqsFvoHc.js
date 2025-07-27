import { q as push, T as copy_payload, U as assign_payload, u as pop, P as store_get, A as ensure_array_like, O as stringify, N as escape_html, z as attr, R as unsubscribe_stores, S as bind_props, M as spread_props, X as props_id, B as spread_attributes } from './index-De8vQF1I.js';
import './client-BhPeql-r.js';
import { w as writable } from './exports-DV9d4DRW.js';
import { a as allThemes, s as setCustomThemePalette } from './customTheme-BWnX7620.js';
import { P as Provider, R as Root } from './index3-B7hh8Fwf.js';
import { B as Button, b as buttonVariants } from './button-BNxbTI-l.js';
import { I as Input } from './input-C9F7glNZ.js';
import { L as Label } from './label-DHxoTVbD.js';
import { C as Card, a as Card_header, c as Card_content, b as Card_title } from './card-title-w0WvgVlQ.js';
import { C as Card_description } from './card-description-CsPPPvKz.js';
import { S as Separator } from './separator-BgdIaxnM.js';
import { A as Avatar, a as Avatar_image, b as Avatar_fallback } from './avatar-fallback-CpMJPUdY.js';
import './alert-BJiEFxI7.js';
import { R as Root$1, a as Alert_dialog_content, b as Alert_dialog_header, c as Alert_dialog_title, d as Alert_dialog_description, e as Alert_dialog_footer } from './index6-Ck7H2Epb.js';
import { T as Tooltip_trigger, a as Tooltip_content } from './tooltip-content-CejHdlvl.js';
import { X as X_circle } from './x-circle-CZfVfbDi.js';
import { b as box } from './attrs-BUrL1FBy.js';
import { c as createId, m as mergeProps } from './create-id-VJ-xBm53.js';
import { k as DialogTriggerState, A as AlertDialogCancelState, l as DialogActionState } from './popper-layer-force-mount-CWCEeiL8.js';
import { c as cn } from './utils-ClAJye8o.js';
import './open-change-complete-nsl5CQHK.js';
import './box-auto-reset.svelte-BHAyrkVe.js';
import './events-Cou-NJi3.js';
import './presence-layer-D9TE1rr0.js';
import './Icon2-DDFPy3UW.js';

const initialUser = {
  id: 0,
  username: "",
  display_name: "",
  profileImage: null,
  role: "feeds",
  // Default to lowest privilege
  isAuthenticated: false
};
const currentUser = writable(initialUser);
function isAdmin(userRole) {
  return userRole === "admin";
}
function Alert_dialog_action$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId(uid),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const actionState = DialogActionState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, actionState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_cancel$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cancelState = AlertDialogCancelState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, cancelState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Dialog_trigger($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId(uid),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = DialogTriggerState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_trigger($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_trigger($$payload2, spread_props([
      { "data-slot": "alert-dialog-trigger" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_action($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Alert_dialog_action$1($$payload2, spread_props([
      {
        "data-slot": "alert-dialog-action",
        class: cn(buttonVariants(), className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Alert_dialog_cancel($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Alert_dialog_cancel$1($$payload2, spread_props([
      {
        "data-slot": "alert-dialog-cancel",
        class: cn(buttonVariants({ variant: "outline" }), className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data } = $$props;
  let displayUsername = data.user.display_name || data.user.username || "";
  let profileImageFile = null;
  let profileImagePreviewUrl = data.user.profileImage;
  let removeProfileImageFlag = false;
  let currentPassword = "";
  let newUsername = "";
  let newPassword = "";
  let confirmNewPassword = "";
  let isLoading = {
    profile: false,
    resetDb: false,
    saveDb: false
  };
  let importDbFile = null;
  function handleProfileImageChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      profileImageFile = input.files[0];
      profileImagePreviewUrl = URL.createObjectURL(profileImageFile);
      removeProfileImageFlag = false;
    } else {
      profileImageFile = null;
      profileImagePreviewUrl = store_get($$store_subs ??= {}, "$currentUser", currentUser).profileImage;
    }
  }
  function removeCurrentProfileImage() {
    profileImageFile = null;
    profileImagePreviewUrl = null;
    removeProfileImageFlag = true;
  }
  function handleImportDbFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      importDbFile = input.files[0];
    } else {
      importDbFile = null;
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="space-y-8 p-6"><h1 class="text-3xl font-bold">Settings</h1> <p class="text-gray-500">Manage your profile, account, and application settings.</p> `;
    Separator($$payload2, {});
    $$payload2.out += `<!----> `;
    Card($$payload2, {
      class: "max-w-2xl mx-auto",
      children: ($$payload3) => {
        Card_header($$payload3, {
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Application Theme`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Card_description($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Customize the look and feel of the application.`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_content($$payload3, {
          class: "flex gap-3",
          children: ($$payload4) => {
            const each_array = ensure_array_like(allThemes);
            $$payload4.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let theme = each_array[$$index];
              $$payload4.out += `<!---->`;
              Provider($$payload4, {
                delayDuration: 50,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Root($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Tooltip_trigger($$payload6, {
                        children: ($$payload7) => {
                          Button($$payload7, {
                            variant: "outline",
                            class: "icon",
                            style: `background-color: ${stringify(theme.primaryColor)};`,
                            onclick: () => setCustomThemePalette(theme.value)
                          });
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Tooltip_content($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<p>${escape_html(theme.name)}</p>`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                }
              });
              $$payload4.out += `<!---->`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Card($$payload2, {
      class: "max-w-2xl mx-auto",
      children: ($$payload3) => {
        Card_header($$payload3, {
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Profile Information`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Card_description($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Update your display name and profile avatar.`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<form method="POST" action="?/updateProfile" enctype="multipart/form-data"><div class="space-y-6"><div class="flex items-center gap-6"><!---->`;
            Avatar($$payload4, {
              class: "h-24 w-24",
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Avatar_image($$payload5, {
                  src: profileImagePreviewUrl || void 0,
                  alt: "Profile"
                });
                $$payload5.out += `<!----> <!---->`;
                Avatar_fallback($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->${escape_html(data.user.display_name.substring(0, 2).toUpperCase())}`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <div class="space-y-2">`;
            Label($$payload4, {
              for: "profileImage",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Profile Image`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "profileImage",
              name: "profileImage",
              type: "file",
              accept: "image/*",
              onchange: handleProfileImageChange,
              class: "cursor-pointer"
            });
            $$payload4.out += `<!----> `;
            if (profileImagePreviewUrl) {
              $$payload4.out += "<!--[-->";
              Button($$payload4, {
                type: "button",
                variant: "ghost",
                size: "sm",
                onclick: removeCurrentProfileImage,
                children: ($$payload5) => {
                  X_circle($$payload5, { class: "h-4 w-4 mr-1 text-red-500" });
                  $$payload5.out += `<!----> Remove Image`;
                },
                $$slots: { default: true }
              });
            } else {
              $$payload4.out += "<!--[!-->";
            }
            $$payload4.out += `<!--]--> <input type="hidden" name="currentImagePath"${attr("value", profileImagePreviewUrl || "")}/> `;
            if (removeProfileImageFlag) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<input type="hidden" name="removeProfileImage" value="true"/>`;
            } else {
              $$payload4.out += "<!--[!-->";
            }
            $$payload4.out += `<!--]--></div></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "displayName",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Display Name`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "displayName",
              name: "displayName",
              maxlength: 20,
              get value() {
                return displayUsername;
              },
              set value($$value) {
                displayUsername = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> `;
            Button($$payload4, {
              type: "submit",
              disabled: isLoading.profile,
              children: ($$payload5) => {
                {
                  $$payload5.out += "<!--[!-->";
                  $$payload5.out += `Save Profile`;
                }
                $$payload5.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div></form>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Card($$payload2, {
      class: "max-w-2xl mx-auto",
      children: ($$payload3) => {
        Card_header($$payload3, {
          children: ($$payload4) => {
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Account Credentials`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Card_description($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Change your username and password.`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Card_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<form method="POST" action="?/updateCredentials"><div class="space-y-6"><div class="space-y-2">`;
            Label($$payload4, {
              for: "currentPassword",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Current Password *`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "currentPassword",
              name: "currentPassword",
              type: "password",
              required: true,
              get value() {
                return currentPassword;
              },
              set value($$value) {
                currentPassword = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "newUsername",
              children: ($$payload5) => {
                $$payload5.out += `<!---->New Username`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "newUsername",
              name: "newUsername",
              type: "text",
              placeholder: "Leave blank to keep current",
              maxlength: 40,
              get value() {
                return newUsername;
              },
              set value($$value) {
                newUsername = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "newPassword",
              children: ($$payload5) => {
                $$payload5.out += `<!---->New Password`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "newPassword",
              name: "newPassword",
              type: "password",
              placeholder: "Leave blank to keep current",
              minlength: 8,
              get value() {
                return newPassword;
              },
              set value($$value) {
                newPassword = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----></div> <div class="space-y-2">`;
            Label($$payload4, {
              for: "confirmNewPassword",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Confirm New Password`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, {
              id: "confirmNewPassword",
              name: "confirmNewPassword",
              type: "password",
              get value() {
                return confirmNewPassword;
              },
              set value($$value) {
                confirmNewPassword = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> `;
            if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
              $$payload4.out += "<!--[-->";
              $$payload4.out += `<p class="text-red-500 text-sm">Passwords do not match.</p>`;
            } else {
              $$payload4.out += "<!--[!-->";
            }
            $$payload4.out += `<!--]--></div> `;
            Button($$payload4, {
              type: "submit",
              disabled: newPassword && newPassword !== confirmNewPassword,
              children: ($$payload5) => {
                {
                  $$payload5.out += "<!--[!-->";
                  $$payload5.out += `Update Credentials`;
                }
                $$payload5.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></div></form>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    if (isAdmin(store_get($$store_subs ??= {}, "$currentUser", currentUser).role)) {
      $$payload2.out += "<!--[-->";
      Card($$payload2, {
        class: "max-w-2xl mx-auto border-red-500 bg-red-50/50 dark:bg-red-950/20",
        children: ($$payload3) => {
          Card_header($$payload3, {
            children: ($$payload4) => {
              Card_title($$payload4, {
                class: "text-red-600 dark:text-red-400",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Admin: Database Management`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_description($$payload4, {
                class: "text-red-500 dark:text-red-300",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Caution: These operations are irreversible and affect all application data.`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_content($$payload3, {
            class: "space-y-6",
            children: ($$payload4) => {
              $$payload4.out += `<div class="space-y-2">`;
              Label($$payload4, {
                class: "text-lg font-medium",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Reset Database`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <p class="text-sm text-gray-700 dark:text-gray-300">Delete all data from all tables, retaining the table structure. <span class="font-semibold text-red-600 dark:text-red-400">This action is irreversible.</span></p> `;
              Root$1($$payload4, {
                children: ($$payload5) => {
                  Alert_dialog_trigger($$payload5, {
                    children: ($$payload6) => {
                      Button($$payload6, {
                        variant: "destructive",
                        class: "mt-2",
                        disabled: isLoading.resetDb,
                        children: ($$payload7) => {
                          {
                            $$payload7.out += "<!--[!-->";
                            $$payload7.out += `Reset Database`;
                          }
                          $$payload7.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Alert_dialog_content($$payload5, {
                    children: ($$payload6) => {
                      Alert_dialog_header($$payload6, {
                        children: ($$payload7) => {
                          Alert_dialog_title($$payload7, {
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Are you absolutely sure?`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Alert_dialog_description($$payload7, {
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->This action cannot be undone. This will permanently delete all data from your database,
                                    while keeping the table structure.`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Alert_dialog_footer($$payload6, {
                        children: ($$payload7) => {
                          Alert_dialog_cancel($$payload7, {
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Cancel`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> `;
                          Alert_dialog_action($$payload7, {
                            onclick: () => {
                              const form = document.getElementById("resetDbForm");
                              if (form) form.requestSubmit();
                            },
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Continue`;
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
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <form id="resetDbForm" method="POST" action="?/resetDatabase" class="hidden"></form></div> `;
              Separator($$payload4, {});
              $$payload4.out += `<!----> <div class="space-y-2">`;
              Label($$payload4, {
                class: "text-lg font-medium",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Save Database`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <p class="text-sm text-gray-700 dark:text-gray-300">Create a backup copy of your current database file.</p> <form method="POST" action="?/saveDatabase">`;
              Button($$payload4, {
                type: "submit",
                class: "mt-2",
                disabled: isLoading.saveDb,
                children: ($$payload5) => {
                  {
                    $$payload5.out += "<!--[!-->";
                    $$payload5.out += `Save Database`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----></form></div> `;
              Separator($$payload4, {});
              $$payload4.out += `<!----> <div class="space-y-2">`;
              Label($$payload4, {
                class: "text-lg font-medium",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Import Database`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <p class="text-sm text-gray-700 dark:text-gray-300">Overwrite the current database with a selected backup file. <span class="font-semibold text-red-600 dark:text-red-400">This action is irreversible and will replace ALL existing data.</span></p> <form method="POST" action="?/importDatabase" enctype="multipart/form-data">`;
              Input($$payload4, {
                id: "importDbFile",
                name: "dbFile",
                type: "file",
                accept: ".sqlite,.db",
                onchange: handleImportDbFileChange,
                class: "cursor-pointer mb-2",
                required: true
              });
              $$payload4.out += `<!----> `;
              Button($$payload4, {
                type: "submit",
                class: "mt-2",
                disabled: !importDbFile,
                children: ($$payload5) => {
                  {
                    $$payload5.out += "<!--[!-->";
                    $$payload5.out += `Import Database`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              if (importDbFile && !importDbFile.name.endsWith(".sqlite") && !importDbFile.name.endsWith(".db")) {
                $$payload4.out += "<!--[-->";
                $$payload4.out += `<p class="text-red-500 text-sm mt-1">Invalid file type. Please select a .sqlite or .db file.</p>`;
              } else {
                $$payload4.out += "<!--[!-->";
              }
              $$payload4.out += `<!--]--></form></div>`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <div class="fixed inset-x-0 bottom-6 flex justify-center z-50 pointer-events-none">`;
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
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BqsFvoHc.js.map
