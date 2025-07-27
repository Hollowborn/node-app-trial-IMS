import { r as requireRole } from './auth-CkYXVrx8.js';
import { f as fail } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import { l as logActivity } from './activityLogger-DQXDyR0j.js';
import 'bcryptjs';
import 'better-sqlite3';
import 'path';
import 'fs';

const load = async (event) => {
  await requireRole(event, ["admin", "hardware"]);
  event.depends("app:hardware_inventory");
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "created_at";
  const sortOrder = url.searchParams.get("order") || "desc";
  let hardwareItems;
  let query = `
    SELECT
      hi.id,
      hi.item_name,
      hi.quantity,
      hi.cost,
      hi.total_cost,
      hi.assigned_to,
      e.name AS assigned_to_name,
      hi.date_requested,
      hi.created_at -- Explicitly select created_at from hardware_inventory
    FROM hardware_inventory AS hi
    LEFT JOIN employees AS e ON hi.assigned_to = e.id
  `;
  const params = [];
  if (search) {
    query += `
      WHERE hi.item_name LIKE ? OR e.name LIKE ?
    `;
    params.push(`%${search}%`, `%${search}%`);
  }
  const validSortColumns = [
    "item_name",
    "quantity",
    "cost",
    "date_requested",
    "created_at",
    "assigned_to_name"
  ];
  const validSortOrders = ["asc", "desc"];
  const safeSortBy = validSortColumns.includes(sortBy) ? sortBy : "created_at";
  const safeSortOrder = validSortOrders.includes(sortOrder.toLowerCase()) ? sortOrder.toUpperCase() : "DESC";
  query += ` ORDER BY ${safeSortBy === "created_at" ? "hi.created_at" : safeSortBy} ${safeSortOrder}`;
  try {
    if (params.length > 0) {
      hardwareItems = db.prepare(query).all(...params);
    } else {
      hardwareItems = db.prepare(query).all();
    }
  } catch (error) {
    console.error("Error fetching hardware inventory:", error);
    hardwareItems = [];
  }
  let employees = [];
  try {
    employees = db.prepare("SELECT id, name FROM employees ORDER BY name ASC").all();
  } catch (error) {
    console.error("Error fetching employees for dropdown:", error);
  }
  return {
    hardwareItems: hardwareItems.map((item) => ({
      ...item,
      date_requested: item.date_requested ? new Date(item.date_requested).toISOString().split("T")[0] : null
    })),
    employees,
    search,
    sortBy: safeSortBy,
    sortOrder: safeSortOrder
  };
};
const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();
    const item_name = data.get("item_name")?.toString();
    const quantity = Number(data.get("quantity"));
    const cost = Number(data.get("cost"));
    const assigned_to = data.get("assigned_to") ? Number(data.get("assigned_to")) : null;
    const date_requested = data.get("date_requested")?.toString();
    if (!item_name || isNaN(quantity) || isNaN(cost) || !date_requested) {
      return fail(400, {
        error: "Item name, quantity, cost, and date requested are required and must be valid."
      });
    }
    try {
      const transactionResult = db.transaction(() => {
        const insertResult = db.prepare(
          `
            INSERT INTO hardware_inventory (item_name, quantity, cost, assigned_to, date_requested)
            VALUES (?, ?, ?, ?, ?)
          `
        ).run(item_name, quantity, cost, assigned_to, date_requested);
        const newID = Number(insertResult.lastInsertRowid);
        const userId = locals.user?.id || null;
        logActivity(
          "created",
          "hardware_item",
          newID,
          `New hardware item "${item_name}" added with quantity ${quantity}.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error creating hardware item:", error);
      return fail(500, { error: "Failed to create hardware item." });
    }
  },
  update: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    const item_name = data.get("item_name")?.toString();
    const quantity = Number(data.get("quantity"));
    const cost = Number(data.get("cost"));
    const assigned_to = data.get("assigned_to") ? Number(data.get("assigned_to")) : null;
    const date_requested = data.get("date_requested")?.toString();
    if (isNaN(id) || !item_name || isNaN(quantity) || isNaN(cost) || !date_requested) {
      return fail(400, {
        error: "ID, item name, quantity, cost, and date requested are required and must be valid."
      });
    }
    try {
      const transactionResult = db.transaction(() => {
        const currentItem = db.prepare(
          "SELECT item_name, quantity FROM hardware_inventory WHERE id = ?"
        ).get(id);
        const oldName = currentItem?.item_name || "Unknown Item";
        const oldQty = currentItem?.quantity || 0;
        db.prepare(
          `
          UPDATE hardware_inventory
          SET item_name = ?, quantity = ?, cost = ?, assigned_to = ?, date_requested = ?
          WHERE id = ?
        `
        ).run(item_name, quantity, cost, assigned_to, date_requested, id);
        const userId = locals.user?.id || null;
        logActivity(
          "updated",
          "hardware_item",
          id,
          `Hardware item "${oldName}" (Old Qty: ${oldQty}) updated to "${item_name}" with quantity ${quantity}.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error updating hardware item:", error);
      return fail(500, { error: "Failed to update hardware item." });
    }
  },
  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (isNaN(id)) {
      return fail(400, { error: "Hardware item ID is required." });
    }
    try {
      const transactionResult = db.transaction(() => {
        const itemToDelete = db.prepare(
          "SELECT item_name, quantity FROM hardware_inventory WHERE id = ?"
        ).get(id);
        const name = itemToDelete?.item_name || "Unknown Item";
        const qty = itemToDelete?.quantity || 0;
        db.prepare("DELETE FROM hardware_inventory WHERE id = ?").run(id);
        const userId = locals.user?.id || null;
        logActivity(
          "deleted",
          "hardware_item",
          id,
          `Hardware item "${name}" with quantity ${qty} was deleted.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error deleting hardware item:", error);
      return fail(500, { error: "Failed to delete hardware item." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DCK_OLdx.js')).default;
const server_id = "src/routes/dashboard/inventory/hardware/+page.server.ts";
const imports = ["_app/immutable/nodes/13.BZTSkLHg.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/Dl7G6IOE.js","_app/immutable/chunks/DiJvn89z.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/Bo2GsiZ3.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/CdrzcX6z.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/BVRQx7W_.js","_app/immutable/chunks/CW0o_Oq5.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/EdVlTvtb.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/DtIGnhnO.js","_app/immutable/chunks/DRgJLo_S.js","_app/immutable/chunks/B762jp4P.js","_app/immutable/chunks/Dlm0QRJp.js","_app/immutable/chunks/C9JwNqn8.js","_app/immutable/chunks/C0R_oNfb.js","_app/immutable/chunks/ARt1Dh6s.js","_app/immutable/chunks/B3v1Wr7v.js","_app/immutable/chunks/nTpf8bzQ.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-QiOM6PvK.js.map
