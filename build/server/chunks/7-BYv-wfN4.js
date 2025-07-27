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
  event.depends(`app:stocking_info:${clientId}`);
  if (!clientId || isNaN(Number(clientId))) {
    throw error(404, "Client not found: Invalid Client ID.");
  }
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "stocking_date";
  const sortOrder = url.searchParams.get("order") || "desc";
  let stockingInfoRecords;
  let clientDetails;
  try {
    clientDetails = db.prepare(
      "SELECT id, name, operator_type, address FROM clients WHERE id = ?"
    ).get(clientId);
    if (!clientDetails) {
      throw error(404, "Client not found.");
    }
    let stockingQuery = `
      SELECT
        id,
        client_id,
        stocking_date,
        species_name,
        fingerlings_stocked_count_ma,
        fish_size_range,
        cost,
        estimated_mortality_rate_percent,
        notes,
        created_at,
        updated_at
      FROM stocking_info
      WHERE client_id = ?
    `;
    const queryParams = [clientId];
    const searchConditions = [];
    if (search) {
      searchConditions.push(`species_name LIKE ?`);
      queryParams.push(`%${search}%`);
      searchConditions.push(`fish_size_range LIKE ?`);
      queryParams.push(`%${search}%`);
      searchConditions.push(`notes LIKE ?`);
      queryParams.push(`%${search}%`);
    }
    if (searchConditions.length > 0) {
      stockingQuery += ` AND (${searchConditions.join(" OR ")})`;
    }
    const allowedSortColumns = [
      "stocking_date",
      "species_name",
      "fingerlings_stocked_count_ma",
      "cost",
      "created_at",
      "updated_at"
    ];
    const finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : "stocking_date";
    const finalSortOrder = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";
    stockingQuery += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;
    stockingInfoRecords = db.prepare(stockingQuery).all(...queryParams);
  } catch (error$1) {
    console.error("Error fetching stocking info or client details:", error$1);
    if (error$1 instanceof Error && error$1.message.includes("not found")) {
      throw error(404, "Client or stocking info not found.");
    }
    stockingInfoRecords = [];
    clientDetails = void 0;
  }
  return {
    client: clientDetails,
    // Pass client details
    stockingInfoRecords: stockingInfoRecords.map((record) => ({
      ...record,
      stocking_date: record.stocking_date ? new Date(record.stocking_date).toISOString().split("T")[0] : null,
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
    if (!clientId || isNaN(Number(clientId))) {
      return fail(400, {
        error: "Invalid Client ID for stocking info creation."
      });
    }
    const data = await request.formData();
    const stocking_date = data.get("stocking_date")?.toString();
    const species_name = data.get("species_name")?.toString();
    const fingerlings_stocked_count_ma = Number(
      data.get("fingerlings_stocked_count_ma")
    );
    const fish_size_range = data.get("fish_size_range")?.toString();
    const cost = Number(data.get("cost"));
    const estimated_mortality_rate_percent = data.get("estimated_mortality_rate_percent")?.toString();
    const notes = data.get("notes")?.toString();
    if (!stocking_date || !species_name || isNaN(fingerlings_stocked_count_ma) || !fish_size_range || isNaN(cost)) {
      return fail(400, {
        error: "Stocking Date, Species Name, Fingerlings Stocked Count, Fish Size Range, and Cost are required and must be valid."
      });
    }
    try {
      const insertResult = db.prepare(
        // Capture insert result
        `
        INSERT INTO stocking_info (
          client_id, stocking_date, species_name, fingerlings_stocked_count_ma,
          fish_size_range, cost, estimated_mortality_rate_percent, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `
      ).run(
        Number(clientId),
        stocking_date,
        species_name,
        fingerlings_stocked_count_ma,
        fish_size_range,
        cost,
        estimated_mortality_rate_percent ? parseFloat(estimated_mortality_rate_percent) : null,
        notes || null
      );
      const newID = Number(insertResult.lastInsertRowid);
      const userId = locals.user?.id || null;
      const clientNameResult = db.prepare("SELECT name FROM clients WHERE id = ?").get(Number(clientId));
      const clientName = clientNameResult ? clientNameResult.name : "Unknown Client";
      await logActivity(
        "created",
        "stocking_info",
        newID,
        `New stocking event for client "${clientName}" (Species: ${species_name}, Count: ${fingerlings_stocked_count_ma}) added.`,
        userId
      );
      return { success: true };
    } catch (error2) {
      console.error("Error creating stocking info:", error2);
      return fail(500, { error: "Failed to create stocking info." });
    }
  },
  update: async ({ request, params, locals }) => {
    const clientId = params.clientId;
    if (!clientId || isNaN(Number(clientId))) {
      return fail(400, {
        error: "Invalid Client ID for stocking info update."
      });
    }
    const data = await request.formData();
    const id = Number(data.get("id"));
    const stocking_date = data.get("stocking_date")?.toString();
    const species_name = data.get("species_name")?.toString();
    const fingerlings_stocked_count_ma = Number(
      data.get("fingerlings_stocked_count_ma")
    );
    const fish_size_range = data.get("fish_size_range")?.toString();
    const cost = Number(data.get("cost"));
    const estimated_mortality_rate_percent = data.get("estimated_mortality_rate_percent")?.toString();
    const notes = data.get("notes")?.toString();
    if (isNaN(id) || !stocking_date || !species_name || isNaN(fingerlings_stocked_count_ma) || !fish_size_range || isNaN(cost)) {
      return fail(400, {
        error: "ID, Stocking Date, Species Name, Fingerlings Stocked Count, Fish Size Range, and Cost are required and must be valid."
      });
    }
    try {
      const currentStockingInfo = db.prepare(
        "SELECT species_name, stocking_date FROM stocking_info WHERE id = ?"
      ).get(id);
      const oldSpeciesName = currentStockingInfo?.species_name || "Unknown Species";
      const oldStockingDate = currentStockingInfo?.stocking_date || "Unknown Date";
      db.prepare(
        `
        UPDATE stocking_info
        SET
          stocking_date = ?,
          species_name = ?,
          fingerlings_stocked_count_ma = ?,
          fish_size_range = ?,
          cost = ?,
          estimated_mortality_rate_percent = ?,
          notes = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND client_id = ?
        `
      ).run(
        stocking_date,
        species_name,
        fingerlings_stocked_count_ma,
        fish_size_range,
        cost,
        estimated_mortality_rate_percent ? parseFloat(estimated_mortality_rate_percent) : null,
        notes || null,
        id,
        Number(clientId)
      );
      const userId = locals.user?.id || null;
      const clientNameResult = db.prepare("SELECT name FROM clients WHERE id = ?").get(Number(clientId));
      const clientName = clientNameResult ? clientNameResult.name : "Unknown Client";
      await logActivity(
        "updated",
        "stocking_info",
        id,
        `Stocking event for client "${clientName}" (Species: ${oldSpeciesName}, Date: ${oldStockingDate}) updated.`,
        userId
      );
      return { success: true };
    } catch (error2) {
      console.error("Error updating stocking info:", error2);
      return fail(500, { error: "Failed to update stocking info." });
    }
  },
  delete: async ({ request, params, locals }) => {
    const clientId = params.clientId;
    if (!clientId || isNaN(Number(clientId))) {
      return fail(400, {
        error: "Invalid Client ID for stocking info deletion."
      });
    }
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (isNaN(id)) {
      return fail(400, { error: "Stocking Info ID is required." });
    }
    try {
      const stockingInfoToDelete = db.prepare(
        "SELECT species_name, stocking_date FROM stocking_info WHERE id = ?"
      ).get(id);
      const speciesName = stockingInfoToDelete?.species_name || "Unknown Species";
      const stockingDate = stockingInfoToDelete?.stocking_date || "Unknown Date";
      db.prepare(
        "DELETE FROM stocking_info WHERE id = ? AND client_id = ?"
      ).run(id, Number(clientId));
      const userId = locals.user?.id || null;
      const clientNameResult = db.prepare("SELECT name FROM clients WHERE id = ?").get(Number(clientId));
      const clientName = clientNameResult ? clientNameResult.name : "Unknown Client";
      await logActivity(
        "deleted",
        "stocking_info",
        id,
        `Stocking event for client "${clientName}" (Species: ${speciesName}, Date: ${stockingDate}) deleted.`,
        userId
      );
      return { success: true };
    } catch (error2) {
      console.error("Error deleting stocking info:", error2);
      return fail(500, { error: "Failed to delete stocking info." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DhbxUJ8Q.js')).default;
const server_id = "src/routes/dashboard/clients/[clientId]/stocking-info/+page.server.ts";
const imports = ["_app/immutable/nodes/7.CcRAfBXo.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/Dl7G6IOE.js","_app/immutable/chunks/DiJvn89z.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/Bo2GsiZ3.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/CdrzcX6z.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/BVRQx7W_.js","_app/immutable/chunks/CW0o_Oq5.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/EdVlTvtb.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/DtIGnhnO.js","_app/immutable/chunks/DRgJLo_S.js","_app/immutable/chunks/Dlm0QRJp.js","_app/immutable/chunks/BAa4oyvZ.js","_app/immutable/chunks/C9JwNqn8.js","_app/immutable/chunks/jrVE8UPr.js","_app/immutable/chunks/C0R_oNfb.js","_app/immutable/chunks/ARt1Dh6s.js","_app/immutable/chunks/B3v1Wr7v.js","_app/immutable/chunks/OZ3l4Dmb.js","_app/immutable/chunks/HFpTe9lc.js","_app/immutable/chunks/esl9IfTG.js","_app/immutable/chunks/DgaOHvE-.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-BYv-wfN4.js.map
