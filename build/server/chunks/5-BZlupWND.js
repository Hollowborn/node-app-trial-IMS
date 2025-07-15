import { r as requireRole } from './auth-D4luyh-r.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-D3nvwZ7V.js')).default;
const server_id = "src/routes/dashboard/bookings/+page.server.ts";
const imports = ["_app/immutable/nodes/5.bWQJY9r5.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/q_geWe1R.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/Cl_oq7nf.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/BUlJYItk.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/C43ptUaS.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/DOd2QSgZ.js","_app/immutable/chunks/DaJoOla_.js","_app/immutable/chunks/HUBSOgFT.js","_app/immutable/chunks/Cd7yCszS.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/BeUoQy-y.js","_app/immutable/chunks/okGsx2OR.js","_app/immutable/chunks/DQk1ANEP.js","_app/immutable/chunks/CbD0lEU8.js","_app/immutable/chunks/Dcluerj8.js","_app/immutable/chunks/BMspJ8Yh.js","_app/immutable/chunks/CfhtIqMF.js","_app/immutable/chunks/D47F4gF3.js","_app/immutable/chunks/CvWd9xh1.js","_app/immutable/chunks/CkucYYup.js","_app/immutable/chunks/DOotmoI5.js","_app/immutable/chunks/Jos_wYTi.js","_app/immutable/chunks/BBOATMWh.js","_app/immutable/chunks/BD6Ecydl.js","_app/immutable/chunks/CCIBMD7x.js","_app/immutable/chunks/BwLKvIYz.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-BZlupWND.js.map
