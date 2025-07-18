import { r as requireRole } from './auth-CkYXVrx8.js';
import { f as fail } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import { existsSync, unlinkSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { l as logActivity } from './activityLogger-DQXDyR0j.js';
import 'bcryptjs';
import 'better-sqlite3';

const UPLOADS_BASE_DIR = path.join(process.cwd(), "uploads");
const PROFILES_UPLOAD_DIR = path.join(UPLOADS_BASE_DIR, "profiles");
if (!existsSync(PROFILES_UPLOAD_DIR)) {
  mkdirSync(PROFILES_UPLOAD_DIR, { recursive: true });
  console.log(`Created upload directory: ${PROFILES_UPLOAD_DIR}`);
}
const load = async (event) => {
  await requireRole(event, ["admin", "feeds", "hardware"]);
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
      birthday: client.birthday ? new Date(client.birthday).toISOString().split("T")[0] : null,
      // --- IMPORTANT: Construct the URL for the API endpoint ---
      // The database stores the relative path (e.g., 'profiles/abc.png')
      // We construct the full URL that the browser will request.
      profile_image: client.profile_image ? `/api/uploads/${client.profile_image.replace(/\\/g, "/")}` : null
      // -----------------------------------------------------------
    })),
    search,
    sortBy,
    sortOrder
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
    let imageRelativePath = null;
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
        const filePath = path.join(PROFILES_UPLOAD_DIR, uniqueFilename);
        writeFileSync(filePath, Buffer.from(await profile_image.arrayBuffer()));
        imageRelativePath = path.join("profiles", uniqueFilename);
        imageRelativePath = imageRelativePath.replace(/\\/g, "/");
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
        imageRelativePath,
        // Save the relative image path
        status || "active"
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
    data.get("current_image_path")?.toString();
    const remove_profile_image_flag = data.get("remove_profile_image") === "true";
    const status = data.get("status")?.toString();
    if (!id || !name || !operator_type || !address) {
      return fail(400, {
        error: "ID, name, operator type, and address are required."
      });
    }
    const currentClient = db.prepare(
      "SELECT name, operator_type, address, profile_image FROM clients WHERE id = ?"
    ).get(id);
    const oldClientName = currentClient?.name || "Unknown Client";
    let newImageRelativePath = void 0;
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
        if (currentClient?.profile_image) {
          const oldFilePath = path.join(
            UPLOADS_BASE_DIR,
            currentClient.profile_image
          );
          if (existsSync(oldFilePath)) {
            unlinkSync(oldFilePath);
          }
        }
        const fileExtension = path.extname(profile_image_file.name);
        const uniqueFilename = `${v4()}${fileExtension}`;
        const filePath = path.join(PROFILES_UPLOAD_DIR, uniqueFilename);
        writeFileSync(
          filePath,
          Buffer.from(await profile_image_file.arrayBuffer())
        );
        newImageRelativePath = path.join("profiles", uniqueFilename);
        newImageRelativePath = newImageRelativePath.replace(/\\/g, "/");
      } catch (err) {
        console.error("Error updating profile image:", err);
        return fail(500, { error: "Failed to upload new profile image." });
      }
    } else if (remove_profile_image_flag) {
      if (currentClient?.profile_image) {
        const oldFilePath = path.join(
          UPLOADS_BASE_DIR,
          currentClient.profile_image
        );
        if (existsSync(oldFilePath)) {
          unlinkSync(oldFilePath);
        }
      }
      newImageRelativePath = null;
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
      ];
      if (newImageRelativePath !== void 0) {
        updateQuery += `, profile_image = ?`;
        params.push(newImageRelativePath);
      }
      updateQuery += ` WHERE id = ?`;
      const idString = String(id);
      params.push(idString);
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
          UPLOADS_BASE_DIR,
          client.profile_image
        );
        if (existsSync(imagePathToDelete)) {
          unlinkSync(imagePathToDelete);
          console.log(`Deleted client image: ${imagePathToDelete}`);
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
const component = async () => component_cache ??= (await import('./_page.svelte-CDRUlutW.js')).default;
const server_id = "src/routes/dashboard/clients/+page.server.ts";
const imports = ["_app/immutable/nodes/6.DEv3yBFF.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/BO5sSAji.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/DsUCSRu3.js","_app/immutable/chunks/B7wWqVz8.js","_app/immutable/chunks/D8SxGvop.js","_app/immutable/chunks/Bex-ZZ3I.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/BDEhTM1z.js","_app/immutable/chunks/79yj6mvb.js","_app/immutable/chunks/C8nz08U9.js","_app/immutable/chunks/BXiYU_fU.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/BnoYQOO4.js","_app/immutable/chunks/DG-I9f0P.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/BOqc4mWw.js","_app/immutable/chunks/FbqajOR9.js","_app/immutable/chunks/UFUhM6vw.js","_app/immutable/chunks/6xhieDVM.js","_app/immutable/chunks/CsJL26Fh.js","_app/immutable/chunks/CVjO-GJU.js","_app/immutable/chunks/DIvwaDiU.js","_app/immutable/chunks/CEVutZxn.js","_app/immutable/chunks/CPRTWbuQ.js","_app/immutable/chunks/BZzk2vwh.js","_app/immutable/chunks/0sm_qxqv.js","_app/immutable/chunks/_cz2kCqa.js","_app/immutable/chunks/DKAGjdov.js","_app/immutable/chunks/0urWu8Wf.js","_app/immutable/chunks/CPLOLVSj.js","_app/immutable/chunks/CfmL5u39.js","_app/immutable/chunks/CTGOP75E.js","_app/immutable/chunks/Dt21h0cY.js","_app/immutable/chunks/DgoSFWl1.js","_app/immutable/chunks/CjnbRfgs.js","_app/immutable/chunks/73OGGqlS.js","_app/immutable/chunks/0dNO5ytf.js","_app/immutable/chunks/D_UmtYL2.js","_app/immutable/chunks/BO-JY_3Z.js","_app/immutable/chunks/BQbVfyjS.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-B1LhnFAQ.js.map
