import { r as requireRole } from './auth-CkYXVrx8.js';
import { f as fail } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import { l as logActivity } from './activityLogger-DQXDyR0j.js';
import 'bcryptjs';
import 'better-sqlite3';
import 'path';
import 'fs';

const load = async (event) => {
  await requireRole(event, ["admin"]);
  event.depends("app:ponds");
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "pond_number";
  const sortOrder = url.searchParams.get("order") || "asc";
  let ponds;
  let pondsQuery = `
    SELECT
      id,
      pond_number,
      location,
      size_sqm,
      status,
      capacity_kg,
      notes,
      created_at,
      updated_at
    FROM ponds
  `;
  const queryParams = [];
  const searchConditions = [];
  if (search) {
    searchConditions.push(`pond_number LIKE ?`);
    queryParams.push(`%${search}%`);
    searchConditions.push(`location LIKE ?`);
    queryParams.push(`%${search}%`);
    searchConditions.push(`status LIKE ?`);
    queryParams.push(`%${search}%`);
    searchConditions.push(`notes LIKE ?`);
    queryParams.push(`%${search}%`);
  }
  if (searchConditions.length > 0) {
    pondsQuery += ` WHERE ${searchConditions.join(" OR ")}`;
  }
  const allowedSortColumns = [
    "pond_number",
    "location",
    "size_sqm",
    "status",
    "capacity_kg",
    "created_at",
    "updated_at"
  ];
  const finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : "pond_number";
  const finalSortOrder = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";
  pondsQuery += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;
  try {
    ponds = db.prepare(pondsQuery).all(...queryParams);
  } catch (error) {
    console.error("Error fetching ponds:", error);
    ponds = [];
  }
  return {
    ponds: ponds.map((pond) => ({
      ...pond,
      // Ensure dates are formatted correctly if needed for display or input
      created_at: pond.created_at ? new Date(pond.created_at).toISOString().split("T")[0] : null,
      updated_at: pond.updated_at ? new Date(pond.updated_at).toISOString().split("T")[0] : null
    })),
    search,
    sortBy: finalSortBy,
    sortOrder: sortOrder.toLowerCase()
  };
};
const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();
    const pond_number = data.get("pond_number")?.toString();
    const location = data.get("location")?.toString();
    const size_sqm = data.get("size_sqm")?.toString();
    const status = data.get("status")?.toString() || "active";
    const capacity_kg = data.get("capacity_kg")?.toString();
    const notes = data.get("notes")?.toString();
    if (!pond_number || !status) {
      return fail(400, { error: "Pond Number and Status are required." });
    }
    try {
      const result = db.prepare(
        `INSERT INTO ponds (pond_number, location, size_sqm, status, capacity_kg, notes)
           VALUES (?, ?, ?, ?, ?, ?)`
      ).run(
        pond_number,
        location || null,
        size_sqm ? parseFloat(size_sqm) : null,
        status,
        capacity_kg ? parseFloat(capacity_kg) : null,
        notes || null
      );
      const newID = Number(result.lastInsertRowid);
      const userId = locals.user?.id || null;
      await logActivity(
        "created",
        "pond",
        newID,
        `Pond "${pond_number}" added at location "${location || "N/A"}".`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error creating pond:", error);
      return fail(500, {
        error: "Failed to create pond. Ensure pond number is unique."
      });
    }
  },
  update: async ({ request, locals }) => {
    const data = await request.formData();
    const id = data.get("id")?.toString();
    const pond_number = data.get("pond_number")?.toString();
    const location = data.get("location")?.toString();
    const size_sqm = data.get("size_sqm")?.toString();
    const status = data.get("status")?.toString();
    const capacity_kg = data.get("capacity_kg")?.toString();
    const notes = data.get("notes")?.toString();
    if (!id || !pond_number || !status) {
      return fail(400, {
        error: "ID, Pond Number, and Status are required for update."
      });
    }
    try {
      const oldPond = db.prepare("SELECT pond_number, location FROM ponds WHERE id = ?").get(id);
      db.prepare(
        `UPDATE ponds
         SET pond_number = ?, location = ?, size_sqm = ?, status = ?, capacity_kg = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      ).run(
        pond_number,
        location || null,
        size_sqm ? parseFloat(size_sqm) : null,
        status,
        capacity_kg ? parseFloat(capacity_kg) : null,
        notes || null,
        id
      );
      const userId = locals.user?.id || null;
      await logActivity(
        "updated",
        "pond",
        Number(id),
        `Pond "${oldPond?.pond_number || "Unknown"}" updated. Location: "${oldPond?.location || "N/A"}" → "${location || "N/A"}".`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error updating pond:", error);
      return fail(500, {
        error: "Failed to update pond. Ensure pond number is unique."
      });
    }
  },
  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const id = data.get("id")?.toString();
    if (!id) {
      return fail(400, { error: "Pond ID is required." });
    }
    try {
      const deletedPond = db.prepare("SELECT pond_number, location FROM ponds WHERE id = ?").get(id);
      db.prepare("DELETE FROM ponds WHERE id = ?").run(id);
      const userId = locals.user?.id || null;
      await logActivity(
        "deleted",
        "pond",
        Number(id),
        `Pond "${deletedPond?.pond_number || "Unknown"}" at location "${deletedPond?.location || "N/A"}" was deleted.`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error deleting pond:", error);
      return fail(500, { error: "Failed to delete pond." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 14;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cxly86rf.js')).default;
const server_id = "src/routes/dashboard/ponds/+page.server.ts";
const imports = ["_app/immutable/nodes/14.BEgemF_C.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/BOZ4giT5.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/Bo2GsiZ3.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/CdrzcX6z.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/BVRQx7W_.js","_app/immutable/chunks/CW0o_Oq5.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/EdVlTvtb.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/DtIGnhnO.js","_app/immutable/chunks/DRgJLo_S.js","_app/immutable/chunks/B762jp4P.js","_app/immutable/chunks/Dlm0QRJp.js","_app/immutable/chunks/BAa4oyvZ.js","_app/immutable/chunks/C9JwNqn8.js","_app/immutable/chunks/C0R_oNfb.js","_app/immutable/chunks/ARt1Dh6s.js","_app/immutable/chunks/B3v1Wr7v.js","_app/immutable/chunks/Ca16gRfA.js","_app/immutable/chunks/HFpTe9lc.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=14-O2vjjUbF.js.map
