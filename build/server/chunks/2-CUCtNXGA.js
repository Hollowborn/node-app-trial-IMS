const navItemsData = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "dashboard"
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: "users"
    },
    {
      title: "Feeds Inventory",
      url: "/dashboard/inventory/feeds",
      // Parent URL for inventory
      icon: "fish"
    },
    {
      title: "Hardware Inventory",
      url: "/dashboard/inventory/hardware",
      // Parent URL for inventory
      icon: "hammer"
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: "calendar"
    },
    {
      title: "Ponds",
      url: "/dashboard/ponds",
      icon: "fileText"
    }
  ],
  administration: [
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: "briefcase"
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: "settings"
    },
    // You can add or remove other items as needed
    {
      title: "Guide / Help Section",
      url: "/dashboard/guide",
      // Changed to a unique example URL
      icon: "help"
      // Placeholder icon
    }
  ]
};
const load = async ({ locals }) => {
  return {
    navItems: navItemsData,
    user: locals.user ? {
      name: locals.user.username,
      display_name: locals.user.display_name,
      role: locals.user.role,
      avatar: locals.user.profile_image
      // should be a string URL or base64
    } : null
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-CdZ32z-F.js')).default;
const server_id = "src/routes/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.d0_c_l4R.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BMspJ8Yh.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/Cd7yCszS.js","_app/immutable/chunks/CD-1ytIX.js","_app/immutable/chunks/Jos_wYTi.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/DaJoOla_.js","_app/immutable/chunks/HUBSOgFT.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/DQk1ANEP.js","_app/immutable/chunks/okGsx2OR.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/FAwHm2RX.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/ClzY2XPi.js","_app/immutable/chunks/CbdgyKAL.js","_app/immutable/chunks/Cj2i8k79.js","_app/immutable/chunks/CKs0jSch.js","_app/immutable/chunks/a2Q9XIBf.js","_app/immutable/chunks/DBcW8l46.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/DM098JB-.js","_app/immutable/chunks/CfhtIqMF.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-CUCtNXGA.js.map
