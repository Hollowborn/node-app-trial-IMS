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
const component = async () => component_cache ??= (await import('./_page.svelte-CUlqGrKg.js')).default;
const server_id = "src/routes/dashboard/inventory/hardware/+page.server.ts";
const imports = ["_app/immutable/nodes/13.CyOxvcS3.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/BO5sSAji.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/DsUCSRu3.js","_app/immutable/chunks/B7wWqVz8.js","_app/immutable/chunks/B6zvQKrV.js","_app/immutable/chunks/DwnJwU6j.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/BDEhTM1z.js","_app/immutable/chunks/79yj6mvb.js","_app/immutable/chunks/C8nz08U9.js","_app/immutable/chunks/BXiYU_fU.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/BnoYQOO4.js","_app/immutable/chunks/DG-I9f0P.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/BOqc4mWw.js","_app/immutable/chunks/FbqajOR9.js","_app/immutable/chunks/UFUhM6vw.js","_app/immutable/chunks/6xhieDVM.js","_app/immutable/chunks/CsJL26Fh.js","_app/immutable/chunks/CVjO-GJU.js","_app/immutable/chunks/DIvwaDiU.js","_app/immutable/chunks/CEVutZxn.js","_app/immutable/chunks/CPRTWbuQ.js","_app/immutable/chunks/BZzk2vwh.js","_app/immutable/chunks/0sm_qxqv.js","_app/immutable/chunks/_cz2kCqa.js","_app/immutable/chunks/CPLOLVSj.js","_app/immutable/chunks/CfmL5u39.js","_app/immutable/chunks/CTGOP75E.js","_app/immutable/chunks/DgoSFWl1.js","_app/immutable/chunks/CsSzQ2UU.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-qvz71rD-.js.map
