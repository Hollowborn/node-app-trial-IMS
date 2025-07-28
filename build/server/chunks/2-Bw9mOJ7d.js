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
const component = async () => component_cache ??= (await import('./_layout.svelte-DGKAYwkJ.js')).default;
const server_id = "src/routes/dashboard/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.D-hnDbOh.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/BAa4oyvZ.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/EdVlTvtb.js","_app/immutable/chunks/oTMF8r7P.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/HFpTe9lc.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/CW0o_Oq5.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/DtIGnhnO.js","_app/immutable/chunks/BVRQx7W_.js","_app/immutable/chunks/DoL5uH6g.js","_app/immutable/chunks/CU8TJT68.js","_app/immutable/chunks/BKnMC3cJ.js","_app/immutable/chunks/OZ3l4Dmb.js","_app/immutable/chunks/Nf2oxWaI.js","_app/immutable/chunks/BkXn0r0G.js","_app/immutable/chunks/DDxGkWpc.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/Cppd9TIg.js","_app/immutable/chunks/C9JwNqn8.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-Bw9mOJ7d.js.map
