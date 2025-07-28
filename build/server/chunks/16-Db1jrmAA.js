import { r as requireRole } from './auth-CkYXVrx8.js';
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
const component = async () => component_cache ??= (await import('./_page.svelte-EcyBrx8y.js')).default;
const server_id = "src/routes/dashboard/search-results/+page.server.ts";
const imports = ["_app/immutable/nodes/16.C75oV5fU.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/C9JwNqn8.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/Dlm0QRJp.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/jrVE8UPr.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/C0R_oNfb.js","_app/immutable/chunks/nTpf8bzQ.js","_app/immutable/chunks/OZ3l4Dmb.js","_app/immutable/chunks/CU8TJT68.js","_app/immutable/chunks/DimrunNa.js","_app/immutable/chunks/BKnMC3cJ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-Db1jrmAA.js.map
