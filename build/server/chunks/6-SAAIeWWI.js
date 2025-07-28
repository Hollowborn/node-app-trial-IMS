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
const component = async () => component_cache ??= (await import('./_page.svelte-_A4kgO48.js')).default;
const server_id = "src/routes/dashboard/clients/+page.server.ts";
const imports = ["_app/immutable/nodes/6.C9j9PCfq.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/BOZ4giT5.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/Bo2GsiZ3.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/CdrzcX6z.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/BVRQx7W_.js","_app/immutable/chunks/CW0o_Oq5.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/EdVlTvtb.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/DtIGnhnO.js","_app/immutable/chunks/DRgJLo_S.js","_app/immutable/chunks/B762jp4P.js","_app/immutable/chunks/Dlm0QRJp.js","_app/immutable/chunks/BkXn0r0G.js","_app/immutable/chunks/BAa4oyvZ.js","_app/immutable/chunks/C9JwNqn8.js","_app/immutable/chunks/C0R_oNfb.js","_app/immutable/chunks/ARt1Dh6s.js","_app/immutable/chunks/fdmIGhiF.js","_app/immutable/chunks/B3v1Wr7v.js","_app/immutable/chunks/Ca16gRfA.js","_app/immutable/chunks/OZ3l4Dmb.js","_app/immutable/chunks/DhoyXEn1.js","_app/immutable/chunks/CwTfDKE9.js","_app/immutable/chunks/HFpTe9lc.js","_app/immutable/chunks/C4d-Fjg-.js","_app/immutable/chunks/esl9IfTG.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-SAAIeWWI.js.map
