import { f as fail, r as redirect } from './index2-Ddp2AB5f.js';
import bcrypt from 'bcryptjs';
import { d as db } from './database-BZRN5Cgi.js';
import fs from 'node:fs/promises';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import 'better-sqlite3';
import 'path';
import 'fs';

const UPLOADS_BASE_DIR = path.join(process.cwd(), "static", "uploads");
const load = async ({ locals, parent }) => {
  if (!locals.user || !locals.user.id) {
    throw redirect(302, "/login");
  }
  const { user: layoutUser, session } = await parent();
  if (!layoutUser) {
    throw redirect(302, "/login");
  }
  const currentUser = {
    id: locals.user.id,
    username: locals.user.username,
    display_name: locals.user.display_name,
    profileImage: locals.user.profile_image,
    role: locals.user.role
  };
  return {
    user: currentUser,
    session
  };
};
const actions = {
  // --- Profile & Account Actions ---
  updateProfile: async ({ request, locals }) => {
    if (!locals.user || !locals.user.id) {
      return fail(401, { message: "Unauthorized" });
    }
    const data = await request.formData();
    const displayName = data.get("displayName")?.toString() || locals.user.display_name;
    const profileImageFile = data.get("profileImage");
    const removeProfileImageFlag = data.get("removeProfileImage") === "true";
    const currentImagePath = data.get("currentImagePath")?.toString();
    let newProfileImagePath = currentImagePath || null;
    if (profileImageFile && profileImageFile.size > 0) {
      const uploadDir = path.join(UPLOADS_BASE_DIR, "profile_images");
      await fs.mkdir(uploadDir, { recursive: true });
      const filename = `${locals.user.id}-${Date.now()}-${profileImageFile.name}`;
      newProfileImagePath = `/uploads/profile_images/${filename}`;
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(
        filepath,
        Buffer.from(await profileImageFile.arrayBuffer())
      );
      if (currentImagePath && currentImagePath !== newProfileImagePath) {
        try {
          const oldFilePath = path.join(
            UPLOADS_BASE_DIR,
            currentImagePath.replace("/uploads/", "")
          );
          await fs.unlink(oldFilePath);
        } catch (e) {
          console.warn("Could not delete old profile image:", e);
        }
      }
    } else if (removeProfileImageFlag) {
      if (currentImagePath) {
        try {
          const oldFilePath = path.join(
            UPLOADS_BASE_DIR,
            currentImagePath.replace("/uploads/", "")
          );
          await fs.unlink(oldFilePath);
        } catch (e) {
          console.warn("Could not delete old profile image:", e);
        }
      }
      newProfileImagePath = null;
    }
    try {
      const stmt = db.prepare(
        "UPDATE users SET display_name = ?, profile_image = ? WHERE id = ?"
      );
      stmt.run(displayName, newProfileImagePath, locals.user.id);
      return {
        success: true,
        message: "Profile updated successfully!",
        profileImage: newProfileImagePath,
        username: displayName
      };
    } catch (error) {
      console.error("Error updating profile:", error);
      return fail(500, {
        success: false,
        message: error.message || "Failed to update profile."
      });
    }
  },
  updateCredentials: async ({ request, locals }) => {
    if (!locals.user || !locals.user.id) {
      return fail(401, { message: "Unauthorized" });
    }
    const data = await request.formData();
    const currentPassword = data.get("currentPassword")?.toString();
    const newUsername = data.get("newUsername")?.toString();
    const newPassword = data.get("newPassword")?.toString();
    if (!currentPassword) {
      return fail(400, { message: "Current password is required." });
    }
    const user = db.prepare("SELECT password_hash, username FROM users WHERE id = ?").get(locals.user.id);
    if (!user || !await bcrypt.compare(currentPassword, user.password_hash)) {
      return fail(400, { message: "Incorrect current password." });
    }
    let updateSql = "UPDATE users SET";
    const params = [];
    const updates = [];
    if (newUsername && newUsername.trim() !== "" && newUsername !== user.username) {
      updates.push("username = ?");
      params.push(newUsername);
    }
    if (newPassword && newPassword.trim() !== "") {
      if (newPassword.length < 8) {
        return fail(400, {
          message: "New password must be at least 8 characters long."
        });
      }
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      updates.push("password_hash = ?");
      params.push(newPasswordHash);
    }
    if (updates.length === 0) {
      return fail(400, {
        message: "No changes provided for username or password."
      });
    }
    updateSql += " " + updates.join(", ") + " WHERE id = ?";
    params.push(locals.user.id);
    try {
      db.prepare(updateSql).run(...params);
      return { success: true, message: "Credentials updated successfully!" };
    } catch (error) {
      console.error("Error updating credentials:", error);
      if (error.message.includes("UNIQUE constraint failed: users.username")) {
        return fail(400, {
          success: false,
          message: "Username already taken."
        });
      }
      return fail(500, {
        success: false,
        message: error.message || "Failed to update credentials."
      });
    }
  },
  // --- Admin Actions (Database Management) ---
  resetDatabase: async ({ locals }) => {
    if (!locals.user || locals.user.role !== "admin") {
      return fail(403, { message: "Forbidden: Admin access required." });
    }
    try {
      const tablesToClear = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT IN ('users', 'sessions')"
      ).all();
      db.transaction(() => {
        for (const table of tablesToClear) {
          db.prepare(`DELETE FROM "${table.name}"`).run();
        }
      })();
      const clearedTableNames = tablesToClear.map((t) => `'${t.name}'`).join(",");
      if (clearedTableNames) {
        db.prepare(
          `DELETE FROM sqlite_sequence WHERE name IN (${clearedTableNames})`
        ).run();
      }
      return {
        success: true,
        message: "Database data (excluding users and sessions) cleared successfully!"
      };
    } catch (error) {
      console.error("Error resetting database:", error);
      return fail(500, {
        success: false,
        message: error.message || "Failed to reset database."
      });
    }
  },
  saveDatabase: async ({ locals }) => {
    if (!locals.user || locals.user.role !== "admin") {
      return fail(403, { message: "Forbidden: Admin access required." });
    }
    let backupFilePath;
    const backupDir = path.join(process.cwd(), "temp_db_backups");
    let cleanupNeeded = false;
    try {
      await fs.mkdir(backupDir, { recursive: true });
      backupFilePath = path.join(
        backupDir,
        `inventory_db_backup_${Date.now()}.sqlite`
      );
      db.backup(backupFilePath);
      cleanupNeeded = true;
      await new Promise((resolve) => setTimeout(resolve, 50));
      const fileContent = readFileSync(backupFilePath);
      const headers = new Headers();
      headers.set("Content-Type", "application/x-sqlite3");
      headers.set(
        "Content-Disposition",
        `attachment; filename="inventory_db_backup_${Date.now()}.sqlite"`
      );
      headers.set("Content-Length", fileContent.length.toString());
      return new Response(fileContent, { headers });
    } catch (error) {
      console.error("Error saving database for download:", error);
      if (error.code === "ENOENT" && backupFilePath) {
        return fail(500, {
          success: false,
          message: `Server failed to read the backup file after creation. This might be a temporary file locking issue. Try again.`
        });
      }
      return fail(500, {
        success: false,
        message: error.message || "Failed to save database for download."
      });
    } finally {
      if (cleanupNeeded && backupFilePath && existsSync(backupFilePath)) {
        try {
          await fs.unlink(backupFilePath);
        } catch (e) {
          console.warn("Failed to clean up temporary backup file:", e);
        }
      }
    }
  },
  importDatabase: async ({ request, locals }) => {
    if (!locals.user || locals.user.role !== "admin") {
      return fail(403, { message: "Forbidden: Admin access required." });
    }
    const data = await request.formData();
    const dbFile = data.get("dbFile");
    if (!dbFile || dbFile.size === 0) {
      return fail(400, { message: "No database file provided." });
    }
    if (!dbFile.name.endsWith(".sqlite") && !dbFile.name.endsWith(".db")) {
      return fail(400, {
        message: "Invalid file type. Please upload a .sqlite or .db file."
      });
    }
    const TEMP_UPLOAD_PATH = path.join(process.cwd(), "temp_import_db.sqlite");
    try {
      const arrayBuffer = await dbFile.arrayBuffer();
      await fs.writeFile(TEMP_UPLOAD_PATH, Buffer.from(arrayBuffer));
      return {
        success: true,
        message: "Database imported! Please **stop and restart** the application for changes to take full effect."
      };
    } catch (error) {
      console.error("Error importing database:", error);
      try {
        await fs.unlink(TEMP_UPLOAD_PATH);
      } catch (e) {
      }
      return fail(500, {
        success: false,
        message: error.message || "Failed to import database."
      });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CBd5Lrla.js')).default;
const server_id = "src/routes/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/17.QhrWgc6A.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/q_geWe1R.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/CBLA49U0.js","_app/immutable/chunks/BMspJ8Yh.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/Cd7yCszS.js","_app/immutable/chunks/Cl_oq7nf.js","_app/immutable/chunks/BUlJYItk.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/DTKX657x.js","_app/immutable/chunks/CfhtIqMF.js","_app/immutable/chunks/DBcW8l46.js","_app/immutable/chunks/DOd2QSgZ.js","_app/immutable/chunks/DaJoOla_.js","_app/immutable/chunks/HUBSOgFT.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/BD6Ecydl.js","_app/immutable/chunks/Jos_wYTi.js","_app/immutable/chunks/CCIBMD7x.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-CTLhz-1U.js.map
