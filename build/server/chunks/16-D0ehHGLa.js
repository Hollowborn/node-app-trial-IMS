import { r as requireRole } from './auth-D4luyh-r.js';
import { e as error } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import 'bcryptjs';
import 'better-sqlite3';
import 'path';
import 'fs';

const load = async (event) => {
  await requireRole(event, ["admin"]);
  const url = new URL(event.request.url);
  const query = url.searchParams.get("q") || "";
  if (!query.trim()) {
    return {
      searchResults: [],
      searchQuery: query,
      message: "Please enter a search query."
    };
  }
  const searchTerm = `%${query.trim()}%`;
  const searchResults = [];
  try {
    const clients = db.prepare(
      `
      SELECT id, name, address, contact_number
      FROM clients
      WHERE name LIKE ? OR address LIKE ? OR contact_number LIKE ?
    `
    ).all(searchTerm, searchTerm, searchTerm);
    clients.forEach((c) => {
      let matchField = "";
      if (c.name.toLowerCase().includes(query.toLowerCase()))
        matchField = "Name";
      else if (c.address.toLowerCase().includes(query.toLowerCase()))
        matchField = "Address";
      else if (c.contact_number?.includes(query)) matchField = "Contact Number";
      searchResults.push({ ...c, type: "client", match_field: matchField });
    });
    const ponds = db.prepare(
      `
      SELECT id, pond_number, location, status
      FROM ponds
      WHERE pond_number LIKE ? OR location LIKE ? OR status LIKE ?
    `
    ).all(searchTerm, searchTerm, searchTerm);
    ponds.forEach((p) => {
      let matchField = "";
      if (p.pond_number.toLowerCase().includes(query.toLowerCase()))
        matchField = "Pond Number";
      else if (p.location?.toLowerCase().includes(query.toLowerCase()))
        matchField = "Location";
      else if (p.status.toLowerCase().includes(query.toLowerCase()))
        matchField = "Status";
      searchResults.push({ ...p, type: "pond", match_field: matchField });
    });
    const stockingInfo = db.prepare(
      `
      SELECT
        si.id, si.client_id, si.stocking_date, si.species_name, si.fish_size_range,
        c.name AS client_name
      FROM stocking_info AS si
      JOIN clients AS c ON si.client_id = c.id
      WHERE si.species_name LIKE ? OR si.fish_size_range LIKE ? OR si.notes LIKE ? OR c.name LIKE ?
    `
    ).all(searchTerm, searchTerm, searchTerm, searchTerm);
    stockingInfo.forEach((si) => {
      let matchField = "";
      if (si.species_name.toLowerCase().includes(query.toLowerCase()))
        matchField = "Species Name";
      else if (si.fish_size_range.toLowerCase().includes(query.toLowerCase()))
        matchField = "Fish Size Range";
      else if (si.client_name.toLowerCase().includes(query.toLowerCase()))
        matchField = "Client Name";
      searchResults.push({
        ...si,
        type: "stocking_info",
        match_field: matchField
      });
    });
    const harvestInfo = db.prepare(
      `
      SELECT
        hi.id, hi.stocking_id, hi.harvest_date, hi.notes,
        si.species_name AS stocking_species_name
      FROM harvest_info AS hi
      JOIN stocking_info AS si ON hi.stocking_id = si.id
      WHERE hi.notes LIKE ? OR si.species_name LIKE ?
    `
    ).all(searchTerm, searchTerm);
    harvestInfo.forEach((hi) => {
      let matchField = "";
      if (hi.notes?.toLowerCase().includes(query.toLowerCase()))
        matchField = "Notes";
      else if (hi.stocking_species_name.toLowerCase().includes(query.toLowerCase()))
        matchField = "Stocking Species";
      searchResults.push({
        ...hi,
        type: "harvest_info",
        match_field: matchField
      });
    });
    const employees = db.prepare(
      `
      SELECT id, name, role, inventory_assignment
      FROM employees
      WHERE name LIKE ? OR role LIKE ? OR inventory_assignment LIKE ?
    `
    ).all(searchTerm, searchTerm, searchTerm);
    employees.forEach((e) => {
      let matchField = "";
      if (e.name.toLowerCase().includes(query.toLowerCase()))
        matchField = "Name";
      else if (e.role.toLowerCase().includes(query.toLowerCase()))
        matchField = "Role";
      else if (e.inventory_assignment?.toLowerCase().includes(query.toLowerCase()))
        matchField = "Inventory Assignment";
      searchResults.push({ ...e, type: "employee", match_field: matchField });
    });
    const feedItems = db.prepare(
      `
      SELECT
        fi.id, fi.feed_name, fi.feed_stage,
        e.name AS requested_by_name
      FROM feed_inventory AS fi
      LEFT JOIN employees AS e ON fi.requested_by = e.id
      WHERE fi.feed_name LIKE ? OR fi.feed_stage LIKE ? OR e.name LIKE ?
    `
    ).all(searchTerm, searchTerm, searchTerm);
    feedItems.forEach((f) => {
      let matchField = "";
      if (f.feed_name.toLowerCase().includes(query.toLowerCase()))
        matchField = "Feed Name";
      else if (f.feed_stage.toLowerCase().includes(query.toLowerCase()))
        matchField = "Feed Stage";
      else if (f.requested_by_name?.toLowerCase().includes(query.toLowerCase()))
        matchField = "Requested By";
      searchResults.push({ ...f, type: "feed_item", match_field: matchField });
    });
    const hardwareItems = db.prepare(
      `
      SELECT
        hi.id, hi.item_name,
        e.name AS assigned_to_name
      FROM hardware_inventory AS hi
      LEFT JOIN employees AS e ON hi.assigned_to = e.id
      WHERE hi.item_name LIKE ? OR e.name LIKE ?
    `
    ).all(searchTerm, searchTerm);
    hardwareItems.forEach((h) => {
      let matchField = "";
      if (h.item_name.toLowerCase().includes(query.toLowerCase()))
        matchField = "Item Name";
      else if (h.assigned_to_name?.toLowerCase().includes(query.toLowerCase()))
        matchField = "Assigned To";
      searchResults.push({
        ...h,
        type: "hardware_item",
        match_field: matchField
      });
    });
  } catch (error$1) {
    console.error("Error performing global search:", error$1);
    throw error(500, "Failed to perform search. Please try again later.");
  }
  return {
    searchResults,
    searchQuery: query,
    message: searchResults.length === 0 ? "No results found." : void 0
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C-SDe2ko.js')).default;
const server_id = "src/routes/dashboard/search-results/+page.server.ts";
const imports = ["_app/immutable/nodes/16.pgYdSMeM.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/Cl_oq7nf.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/CfhtIqMF.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/Dcluerj8.js","_app/immutable/chunks/BBqmbskW.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/D47F4gF3.js","_app/immutable/chunks/DOotmoI5.js","_app/immutable/chunks/Cj2i8k79.js","_app/immutable/chunks/ClzY2XPi.js","_app/immutable/chunks/De5Sab-k.js","_app/immutable/chunks/CbdgyKAL.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-D0ehHGLa.js.map
