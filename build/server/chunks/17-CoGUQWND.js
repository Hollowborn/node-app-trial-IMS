import { f as fail, r as redirect } from './index2-Ddp2AB5f.js';
import bcrypt from 'bcryptjs';
import { d as db } from './database-BZRN5Cgi.js';
import fsPromises from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'path';
import { v4 } from 'uuid';
import 'better-sqlite3';
import 'fs';

const DB_FILE_NAME = "bfar.db";
const DB_DIR = path.join(process.cwd(), "data");
const DB_FULL_PATH = path.join(DB_DIR, DB_FILE_NAME);
const DB_BACKUPS_DIR = path.join(process.cwd(), "db_backups");
const DB_IMPORTS_DIR = path.join(process.cwd(), "db_imports");
const UPLOADS_BASE_DIR = path.join(process.cwd(), "uploads");
const USER_PROFILES_UPLOAD_DIR = path.join(UPLOADS_BASE_DIR, "user_profiles");
if (!existsSync(USER_PROFILES_UPLOAD_DIR)) {
  mkdirSync(USER_PROFILES_UPLOAD_DIR, { recursive: true });
  console.log(
    `Created user profile upload directory: ${USER_PROFILES_UPLOAD_DIR}`
  );
}
if (!existsSync(DB_BACKUPS_DIR)) {
  mkdirSync(DB_BACKUPS_DIR, { recursive: true });
  console.log(`Created database backups directory: ${DB_BACKUPS_DIR}`);
}
if (!existsSync(DB_IMPORTS_DIR)) {
  mkdirSync(DB_IMPORTS_DIR, { recursive: true });
  console.log(`Created database imports directory: ${DB_IMPORTS_DIR}`);
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
    let backupFileName;
    const backupDir = path.join(process.cwd(), "db_backups");
    try {
      await fsPromises.mkdir(backupDir, { recursive: true });
      backupFileName = `inventory_db_backup_${Date.now()}.sqlite`;
      const backupFilePath = path.join(backupDir, backupFileName);
      db.backup(backupFilePath);
      return {
        success: true,
        message: "Database backup created successfully. Starting download...",
        backupFileName
        // Pass the filename back to the client
      };
    } catch (error) {
      console.error("Error saving database for download:", error);
      return fail(500, {
        success: false,
        message: error.message || "Failed to save database for download."
      });
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
    const TEMP_IMPORT_FILE_PATH = path.join(
      DB_IMPORTS_DIR,
      `temp_import_${Date.now()}.sqlite`
    );
    let cleanupNeeded = false;
    try {
      const arrayBuffer = await dbFile.arrayBuffer();
      await fsPromises.writeFile(
        TEMP_IMPORT_FILE_PATH,
        Buffer.from(arrayBuffer)
      );
      cleanupNeeded = true;
      db.close();
      await fsPromises.copyFile(TEMP_IMPORT_FILE_PATH, DB_FULL_PATH);
      return {
        success: true,
        message: "Database imported! Please **stop and restart** the application for changes to take full effect."
      };
    } catch (error) {
      console.error("Error importing database:", error);
      return fail(500, {
        success: false,
        message: error.message || "Failed to import database."
      });
    } finally {
      if (cleanupNeeded && existsSync(TEMP_IMPORT_FILE_PATH)) {
        try {
          await fsPromises.unlink(TEMP_IMPORT_FILE_PATH);
        } catch (e) {
          console.warn("Failed to clean up temporary import file:", e);
        }
      }
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
const component = async () => component_cache ??= (await import('./_page.svelte-wnk0d21L.js')).default;
const server_id = "src/routes/dashboard/settings/+page.server.ts";
const imports = ["_app/immutable/nodes/17.CuITsXpt.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/BOZ4giT5.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/BdKzLJUH.js","_app/immutable/chunks/DDxGkWpc.js","_app/immutable/chunks/BAa4oyvZ.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/EdVlTvtb.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/Bo2GsiZ3.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/C_qPImRn.js","_app/immutable/chunks/C9JwNqn8.js","_app/immutable/chunks/BkXn0r0G.js","_app/immutable/chunks/DRgJLo_S.js","_app/immutable/chunks/CW0o_Oq5.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/fdmIGhiF.js","_app/immutable/chunks/HFpTe9lc.js","_app/immutable/chunks/m1yvVzPT.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-CoGUQWND.js.map
