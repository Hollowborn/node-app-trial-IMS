import { r as requireRole } from './auth-D4luyh-r.js';
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
  event.depends(`app:harvest_info:${stockingId}`);
  if (!clientId || isNaN(Number(clientId)) || !stockingId || isNaN(Number(stockingId))) {
    throw error(404, "Invalid Client or Stocking ID.");
  }
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "harvest_date";
  const sortOrder = url.searchParams.get("order") || "desc";
  let harvestRecords;
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
    let harvestQuery = `
      SELECT
        id,
        stocking_id,
        harvest_date,
        actual_body_weight_g,
        culture_days,
        harvest_volume_kg,
        price_per_kg,
        notes,
        created_at,
        updated_at
      FROM harvest_info
      WHERE stocking_id = ?
    `;
    const queryParams = [stockingId];
    const searchConditions = [];
    if (search) {
      searchConditions.push(`notes LIKE ?`);
      queryParams.push(`%${search}%`);
    }
    if (searchConditions.length > 0) {
      harvestQuery += ` AND (${searchConditions.join(" OR ")})`;
    }
    const allowedSortColumns = [
      "harvest_date",
      "actual_body_weight_g",
      "culture_days",
      "harvest_volume_kg",
      "price_per_kg",
      "created_at",
      "updated_at"
    ];
    const finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : "harvest_date";
    const finalSortOrder = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";
    harvestQuery += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;
    harvestRecords = db.prepare(harvestQuery).all(...queryParams);
  } catch (error$1) {
    console.error("Error fetching harvest info or parent details:", error$1);
    throw error(
      500,
      "Failed to load harvest information. Please try again later."
    );
  }
  return {
    client: clientDetails,
    stocking: stockingDetails,
    harvestRecords: harvestRecords.map((record) => ({
      ...record,
      harvest_date: record.harvest_date ? new Date(record.harvest_date).toISOString().split("T")[0] : null,
      created_at: record.created_at ? new Date(record.created_at).toISOString().split("T")[0] : null,
      updated_at: record.updated_at ? new Date(record.updated_at).toISOString().split("T")[0] : null
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
      return fail(400, {
        error: "Invalid Stocking ID for harvest info creation."
      });
    }
    const data = await request.formData();
    const harvest_date = data.get("harvest_date")?.toString();
    const actual_body_weight_g = Number(data.get("actual_body_weight_g"));
    const culture_days = Number(data.get("culture_days"));
    const harvest_volume_kg = Number(data.get("harvest_volume_kg"));
    const price_per_kg = Number(data.get("price_per_kg"));
    const notes = data.get("notes")?.toString();
    if (!harvest_date || isNaN(actual_body_weight_g) || isNaN(culture_days) || isNaN(harvest_volume_kg) || isNaN(price_per_kg)) {
      return fail(400, {
        error: "All required fields must be valid."
      });
    }
    try {
      const insertResult = db.prepare(
        `
        INSERT INTO harvest_info (
          stocking_id, harvest_date, actual_body_weight_g, culture_days,
          harvest_volume_kg, price_per_kg, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `
      ).run(
        Number(stockingId),
        harvest_date,
        actual_body_weight_g,
        culture_days,
        harvest_volume_kg,
        price_per_kg,
        notes || null
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
      await logActivity(
        "created",
        "harvest_info",
        newID,
        `New harvest record for client "${clientName}" (Species: ${speciesName}, Harvest Date: ${harvest_date}) added.`,
        userId
      );
      return { success: true };
    } catch (error2) {
      console.error("Error creating harvest info:", error2);
      return fail(500, { error: "Failed to create harvest info." });
    }
  },
  update: async ({ request, params, locals }) => {
    const clientId = params.clientId;
    const stockingId = params.stockingId;
    if (!stockingId || isNaN(Number(stockingId))) {
      return fail(400, {
        error: "Invalid Stocking ID for harvest info update."
      });
    }
    const data = await request.formData();
    const id = Number(data.get("id"));
    const harvest_date = data.get("harvest_date")?.toString();
    const actual_body_weight_g = Number(data.get("actual_body_weight_g"));
    const culture_days = Number(data.get("culture_days"));
    const harvest_volume_kg = Number(data.get("harvest_volume_kg"));
    const price_per_kg = Number(data.get("price_per_kg"));
    const notes = data.get("notes")?.toString();
    if (isNaN(id) || !harvest_date || isNaN(actual_body_weight_g) || isNaN(culture_days) || isNaN(harvest_volume_kg) || isNaN(price_per_kg)) {
      return fail(400, {
        error: "ID and all required fields must be valid for update."
      });
    }
    try {
      const currentHarvestInfo = db.prepare(
        "SELECT harvest_date, harvest_volume_kg FROM harvest_info WHERE id = ?"
      ).get(id);
      const oldHarvestDate = currentHarvestInfo?.harvest_date || "Unknown Date";
      const oldHarvestVolume = currentHarvestInfo?.harvest_volume_kg || "Unknown Volume";
      db.prepare(
        `
        UPDATE harvest_info
        SET
          harvest_date = ?,
          actual_body_weight_g = ?,
          culture_days = ?,
          harvest_volume_kg = ?,
          price_per_kg = ?,
          notes = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND stocking_id = ?
        `
      ).run(
        harvest_date,
        actual_body_weight_g,
        culture_days,
        harvest_volume_kg,
        price_per_kg,
        notes || null,
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
      await logActivity(
        "updated",
        "harvest_info",
        id,
        `Harvest record for client "${clientName}" (Species: ${speciesName}, Old Date: ${oldHarvestDate}, Old Volume: ${oldHarvestVolume}kg) updated.`,
        userId
      );
      return { success: true };
    } catch (error2) {
      console.error("Error updating harvest info:", error2);
      return fail(500, { error: "Failed to update harvest info." });
    }
  },
  delete: async ({ request, params, locals }) => {
    const clientId = params.clientId;
    const stockingId = params.stockingId;
    if (!stockingId || isNaN(Number(stockingId))) {
      return fail(400, {
        error: "Invalid Stocking ID for harvest info deletion."
      });
    }
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (isNaN(id)) {
      return fail(400, { error: "Harvest Info ID is required." });
    }
    try {
      const harvestInfoToDelete = db.prepare(
        "SELECT harvest_date, harvest_volume_kg FROM harvest_info WHERE id = ?"
      ).get(id);
      const harvestDate = harvestInfoToDelete?.harvest_date || "Unknown Date";
      const harvestVolume = harvestInfoToDelete?.harvest_volume_kg || "Unknown Volume";
      db.prepare(
        "DELETE FROM harvest_info WHERE id = ? AND stocking_id = ?"
      ).run(id, Number(stockingId));
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
      await logActivity(
        "deleted",
        "harvest_info",
        id,
        `Harvest record for client "${clientName}" (Species: ${speciesName}, Date: ${harvestDate}, Volume: ${harvestVolume}kg) deleted.`,
        userId
      );
      return { success: true };
    } catch (error2) {
      console.error("Error deleting harvest info:", error2);
      return fail(500, { error: "Failed to delete harvest info." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DyJ_fU00.js')).default;
const server_id = "src/routes/dashboard/clients/[clientId]/stocking-info/[stockingId]/harvest-info/+page.server.ts";
const imports = ["_app/immutable/nodes/8.DNZYTw10.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/q_geWe1R.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/Cl_oq7nf.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/BUlJYItk.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/C43ptUaS.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/DOd2QSgZ.js","_app/immutable/chunks/DaJoOla_.js","_app/immutable/chunks/HUBSOgFT.js","_app/immutable/chunks/Cd7yCszS.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/BeUoQy-y.js","_app/immutable/chunks/okGsx2OR.js","_app/immutable/chunks/DQk1ANEP.js","_app/immutable/chunks/Dcluerj8.js","_app/immutable/chunks/BMspJ8Yh.js","_app/immutable/chunks/CfhtIqMF.js","_app/immutable/chunks/BBqmbskW.js","_app/immutable/chunks/D47F4gF3.js","_app/immutable/chunks/CvWd9xh1.js","_app/immutable/chunks/CkucYYup.js","_app/immutable/chunks/Jos_wYTi.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-CtX91p92.js.map
