const allNavItemsData = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "dashboard",
      // Add a 'roles' array to each item indicating who can see it
      roles: ["admin", "feeds", "hardware"]
      // Example: All roles can see dashboard
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: "users",
      roles: ["admin"]
      // Example: Only admin and feeds roles can see clients
    },
    {
      title: "Feeds Inventory",
      url: "/dashboard/inventory/feeds",
      icon: "fish",
      roles: ["admin", "feeds"]
      // Example: Admin and feeds roles
    },
    {
      title: "Hardware Inventory",
      url: "/dashboard/inventory/hardware",
      icon: "hammer",
      roles: ["admin", "hardware"]
      // Example: Admin and hardware roles
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: "calendar",
      roles: ["admin"]
      // Example: Only admin can see bookings
    },
    {
      title: "Ponds",
      url: "/dashboard/ponds",
      icon: "fileText",
      roles: ["admin"]
      // Example: All can see ponds
    }
  ],
  administration: [
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: "briefcase",
      roles: ["admin"]
      // Example: Only admin can see employees
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: "settings",
      roles: ["admin", "feeds", "hardware"]
      // Example: All logged-in users can see settings
    },
    {
      title: "Guide / Help Section",
      url: "/dashboard/guide",
      icon: "help",
      roles: ["admin", "feeds", "hardware"]
      // Example: All can see help
    }
  ]
};
const load = async ({ locals }) => {
  const userRole = locals.user?.role || "guest";
  const filterNavItemsByRole = (items, role) => {
    return items.filter((item) => {
      if (item.roles && item.roles.length > 0) {
        return item.roles.includes(role);
      }
      return true;
    });
  };
  const filteredMainNavItems = filterNavItemsByRole(
    allNavItemsData.main,
    userRole
  );
  const filteredAdminNavItems = filterNavItemsByRole(
    allNavItemsData.administration,
    userRole
  );
  const navItemsForUser = {
    main: filteredMainNavItems,
    administration: filteredAdminNavItems
  };
  return {
    navItems: navItemsForUser,
    // Pass the filtered navigation items
    user: locals.user ? {
      name: locals.user.username,
      display_name: locals.user.display_name,
      role: locals.user.role,
      avatar: locals.user.profile_image
      // should be a string URL or base64
    } : null
    // Pass null if no user is logged in
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-f8Kr0RGE.js')).default;
const server_id = "src/routes/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.D-wuGyaP.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/B7wWqVz8.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/BDEhTM1z.js","_app/immutable/chunks/BO5sSAji.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/0urWu8Wf.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/DIvwaDiU.js","_app/immutable/chunks/CVjO-GJU.js","_app/immutable/chunks/CBm4oYYw.js","_app/immutable/chunks/D_UmtYL2.js","_app/immutable/chunks/BnoYQOO4.js","_app/immutable/chunks/6xhieDVM.js","_app/immutable/chunks/CsJL26Fh.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/BZzk2vwh.js","_app/immutable/chunks/CPRTWbuQ.js","_app/immutable/chunks/DsUCSRu3.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/CjAUM5o7.js","_app/immutable/chunks/FbqajOR9.js","_app/immutable/chunks/BOqc4mWw.js","_app/immutable/chunks/NyzMnUbZ.js","_app/immutable/chunks/q2xN3-d4.js","_app/immutable/chunks/CjnbRfgs.js","_app/immutable/chunks/BVoxSXSH.js","_app/immutable/chunks/DKjMnuhQ.js","_app/immutable/chunks/DKAGjdov.js","_app/immutable/chunks/Bex-ZZ3I.js","_app/immutable/chunks/D4LbBUVP.js","_app/immutable/chunks/CPLOLVSj.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-DrqxV5l4.js.map
