import { r as requireRole } from './auth-D4luyh-r.js';
import { f as fail } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import { existsSync, unlinkSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { l as logActivity } from './activityLogger-DQXDyR0j.js';
import 'bcryptjs';
import 'better-sqlite3';

const UPLOAD_DIR = path.join(process.cwd(), "static", "uploads", "profiles");
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
}
const load = async (event) => {
  await requireRole(event, ["admin"]);
  event.depends("app:clients");
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "created_at";
  const sortOrder = url.searchParams.get("order") || "desc";
  let clients;
  let query = `
    SELECT id, name, operator_type, address, birthday, contact_number, profile_image, status, created_at
    FROM clients
  `;
  const params = [];
  if (search) {
    query += `
      WHERE name LIKE ? OR address LIKE ? OR contact_number LIKE ?
    `;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
  try {
    if (params.length > 0) {
      clients = db.prepare(query).all(...params);
    } else {
      clients = db.prepare(query).all();
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
    clients = [];
  }
  return {
    clients: clients.map((client) => ({
      ...client,
      // Ensure birthday is treated as string for consistency with client-side input type="date"
      birthday: client.birthday ? new Date(client.birthday).toISOString().split("T")[0] : null
    })),
    search,
    sortBy,
    // Pass current sort column to client
    sortOrder
    // Pass current sort order to client
  };
};
const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const operator_type = data.get("operator_type")?.toString();
    const address = data.get("address")?.toString();
    const birthday = data.get("birthday")?.toString();
    const contact_number = data.get("contact_number")?.toString();
    const profile_image = data.get("profile_image");
    const status = data.get("status")?.toString();
    if (!name || !operator_type || !address) {
      return fail(400, {
        error: "Name, operator type, and address are required."
      });
    }
    let imagePath = null;
    if (profile_image && profile_image.size > 0) {
      try {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp"
        ];
        if (!allowedTypes.includes(profile_image.type)) {
          return fail(400, {
            error: "Invalid file type. Only images (JPEG, PNG, GIF, WEBP) are allowed."
          });
        }
        if (profile_image.size > 5 * 1024 * 1024) {
          return fail(400, { error: "Image size exceeds 5MB limit." });
        }
        const fileExtension = path.extname(profile_image.name);
        const uniqueFilename = `${v4()}${fileExtension}`;
        const filePath = path.join(UPLOAD_DIR, uniqueFilename);
        writeFileSync(filePath, Buffer.from(await profile_image.arrayBuffer()));
        imagePath = `/uploads/profiles/${uniqueFilename}`;
      } catch (err) {
        console.error("Error saving profile image:", err);
        return fail(500, { error: "Failed to upload profile image." });
      }
    }
    try {
      const insertResult = db.prepare(
        `
                INSERT INTO clients (name, operator_type, address, birthday, contact_number, profile_image, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `
      ).run(
        name,
        operator_type,
        address,
        birthday || null,
        contact_number || null,
        imagePath,
        // Save the image path
        status || "active"
        // Use provided status or default to 'active'
      );
      const newID = Number(insertResult.lastInsertRowid);
      const userId = locals.user?.id || null;
      await logActivity(
        "created",
        "client",
        newID,
        `New client "${name}" added.`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error creating client:", error);
      return fail(500, { error: "Failed to create client." });
    }
  },
  update: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    const name = data.get("name")?.toString();
    const operator_type = data.get("operator_type")?.toString();
    const address = data.get("address")?.toString();
    const birthday = data.get("birthday")?.toString();
    const contact_number = data.get("contact_number")?.toString();
    const profile_image_file = data.get("profile_image");
    const current_image_path = data.get("current_image_path")?.toString();
    const remove_profile_image_flag = data.get("remove_profile_image") === "true";
    const status = data.get("status")?.toString();
    if (!id || !name || !operator_type || !address) {
      return fail(400, {
        error: "ID, name, operator type, and address are required."
      });
    }
    const currentClient = db.prepare("SELECT name, operator_type, address FROM clients WHERE id = ?").get(id);
    const oldClientName = currentClient?.name || "Unknown Client";
    let newImagePath = void 0;
    if (profile_image_file && profile_image_file instanceof File && profile_image_file.size > 0) {
      try {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp"
        ];
        if (!allowedTypes.includes(profile_image_file.type)) {
          return fail(400, {
            error: "Invalid file type. Only images (JPEG, PNG, GIF, WEBP) are allowed."
          });
        }
        if (profile_image_file.size > 5 * 1024 * 1024) {
          return fail(400, { error: "Image size exceeds 5MB limit." });
        }
        if (current_image_path) {
          const oldFilePath = path.join(
            process.cwd(),
            "static",
            current_image_path
          );
          if (existsSync(oldFilePath)) {
            unlinkSync(oldFilePath);
          }
        }
        const fileExtension = path.extname(profile_image_file.name);
        const uniqueFilename = `${v4()}${fileExtension}`;
        const filePath = path.join(UPLOAD_DIR, uniqueFilename);
        writeFileSync(
          filePath,
          Buffer.from(await profile_image_file.arrayBuffer())
        );
        newImagePath = `/uploads/profiles/${uniqueFilename}`;
      } catch (err) {
        console.error("Error updating profile image:", err);
        return fail(500, { error: "Failed to upload new profile image." });
      }
    } else if (remove_profile_image_flag) {
      if (current_image_path) {
        const oldFilePath = path.join(
          process.cwd(),
          "static",
          current_image_path
        );
        if (existsSync(oldFilePath)) {
          unlinkSync(oldFilePath);
        }
      }
      newImagePath = null;
    }
    try {
      let updateQuery = `
                UPDATE clients
                SET name = ?, operator_type = ?, address = ?, birthday = ?, contact_number = ?, status = ?
            `;
      const params = [
        name,
        operator_type,
        address,
        birthday || null,
        contact_number || null,
        status || "active"
        // Update status
      ];
      if (newImagePath !== void 0) {
        updateQuery += `, profile_image = ?`;
        params.push(newImagePath);
      }
      updateQuery += ` WHERE id = ?`;
      params.push(id);
      db.prepare(updateQuery).run(...params);
      const userId = locals.user?.id || null;
      await logActivity(
        "updated",
        "client",
        id,
        `Client "${oldClientName}" (ID: ${id}) updated.`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error updating client:", error);
      return fail(500, { error: "Failed to update client." });
    }
  },
  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (isNaN(id)) {
      return fail(400, { error: "Client ID is required." });
    }
    try {
      const client = db.prepare("SELECT name, profile_image FROM clients WHERE id = ?").get(id);
      const clientName = client?.name || "Unknown Client";
      if (client && client.profile_image) {
        const imagePathToDelete = path.join(
          process.cwd(),
          "static",
          client.profile_image
        );
        if (existsSync(imagePathToDelete)) {
          unlinkSync(imagePathToDelete);
        }
      }
      db.prepare("DELETE FROM clients WHERE id = ?").run(id);
      const userId = locals.user?.id || null;
      await logActivity(
        "deleted",
        "client",
        id,
        `Client "${clientName}" (ID: ${id}) deleted.`,
        userId
      );
      return { success: true };
    } catch (error) {
      console.error("Error deleting client:", error);
      return fail(500, { error: "Failed to delete client." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-OwusI3uU.js')).default;
const server_id = "src/routes/dashboard/clients/+page.server.ts";
const imports = ["_app/immutable/nodes/6.hwEmuxvU.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/q_geWe1R.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/Cl_oq7nf.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/BUlJYItk.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/C43ptUaS.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/DOd2QSgZ.js","_app/immutable/chunks/DaJoOla_.js","_app/immutable/chunks/HUBSOgFT.js","_app/immutable/chunks/Cd7yCszS.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/BeUoQy-y.js","_app/immutable/chunks/okGsx2OR.js","_app/immutable/chunks/DQk1ANEP.js","_app/immutable/chunks/CbD0lEU8.js","_app/immutable/chunks/Dcluerj8.js","_app/immutable/chunks/DBcW8l46.js","_app/immutable/chunks/BMspJ8Yh.js","_app/immutable/chunks/CfhtIqMF.js","_app/immutable/chunks/D47F4gF3.js","_app/immutable/chunks/CvWd9xh1.js","_app/immutable/chunks/BD6Ecydl.js","_app/immutable/chunks/CkucYYup.js","_app/immutable/chunks/Cj2i8k79.js","_app/immutable/chunks/BX1LMzXi.js","_app/immutable/chunks/BBOATMWh.js","_app/immutable/chunks/Jos_wYTi.js","_app/immutable/chunks/BwLKvIYz.js","_app/immutable/chunks/CO0Jp7Tw.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-9MWa9dvZ.js.map
