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
  event.depends("app:bookings");
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "date";
  const sortOrder = url.searchParams.get("order") || "asc";
  let bookings;
  let clients;
  let bookingsQuery = `
    SELECT
      b.id,
      b.client_id,
      c.name AS client_name,
      b.purpose,
      b.date,
      b.time,
      b.notes,
      b.status
      -- Removed b.created_at
    FROM bookings b
    JOIN clients c ON b.client_id = c.id
  `;
  const bookingsParams = [];
  const searchConditions = [];
  if (search) {
    searchConditions.push(`c.name LIKE ?`);
    bookingsParams.push(`%${search}%`);
    searchConditions.push(`b.purpose LIKE ?`);
    bookingsParams.push(`%${search}%`);
    searchConditions.push(`b.status LIKE ?`);
    bookingsParams.push(`%${search}%`);
  }
  if (searchConditions.length > 0) {
    bookingsQuery += ` WHERE ${searchConditions.join(" OR ")}`;
  }
  const allowedSortColumns = [
    "date",
    "time",
    "status",
    "client_name"
    // Removed "created_at",
  ];
  let finalSortBy = allowedSortColumns.includes(sortBy) ? sortBy : "date";
  if (finalSortBy === "status") {
    finalSortBy = "b.status";
  } else if (finalSortBy === "client_name") {
    finalSortBy = "c.name";
  } else {
    finalSortBy = `b.${finalSortBy}`;
  }
  const finalSortOrder = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";
  bookingsQuery += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;
  console.log("--- Bookings Load Debug ---");
  console.log("Search Query:", search);
  console.log("Sort By:", sortBy, "-> Final Sort By:", finalSortBy);
  console.log("Sort Order:", sortOrder, "-> Final Sort Order:", finalSortOrder);
  console.log("Full Bookings Query:", bookingsQuery);
  console.log("Bookings Query Params:", bookingsParams);
  try {
    bookings = db.prepare(bookingsQuery).all(...bookingsParams);
    clients = db.prepare("SELECT id, name FROM clients ORDER BY name ASC").all();
    console.log("Fetched Bookings Count:", bookings.length);
    if (sortBy === "status") {
      console.log(
        "Sample Bookings (when sorting by status):",
        bookings.slice(0, 5)
      );
    }
  } catch (error) {
    console.error("Error fetching bookings or clients:", error);
    bookings = [];
    clients = [];
  }
  return {
    bookings: bookings.map((booking) => ({
      ...booking,
      // Ensure date is in YYYY-MM-DD format for input type="date"
      date: booking.date ? new Date(booking.date).toISOString().split("T")[0] : null
    })),
    clients,
    // Pass clients for dropdowns in forms
    search,
    sortBy,
    // Return original sortBy for client-side logic
    sortOrder: sortOrder.toLowerCase()
    // Return original case for client-side logic
  };
};
const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();
    const client_id = data.get("client_id")?.toString();
    const purpose = data.get("purpose")?.toString();
    const date = data.get("date")?.toString();
    const time = data.get("time")?.toString();
    const notes = data.get("notes")?.toString();
    const status = data.get("status")?.toString() || "pending";
    if (!client_id || !purpose || !date || !time) {
      return fail(400, {
        error: "Client, Purpose, Date, and Time are required."
      });
    }
    try {
      const insertResult = db.prepare(
        `
        INSERT INTO bookings (client_id, purpose, date, time, notes, status)
        VALUES (?, ?, ?, ?, ?, ?)
        `
      ).run(client_id, purpose, date, time, notes || null, status);
      const newBookingId = Number(insertResult.lastInsertRowid);
      const clientNameResult = db.prepare("SELECT name FROM clients WHERE id = ?").get(client_id);
      const clientName = clientNameResult ? clientNameResult.name : "Unknown Client";
      const userId = locals.user?.id || null;
      await logActivity(
        "created",
        "booking",
        newBookingId,
        `New booking for "${clientName}" (Purpose: ${purpose}) created.`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error creating booking:", error);
      return fail(500, { error: "Failed to create booking." });
    }
  },
  update: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    const client_id = data.get("client_id")?.toString();
    const purpose = data.get("purpose")?.toString();
    const date = data.get("date")?.toString();
    const time = data.get("time")?.toString();
    const notes = data.get("notes")?.toString();
    const status = data.get("status")?.toString();
    if (!id || !client_id || !purpose || !date || !time || !status) {
      return fail(400, {
        error: "All fields except Notes are required for update."
      });
    }
    try {
      db.prepare(
        `
        UPDATE bookings
        SET client_id = ?, purpose = ?, date = ?, time = ?, notes = ?, status = ?
        WHERE id = ?
        `
      ).run(client_id, purpose, date, time, notes || null, status, id);
      const clientNameResult = db.prepare("SELECT name FROM clients WHERE id = ?").get(client_id);
      const clientName = clientNameResult ? clientNameResult.name : "Unknown Client";
      const userId = locals.user?.id || null;
      await logActivity(
        "updated",
        "booking",
        id,
        `Booking for "${clientName}" (ID: ${id}, Purpose: ${purpose}) updated.`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error updating booking:", error);
      return fail(500, { error: "Failed to update booking." });
    }
  },
  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (!id) {
      return fail(400, { error: "Booking ID is required." });
    }
    try {
      const bookingToDelete = db.prepare("SELECT client_id, purpose FROM bookings WHERE id = ?").get(id);
      let clientName = "Unknown Client";
      let purpose = "Unknown Purpose";
      if (bookingToDelete) {
        const clientNameResult = db.prepare("SELECT name FROM clients WHERE id = ?").get(bookingToDelete.client_id);
        clientName = clientNameResult ? clientNameResult.name : "Unknown Client";
        purpose = bookingToDelete.purpose;
      }
      db.prepare("DELETE FROM bookings WHERE id = ?").run(id);
      const userId = locals.user?.id || null;
      await logActivity(
        "deleted",
        "booking",
        id,
        `Booking for "${clientName}" (ID: ${id}, Purpose: ${purpose}) deleted.`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error deleting booking:", error);
      return fail(500, { error: "Failed to delete booking." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-AtpfGrZE.js')).default;
const server_id = "src/routes/dashboard/bookings/+page.server.ts";
const imports = ["_app/immutable/nodes/5.DTRmpkxk.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/BO5sSAji.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/DsUCSRu3.js","_app/immutable/chunks/B7wWqVz8.js","_app/immutable/chunks/D8SxGvop.js","_app/immutable/chunks/Bex-ZZ3I.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/BDEhTM1z.js","_app/immutable/chunks/79yj6mvb.js","_app/immutable/chunks/C8nz08U9.js","_app/immutable/chunks/BXiYU_fU.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/BnoYQOO4.js","_app/immutable/chunks/DG-I9f0P.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/BOqc4mWw.js","_app/immutable/chunks/FbqajOR9.js","_app/immutable/chunks/UFUhM6vw.js","_app/immutable/chunks/6xhieDVM.js","_app/immutable/chunks/CsJL26Fh.js","_app/immutable/chunks/CVjO-GJU.js","_app/immutable/chunks/DIvwaDiU.js","_app/immutable/chunks/CEVutZxn.js","_app/immutable/chunks/CPRTWbuQ.js","_app/immutable/chunks/BZzk2vwh.js","_app/immutable/chunks/0sm_qxqv.js","_app/immutable/chunks/_cz2kCqa.js","_app/immutable/chunks/0urWu8Wf.js","_app/immutable/chunks/CPLOLVSj.js","_app/immutable/chunks/CfmL5u39.js","_app/immutable/chunks/CTGOP75E.js","_app/immutable/chunks/DgoSFWl1.js","_app/immutable/chunks/CsSzQ2UU.js","_app/immutable/chunks/D_UmtYL2.js","_app/immutable/chunks/0dNO5ytf.js","_app/immutable/chunks/Dt21h0cY.js","_app/immutable/chunks/BHfZQdl9.js","_app/immutable/chunks/BO-JY_3Z.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-M4H0xWyL.js.map
