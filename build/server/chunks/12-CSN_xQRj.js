import { r as requireRole } from './auth-CkYXVrx8.js';
import { f as fail } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import { l as logActivity } from './activityLogger-DQXDyR0j.js';
import 'bcryptjs';
import 'better-sqlite3';
import 'path';
import 'fs';

const load = async (event) => {
  await requireRole(event, ["admin", "feeds"]);
  event.depends("app:feed_inventory");
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "created_at";
  const sortOrder = url.searchParams.get("order") || "desc";
  let feedItems;
  let query = `
    SELECT
      fi.id,
      fi.feed_name,
      fi.feed_stage,
      fi.current_stock_kg,
      fi.quantity_kg,
      fi.cost_per_unit,
      fi.total_cost,
      fi.requested_by,
      e.name AS requested_by_name,
      fi.date,
      fi.created_at -- Explicitly select created_at from feed_inventory
    FROM feed_inventory AS fi
    LEFT JOIN employees AS e ON fi.requested_by = e.id
  `;
  const params = [];
  if (search) {
    query += `
      WHERE (
        fi.feed_name LIKE ? OR
        fi.feed_stage LIKE ? OR
        e.name LIKE ?
      )
      OR e.name IS NULL -- <--- IMPORTANT: This condition does NOT take a parameter
    `;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  const validSortColumns = [
    "feed_name",
    "feed_stage",
    "quantity_kg",
    "cost_per_unit",
    "date",
    "created_at",
    "requested_by_name"
  ];
  const validSortOrders = ["asc", "desc"];
  const safeSortBy = validSortColumns.includes(sortBy) ? sortBy : "created_at";
  const safeSortOrder = validSortOrders.includes(sortOrder.toLowerCase()) ? sortOrder.toUpperCase() : "DESC";
  query += ` ORDER BY ${safeSortBy === "created_at" ? "fi.created_at" : safeSortBy} ${safeSortOrder}`;
  try {
    if (params.length > 0) {
      feedItems = db.prepare(query).all(...params);
    } else {
      feedItems = db.prepare(query).all();
    }
  } catch (error) {
    console.error("Error fetching feed inventory:", error);
    feedItems = [];
  }
  let employees = [];
  try {
    employees = db.prepare("SELECT id, name FROM employees ORDER BY name ASC").all();
  } catch (error) {
    console.error("Error fetching employees for dropdown:", error);
  }
  return {
    feedItems: feedItems.map((item) => ({
      ...item,
      date: item.date ? new Date(item.date).toISOString().split("T")[0] : null
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
    const feed_name = data.get("feed_name")?.toString();
    const feed_stage = data.get("feed_stage")?.toString();
    const current_stock_kg = Number(data.get("current_stock_kg"));
    const quantity_kg = Number(data.get("quantity_kg"));
    const cost_per_unit = Number(data.get("cost_per_unit"));
    const requested_by = data.get("requested_by") ? Number(data.get("requested_by")) : null;
    const date = data.get("date")?.toString();
    if (!feed_name || !feed_stage || isNaN(current_stock_kg) || isNaN(quantity_kg) || isNaN(cost_per_unit) || !date) {
      return fail(400, {
        error: "All fields are required and must be valid."
      });
    }
    try {
      const transactionResult = db.transaction(() => {
        const insertResult = db.prepare(
          `
          INSERT INTO feed_inventory (feed_name, feed_stage, current_stock_kg, quantity_kg, cost_per_unit, requested_by, date)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          `
        ).run(
          feed_name,
          feed_stage,
          current_stock_kg,
          quantity_kg,
          cost_per_unit,
          requested_by,
          date
        );
        const newID = Number(insertResult.lastInsertRowid);
        const userId = locals.user?.id || null;
        logActivity(
          "created",
          "feed_item",
          newID,
          `New feed item "${feed_name}" (Stage: ${feed_stage}, Quantity: ${quantity_kg}kg) added.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error creating feed item:", error);
      return fail(500, { error: "Failed to create feed item." });
    }
  },
  update: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    const feed_name = data.get("feed_name")?.toString();
    const feed_stage = data.get("feed_stage")?.toString();
    const current_stock_kg = Number(data.get("current_stock_kg"));
    const quantity_kg = Number(data.get("quantity_kg"));
    const cost_per_unit = Number(data.get("cost_per_unit"));
    const requested_by = data.get("requested_by") ? Number(data.get("requested_by")) : null;
    const date = data.get("date")?.toString();
    if (isNaN(id) || !feed_name || !feed_stage || isNaN(current_stock_kg) || isNaN(quantity_kg) || isNaN(cost_per_unit) || !date) {
      return fail(400, {
        error: "All fields are required and must be valid."
      });
    }
    try {
      const transactionResult = db.transaction(() => {
        const currentFeedItem = db.prepare(
          "SELECT feed_name, feed_stage, current_stock_kg FROM feed_inventory WHERE id = ?"
        ).get(id);
        const oldFeedName = currentFeedItem?.feed_name || "Unknown Feed";
        const oldFeedStage = currentFeedItem?.feed_stage || "Unknown Stage";
        const oldQuantity = currentFeedItem?.current_stock_kg || 0;
        db.prepare(
          `
          UPDATE feed_inventory
          SET feed_name = ?, feed_stage = ?,  current_stock_kg = ?, quantity_kg = ?, cost_per_unit = ?, requested_by = ?, date = ?
          WHERE id = ?
          `
        ).run(
          feed_name,
          feed_stage,
          current_stock_kg,
          quantity_kg,
          cost_per_unit,
          requested_by,
          date,
          id
        );
        const userId = locals.user?.id || null;
        logActivity(
          "updated",
          "feed_item",
          id,
          `Feed item "${oldFeedName}" (Stage: ${oldFeedStage}, Old Quantity: ${oldQuantity}kg) updated.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error updating feed item:", error);
      return fail(500, { error: "Failed to update feed item." });
    }
  },
  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (isNaN(id)) {
      return fail(400, { error: "Feed item ID is required." });
    }
    try {
      const transactionResult = db.transaction(() => {
        const feedItemToDelete = db.prepare(
          "SELECT feed_name, feed_stage, current_stock_kg FROM feed_inventory WHERE id = ?"
        ).get(id);
        const feedName = feedItemToDelete?.feed_name || "Unknown Feed";
        const feedStage = feedItemToDelete?.feed_stage || "Unknown Stage";
        const quantity = feedItemToDelete?.current_stock_kg || 0;
        db.prepare("DELETE FROM feed_inventory WHERE id = ?").run(id);
        const userId = locals.user?.id || null;
        logActivity(
          "deleted",
          "feed_item",
          id,
          `Feed item "${feedName}" (Stage: ${feedStage}, Quantity: ${quantity}kg) deleted.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error deleting feed item:", error);
      return fail(500, { error: "Failed to delete feed item." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B-tDNhKM.js')).default;
const server_id = "src/routes/dashboard/inventory/feeds/+page.server.ts";
const imports = ["_app/immutable/nodes/12.CIN5Z7kn.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/Dl7G6IOE.js","_app/immutable/chunks/DiJvn89z.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/Bo2GsiZ3.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/CdrzcX6z.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/BVRQx7W_.js","_app/immutable/chunks/CW0o_Oq5.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/EdVlTvtb.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/DtIGnhnO.js","_app/immutable/chunks/DRgJLo_S.js","_app/immutable/chunks/B762jp4P.js","_app/immutable/chunks/Dlm0QRJp.js","_app/immutable/chunks/C9JwNqn8.js","_app/immutable/chunks/C0R_oNfb.js","_app/immutable/chunks/ARt1Dh6s.js","_app/immutable/chunks/B3v1Wr7v.js","_app/immutable/chunks/nTpf8bzQ.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-CSN_xQRj.js.map
