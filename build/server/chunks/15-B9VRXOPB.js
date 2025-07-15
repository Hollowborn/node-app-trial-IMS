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
  const pondId = event.params.pondId;
  event.depends(`app:production_reports:${pondId}`);
  if (!pondId || isNaN(Number(pondId))) {
    throw error(404, "Pond not found: Invalid Pond ID.");
  }
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "report_date";
  const sortOrder = url.searchParams.get("order") || "desc";
  let reports;
  let pondDetails;
  try {
    pondDetails = db.prepare(
      "SELECT id, pond_number, location, status FROM ponds WHERE id = ?"
    ).get(pondId);
    if (!pondDetails) {
      throw error(404, "Pond not found.");
    }
    let reportsQuery = `
      SELECT
        id,
        pond_id,
        species_name,
        report_date,
        total_harvest_weight_kg,
        total_harvest_count,
        average_fish_weight_g,
        mortality_count,
        feed_consumed_kg,
        notes,
        created_at,
        updated_at
      FROM production_reports
      WHERE pond_id = ?
    `;
    const queryParams = [pondId];
    const searchConditions = [];
    if (search) {
      searchConditions.push(`species_name LIKE ?`);
      queryParams.push(`%${search}%`);
      searchConditions.push(`notes LIKE ?`);
      queryParams.push(`%${search}%`);
    }
    if (searchConditions.length > 0) {
      reportsQuery += ` AND (${searchConditions.join(" OR ")})`;
    }
    const allowedSortColumns = [
      "report_date",
      "species_name",
      "total_harvest_weight_kg",
      "total_harvest_count",
      "mortality_count",
      "feed_consumed_kg",
      "created_at",
      "updated_at"
    ];
    const finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : "report_date";
    const finalSortOrder = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";
    reportsQuery += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;
    reports = db.prepare(reportsQuery).all(...queryParams);
  } catch (error$1) {
    console.error("Error fetching production reports or pond details:", error$1);
    if (error$1 instanceof Error && error$1.message.includes("not found")) {
      throw error(404, "Pond or reports not found.");
    }
    reports = [];
    pondDetails = void 0;
  }
  return {
    pond: pondDetails,
    // Pass pond details
    reports: reports.map((report) => ({
      ...report,
      report_date: report.report_date ? new Date(report.report_date).toISOString().split("T")[0] : null,
      created_at: report.created_at ? new Date(report.created_at).toISOString().split("T")[0] : null,
      updated_at: report.updated_at ? new Date(report.updated_at).toISOString().split("T")[0] : null
    })),
    search,
    sortBy,
    // Return original sortBy for client-side logic
    sortOrder: sortOrder.toLowerCase()
  };
};
const actions = {
  create: async ({ request, params, locals }) => {
    const pondId = params.pondId;
    if (!pondId || isNaN(Number(pondId))) {
      return fail(400, { error: "Invalid Pond ID for report creation." });
    }
    const data = await request.formData();
    const species_name = data.get("species_name")?.toString();
    const report_date = data.get("report_date")?.toString();
    const total_harvest_weight_kg = data.get("total_harvest_weight_kg")?.toString();
    const total_harvest_count = data.get("total_harvest_count")?.toString();
    const average_fish_weight_g = data.get("average_fish_weight_g")?.toString();
    const mortality_count = data.get("mortality_count")?.toString();
    const feed_consumed_kg = data.get("feed_consumed_kg")?.toString();
    const notes = data.get("notes")?.toString();
    if (!species_name || !report_date) {
      return fail(400, {
        error: "Species Name and Report Date are required."
      });
    }
    try {
      const transaction = db.transaction(() => {
        const result = db.prepare(
          `
          INSERT INTO production_reports (
            pond_id, species_name, report_date, total_harvest_weight_kg,
            total_harvest_count, average_fish_weight_g, mortality_count,
            feed_consumed_kg, notes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        ).run(
          Number(pondId),
          species_name,
          report_date,
          total_harvest_weight_kg ? parseFloat(total_harvest_weight_kg) : null,
          total_harvest_count ? parseInt(total_harvest_count) : null,
          average_fish_weight_g ? parseFloat(average_fish_weight_g) : null,
          mortality_count ? parseInt(mortality_count) : 0,
          feed_consumed_kg ? parseFloat(feed_consumed_kg) : null,
          notes || null
        );
        const reportId = Number(result.lastInsertRowid);
        const userId = locals.user?.id || null;
        logActivity(
          "created",
          "production_report",
          reportId,
          `Created production report for pond ID ${pondId} - Species: ${species_name}, Date: ${report_date}`,
          userId
        );
        return { success: true };
      });
      return transaction();
    } catch (error2) {
      console.error("Error creating production report:", error2);
      return fail(500, { error: "Failed to create production report." });
    }
  },
  update: async ({ request, params, locals }) => {
    const pondId = params.pondId;
    if (!pondId || isNaN(Number(pondId))) {
      return fail(400, { error: "Invalid Pond ID for report update." });
    }
    const data = await request.formData();
    const id = data.get("id")?.toString();
    const species_name = data.get("species_name")?.toString();
    const report_date = data.get("report_date")?.toString();
    const total_harvest_weight_kg = data.get("total_harvest_weight_kg")?.toString();
    const total_harvest_count = data.get("total_harvest_count")?.toString();
    const average_fish_weight_g = data.get("average_fish_weight_g")?.toString();
    const mortality_count = data.get("mortality_count")?.toString();
    const feed_consumed_kg = data.get("feed_consumed_kg")?.toString();
    const notes = data.get("notes")?.toString();
    if (!id || !species_name || !report_date) {
      return fail(400, {
        error: "ID, Species Name, and Report Date are required for update."
      });
    }
    try {
      const transaction = db.transaction(() => {
        db.prepare(
          `
          UPDATE production_reports
          SET species_name = ?, report_date = ?, total_harvest_weight_kg = ?,
              total_harvest_count = ?, average_fish_weight_g = ?, mortality_count = ?,
              feed_consumed_kg = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ? AND pond_id = ?
        `
        ).run(
          species_name,
          report_date,
          total_harvest_weight_kg ? parseFloat(total_harvest_weight_kg) : null,
          total_harvest_count ? parseInt(total_harvest_count) : null,
          average_fish_weight_g ? parseFloat(average_fish_weight_g) : null,
          mortality_count ? parseInt(mortality_count) : 0,
          feed_consumed_kg ? parseFloat(feed_consumed_kg) : null,
          notes || null,
          id,
          Number(pondId)
        );
        const userId = locals.user?.id || null;
        logActivity(
          "updated",
          "production_report",
          Number(id),
          `Updated production report ID ${id} for pond ID ${pondId} - Species: ${species_name}`,
          userId
        );
        return { success: true };
      });
      return transaction();
    } catch (error2) {
      console.error("Error updating production report:", error2);
      return fail(500, { error: "Failed to update production report." });
    }
  },
  delete: async ({ request, params, locals }) => {
    const pondId = params.pondId;
    if (!pondId || isNaN(Number(pondId))) {
      return fail(400, { error: "Invalid Pond ID for report deletion." });
    }
    const data = await request.formData();
    const id = data.get("id")?.toString();
    if (!id) {
      return fail(400, { error: "Report ID is required." });
    }
    try {
      const transaction = db.transaction(() => {
        const old = db.prepare("SELECT species_name FROM production_reports WHERE id = ?").get(id);
        db.prepare(
          "DELETE FROM production_reports WHERE id = ? AND pond_id = ?"
        ).run(id, Number(pondId));
        const userId = locals.user?.id || null;
        logActivity(
          "deleted",
          "production_report",
          Number(id),
          `Deleted production report ID ${id} for pond ID ${pondId} (Species: ${old?.species_name ?? "Unknown"})`,
          userId
        );
        return { success: true };
      });
      return transaction();
    } catch (error2) {
      console.error("Error deleting production report:", error2);
      return fail(500, { error: "Failed to delete production report." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DEbnuq0L.js')).default;
const server_id = "src/routes/dashboard/ponds/[pondId]/+page.server.ts";
const imports = ["_app/immutable/nodes/15.BkU1bfeE.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/q_geWe1R.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/Cl_oq7nf.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/BUlJYItk.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/C43ptUaS.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/DOd2QSgZ.js","_app/immutable/chunks/DaJoOla_.js","_app/immutable/chunks/HUBSOgFT.js","_app/immutable/chunks/Cd7yCszS.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/BeUoQy-y.js","_app/immutable/chunks/okGsx2OR.js","_app/immutable/chunks/DQk1ANEP.js","_app/immutable/chunks/Dcluerj8.js","_app/immutable/chunks/BMspJ8Yh.js","_app/immutable/chunks/CfhtIqMF.js","_app/immutable/chunks/BBqmbskW.js","_app/immutable/chunks/D47F4gF3.js","_app/immutable/chunks/CvWd9xh1.js","_app/immutable/chunks/CkucYYup.js","_app/immutable/chunks/Cj2i8k79.js","_app/immutable/chunks/Jos_wYTi.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-B9VRXOPB.js.map
