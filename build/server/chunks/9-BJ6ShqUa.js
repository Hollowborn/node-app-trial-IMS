import { r as requireRole } from './auth-CkYXVrx8.js';
import { f as fail, e as error } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import { l as logActivity } from './activityLogger-DQXDyR0j.js';
import 'bcryptjs';
import 'better-sqlite3';
import 'path';
import 'fs';

const load = async (event) => {
  await requireRole(event, ["admin"]);
  const clientId = event.params.clientId;
  const stockingId = event.params.stockingId;
  event.depends(`app:sales:${stockingId}`);
  if (!clientId || isNaN(Number(clientId)) || !stockingId || isNaN(Number(stockingId))) {
    throw error(404, "Invalid Client or Stocking ID.");
  }
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "created_at";
  const sortOrder = url.searchParams.get("order") || "desc";
  let salesRecords;
  let stockingDetails;
  let clientDetails;
  try {
    clientDetails = db.prepare("SELECT id, name FROM clients WHERE id = ?").get(clientId);
    if (!clientDetails) {
      throw error(404, "Client not found.");
    }
    stockingDetails = db.prepare(
      "SELECT id, client_id, stocking_date, species_name, fingerlings_stocked_count_ma FROM stocking_info WHERE id = ? AND client_id = ?"
    ).get(stockingId, clientId);
    if (!stockingDetails) {
      throw error(404, "Stocking record not found for this client.");
    }
    let salesQuery = `
      SELECT
        id,
        stocking_id,
        estimated_sales,
        projected_amount,
        feeds_used_kg,
        feed_cost,
        remarks,
        created_at
      FROM sales
      WHERE stocking_id = ?
    `;
    const queryParams = [stockingId];
    const searchConditions = [];
    if (search) {
      searchConditions.push(`remarks LIKE ?`);
      queryParams.push(`%${search}%`);
    }
    if (searchConditions.length > 0) {
      salesQuery += ` AND (${searchConditions.join(" OR ")})`;
    }
    const allowedSortColumns = [
      "estimated_sales",
      "projected_amount",
      "feeds_used_kg",
      "feed_cost",
      "created_at"
      // "updated_at", // Removed
    ];
    const finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : "created_at";
    const finalSortOrder = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";
    salesQuery += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;
    salesRecords = db.prepare(salesQuery).all(...queryParams);
  } catch (error$1) {
    console.error("Error fetching sales info or parent details:", error$1);
    throw error(
      500,
      "Failed to load sales information. Please try again later."
    );
  }
  return {
    client: clientDetails,
    stocking: stockingDetails,
    salesRecords: salesRecords.map((record) => ({
      ...record,
      created_at: record.created_at ? new Date(record.created_at).toISOString().split("T")[0] : null
      // updated_at: record.updated_at ? new Date(record.updated_at).toISOString().split("T")[0] : null, // Removed
    })),
    search,
    sortBy,
    sortOrder: sortOrder.toLowerCase()
  };
};
const actions = {
  create: async ({ request, params, locals }) => {
    const clientId = params.clientId;
    const stockingId = params.stockingId;
    if (!stockingId || isNaN(Number(stockingId))) {
      return fail(400, { error: "Invalid Stocking ID for sales creation." });
    }
    const data = await request.formData();
    const estimated_sales = Number(data.get("estimated_sales"));
    const projected_amount = Number(data.get("projected_amount"));
    const feeds_used_kg = Number(data.get("feeds_used_kg"));
    const feed_cost = Number(data.get("feed_cost"));
    const remarks = data.get("remarks")?.toString();
    if (isNaN(estimated_sales) || isNaN(projected_amount) || isNaN(feeds_used_kg) || isNaN(feed_cost)) {
      return fail(400, {
        error: "Estimated Sales, Projected Amount, Feeds Used (kg), and Feed Cost are required and must be valid numbers."
      });
    }
    try {
      const transactionResult = db.transaction(() => {
        const insertResult = db.prepare(
          `
          INSERT INTO sales (
            stocking_id, estimated_sales, projected_amount, feeds_used_kg,
            feed_cost, remarks
          ) VALUES (?, ?, ?, ?, ?, ?)
          `
        ).run(
          Number(stockingId),
          estimated_sales,
          projected_amount,
          feeds_used_kg,
          feed_cost,
          remarks || null
        );
        const newID = Number(insertResult.lastInsertRowid);
        const userId = locals.user?.id || null;
        const clientStockingDetails = db.prepare(
          `
          SELECT c.name AS client_name, si.species_name
          FROM stocking_info si
          JOIN clients c ON si.client_id = c.id
          WHERE si.id = ? AND si.client_id = ?
        `
        ).get(Number(stockingId), Number(clientId));
        const clientName = clientStockingDetails?.client_name || "Unknown Client";
        const speciesName = clientStockingDetails?.species_name || "Unknown Species";
        logActivity(
          // Await is not needed here if logActivity is synchronous or handled by the transaction
          "created",
          "sales",
          newID,
          `New sales record for client "${clientName}" (Species: ${speciesName}, Estimated Sales: ${estimated_sales}) added.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error2) {
      console.error("Error creating sales record:", error2);
      return fail(500, { error: "Failed to create sales record." });
    }
  },
  update: async ({ request, params, locals }) => {
    const clientId = params.clientId;
    const stockingId = params.stockingId;
    if (!stockingId || isNaN(Number(stockingId))) {
      return fail(400, { error: "Invalid Stocking ID for sales update." });
    }
    const data = await request.formData();
    const id = Number(data.get("id"));
    const estimated_sales = Number(data.get("estimated_sales"));
    const projected_amount = Number(data.get("projected_amount"));
    const feeds_used_kg = Number(data.get("feeds_used_kg"));
    const feed_cost = Number(data.get("feed_cost"));
    const remarks = data.get("remarks")?.toString();
    if (isNaN(id) || isNaN(estimated_sales) || isNaN(projected_amount) || isNaN(feeds_used_kg) || isNaN(feed_cost)) {
      return fail(400, {
        error: "ID and all required fields must be valid for update."
      });
    }
    try {
      const transactionResult = db.transaction(() => {
        const currentSalesRecord = db.prepare(
          "SELECT estimated_sales, projected_amount FROM sales WHERE id = ?"
        ).get(id);
        const oldEstimatedSales = currentSalesRecord?.estimated_sales || 0;
        const oldProjectedAmount = currentSalesRecord?.projected_amount || 0;
        db.prepare(
          `
          UPDATE sales
          SET
            estimated_sales = ?,
            projected_amount = ?,
            feeds_used_kg = ?,
            feed_cost = ?,
            remarks = ?
            -- updated_at = CURRENT_TIMESTAMP // Removed
          WHERE id = ? AND stocking_id = ?
          `
        ).run(
          estimated_sales,
          projected_amount,
          feeds_used_kg,
          feed_cost,
          remarks || null,
          id,
          Number(stockingId)
        );
        const userId = locals.user?.id || null;
        const clientStockingDetails = db.prepare(
          `
          SELECT c.name AS client_name, si.species_name
          FROM stocking_info si
          JOIN clients c ON si.client_id = c.id
          WHERE si.id = ? AND si.client_id = ?
        `
        ).get(Number(stockingId), Number(clientId));
        const clientName = clientStockingDetails?.client_name || "Unknown Client";
        const speciesName = clientStockingDetails?.species_name || "Unknown Species";
        logActivity(
          "updated",
          "sales",
          id,
          `Sales record for client "${clientName}" (Species: ${speciesName}, Old Estimated Sales: ${oldEstimatedSales}, Old Projected Amount: ${oldProjectedAmount}) updated.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error2) {
      console.error("Error updating sales record:", error2);
      return fail(500, { error: "Failed to update sales record." });
    }
  },
  delete: async ({ request, params, locals }) => {
    const clientId = params.clientId;
    const stockingId = params.stockingId;
    if (!stockingId || isNaN(Number(stockingId))) {
      return fail(400, { error: "Invalid Stocking ID for sales deletion." });
    }
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (isNaN(id)) {
      return fail(400, { error: "Sales ID is required." });
    }
    try {
      const transactionResult = db.transaction(() => {
        const salesRecordToDelete = db.prepare(
          "SELECT estimated_sales, projected_amount FROM sales WHERE id = ?"
        ).get(id);
        const estimatedSales = salesRecordToDelete?.estimated_sales || 0;
        const projectedAmount = salesRecordToDelete?.projected_amount || 0;
        db.prepare("DELETE FROM sales WHERE id = ? AND stocking_id = ?").run(
          id,
          Number(stockingId)
        );
        const userId = locals.user?.id || null;
        const clientStockingDetails = db.prepare(
          `
          SELECT c.name AS client_name, si.species_name
          FROM stocking_info si
          JOIN clients c ON si.client_id = c.id
          WHERE si.id = ? AND si.client_id = ?
        `
        ).get(Number(stockingId), Number(clientId));
        const clientName = clientStockingDetails?.client_name || "Unknown Client";
        const speciesName = clientStockingDetails?.species_name || "Unknown Species";
        logActivity(
          "deleted",
          "sales",
          id,
          `Sales record for client "${clientName}" (Species: ${speciesName}, Estimated Sales: ${estimatedSales}, Projected Amount: ${projectedAmount}) deleted.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error2) {
      console.error("Error deleting sales record:", error2);
      return fail(500, { error: "Failed to delete sales record." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-75N81e9i.js')).default;
const server_id = "src/routes/dashboard/clients/[clientId]/stocking-info/[stockingId]/sales/+page.server.ts";
const imports = ["_app/immutable/nodes/9.DndEJ7g8.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/BO5sSAji.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/DsUCSRu3.js","_app/immutable/chunks/B7wWqVz8.js","_app/immutable/chunks/B6zvQKrV.js","_app/immutable/chunks/DwnJwU6j.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/BDEhTM1z.js","_app/immutable/chunks/79yj6mvb.js","_app/immutable/chunks/C8nz08U9.js","_app/immutable/chunks/BXiYU_fU.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/BnoYQOO4.js","_app/immutable/chunks/DG-I9f0P.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/BOqc4mWw.js","_app/immutable/chunks/FbqajOR9.js","_app/immutable/chunks/UFUhM6vw.js","_app/immutable/chunks/6xhieDVM.js","_app/immutable/chunks/CsJL26Fh.js","_app/immutable/chunks/CVjO-GJU.js","_app/immutable/chunks/DIvwaDiU.js","_app/immutable/chunks/CEVutZxn.js","_app/immutable/chunks/CPRTWbuQ.js","_app/immutable/chunks/BZzk2vwh.js","_app/immutable/chunks/_cz2kCqa.js","_app/immutable/chunks/0urWu8Wf.js","_app/immutable/chunks/CPLOLVSj.js","_app/immutable/chunks/eT-nG_na.js","_app/immutable/chunks/CfmL5u39.js","_app/immutable/chunks/CTGOP75E.js","_app/immutable/chunks/DgoSFWl1.js","_app/immutable/chunks/D_UmtYL2.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-BJ6ShqUa.js.map
