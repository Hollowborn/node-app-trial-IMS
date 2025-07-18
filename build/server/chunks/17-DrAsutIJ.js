import { f as fail, r as redirect } from './index2-Ddp2AB5f.js';
import bcrypt from 'bcryptjs';
import { d as db } from './database-BZRN5Cgi.js';
import fsPromises from 'node:fs/promises';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'path';
import { v4 } from 'uuid';
import 'better-sqlite3';
import 'fs';

const UPLOADS_BASE_DIR = path.join(process.cwd(), "uploads");
const USER_PROFILES_UPLOAD_DIR = path.join(UPLOADS_BASE_DIR, "user_profiles");
if (!existsSync(USER_PROFILES_UPLOAD_DIR)) {
  mkdirSync(USER_PROFILES_UPLOAD_DIR, { recursive: true });
  console.log(
    `Created user profile upload directory: ${USER_PROFILES_UPLOAD_DIR}`
  );
}
const load = async ({ locals, parent }) => {
  if (!locals.user) {
    console.warn(
      "DEBUG: locals.user is null in settings load. Providing a placeholder."
    );
    locals.user = {
      id: 1,
      username: "guest",
      display_name: "Guest User",
      role: "feeds",
      profile_image: null
      // This is what comes from hooks.server.ts
    };
  }
  if (!locals.user.id) {
    throw redirect(302, "/login");
  }
  const { user: layoutUser, session } = await parent();
  if (!layoutUser || !locals.user.id) {
    throw redirect(302, "/login");
  }
  const currentUser = {
    id: locals.user.id,
    username: locals.user.username,
    display_name: locals.user.display_name,
    // --- IMPORTANT: Construct the URL for the API endpoint ---
    // locals.user.profile_image should be the relative path from 'uploads/' (e.g., 'user_profiles/abc.png')
    profileImage: locals.user.profile_image ? `/api/uploads/${locals.user.profile_image.replace(/\\/g, "/")}` : null,
    // -----------------------------------------------------------
    role: locals.user.role
  };
  return {
    user: currentUser,
    session
    // This comes from layout.server.ts parent function
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
    const currentImageUrl = data.get("currentImagePath")?.toString();
    let newProfileImageRelativePath = null;
    let existingImageRelativePath = null;
    if (currentImageUrl && currentImageUrl.startsWith("/api/uploads/")) {
      existingImageRelativePath = currentImageUrl.substring(
        "/api/uploads/".length
      );
    }
    if (profileImageFile && profileImageFile.size > 0) {
      try {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp"
        ];
        if (!allowedTypes.includes(profileImageFile.type)) {
          return fail(400, {
            error: "Invalid file type. Only images (JPEG, PNG, GIF, WEBP) are allowed."
          });
        }
        if (profileImageFile.size > 5 * 1024 * 1024) {
          return fail(400, { error: "Image size exceeds 5MB limit." });
        }
        if (existingImageRelativePath) {
          const oldFilePath = path.join(
            UPLOADS_BASE_DIR,
            existingImageRelativePath
          );
          if (existsSync(oldFilePath)) {
            await fsPromises.unlink(oldFilePath);
          }
        }
        const fileExtension = path.extname(profileImageFile.name);
        const uniqueFilename = `${locals.user.id}-${v4()}${fileExtension}`;
        const filepath = path.join(USER_PROFILES_UPLOAD_DIR, uniqueFilename);
        await fsPromises.writeFile(
          // Use fsPromises for async writeFile
          filepath,
          Buffer.from(await profileImageFile.arrayBuffer())
        );
        newProfileImageRelativePath = path.join(
          "user_profiles",
          uniqueFilename
        );
        newProfileImageRelativePath = newProfileImageRelativePath.replace(
          /\\/g,
          "/"
        );
      } catch (err) {
        console.error("Error saving profile image:", err);
        return fail(500, {
          success: false,
          message: err.message || "Failed to upload profile image."
        });
      }
    } else if (removeProfileImageFlag) {
      if (existingImageRelativePath) {
        try {
          const oldFilePath = path.join(
            UPLOADS_BASE_DIR,
            existingImageRelativePath
          );
          if (existsSync(oldFilePath)) {
            await fsPromises.unlink(oldFilePath);
          }
        } catch (e) {
          console.warn("Could not delete old profile image:", e);
        }
      }
      newProfileImageRelativePath = null;
    } else {
      newProfileImageRelativePath = existingImageRelativePath;
    }
    try {
      const stmt = db.prepare(
        "UPDATE users SET display_name = ?, profile_image = ? WHERE id = ?"
      );
      stmt.run(displayName, newProfileImageRelativePath, locals.user.id);
      locals.user.profile_image = newProfileImageRelativePath;
      return {
        success: true,
        message: "Profile updated successfully!",
        profileImage: newProfileImageRelativePath
        // Return the relative path, frontend will convert to URL
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
      await fsPromises.mkdir(backupDir, { recursive: true });
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
          await fsPromises.unlink(backupFilePath);
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
      await fsPromises.writeFile(TEMP_UPLOAD_PATH, Buffer.from(arrayBuffer));
      return {
        success: true,
        message: "Database imported! Please **stop and restart** the application for changes to take full effect."
      };
    } catch (error) {
      console.error("Error importing database:", error);
      try {
        await fsPromises.unlink(TEMP_UPLOAD_PATH);
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
const component = async () => component_cache ??= (await import('./_page.svelte-CzvV2Oy9.js')).default;
const server_id = "src/routes/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/17.DzcbLM0j.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/BO5sSAji.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/DsUCSRu3.js","_app/immutable/chunks/B7wWqVz8.js","_app/immutable/chunks/B6zvQKrV.js","_app/immutable/chunks/DwnJwU6j.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/BDEhTM1z.js","_app/immutable/chunks/CPTLTW40.js","_app/immutable/chunks/0urWu8Wf.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/DIvwaDiU.js","_app/immutable/chunks/CVjO-GJU.js","_app/immutable/chunks/79yj6mvb.js","_app/immutable/chunks/BXiYU_fU.js","_app/immutable/chunks/BnoYQOO4.js","_app/immutable/chunks/C8nz08U9.js","_app/immutable/chunks/DIDi3WRX.js","_app/immutable/chunks/CPLOLVSj.js","_app/immutable/chunks/DKAGjdov.js","_app/immutable/chunks/UFUhM6vw.js","_app/immutable/chunks/6xhieDVM.js","_app/immutable/chunks/CsJL26Fh.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/BOqc4mWw.js","_app/immutable/chunks/FbqajOR9.js","_app/immutable/chunks/Dt21h0cY.js","_app/immutable/chunks/D_UmtYL2.js","_app/immutable/chunks/BHfZQdl9.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-DrAsutIJ.js.map
