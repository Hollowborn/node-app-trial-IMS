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
const EMPLOYEES_UPLOAD_DIR = path.join(UPLOADS_BASE_DIR, "employees");
if (!existsSync(EMPLOYEES_UPLOAD_DIR)) {
  mkdirSync(EMPLOYEES_UPLOAD_DIR, { recursive: true });
  console.log(`Created employee upload directory: ${EMPLOYEES_UPLOAD_DIR}`);
}
const load = async (event) => {
  await requireRole(event, ["admin"]);
  event.depends("app:employees");
  const url = new URL(event.request.url);
  const search = url.searchParams.get("search") || "";
  const sortBy = url.searchParams.get("sort") || "created_at";
  const sortOrder = url.searchParams.get("order") || "desc";
  let employees;
  let query = `
    SELECT id, name, gender, birthday, role, inventory_assignment, profile_image, created_at
    FROM employees
  `;
  const params = [];
  if (search) {
    query += `
      WHERE name LIKE ? OR role LIKE ? OR inventory_assignment LIKE ?
    `;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  const validSortColumns = [
    "name",
    "gender",
    "birthday",
    "role",
    "inventory_assignment",
    "created_at"
  ];
  const validSortOrders = ["asc", "desc"];
  const safeSortBy = validSortColumns.includes(sortBy) ? sortBy : "created_at";
  const safeSortOrder = validSortOrders.includes(sortOrder.toLowerCase()) ? sortOrder.toUpperCase() : "DESC";
  query += ` ORDER BY ${safeSortBy} ${safeSortOrder}`;
  try {
    if (params.length > 0) {
      employees = db.prepare(query).all(...params);
    } else {
      employees = db.prepare(query).all();
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    employees = [];
  }
  return {
    employees: employees.map((employee) => ({
      ...employee,
      // Ensure birthday is treated as string for consistency with client-side input type="date"
      birthday: employee.birthday ? new Date(employee.birthday).toISOString().split("T")[0] : null,
      // --- IMPORTANT: Construct the URL for the API endpoint ---
      // The database stores the relative path (e.g., 'employees/abc.png')
      // We construct the full URL that the browser will request.
      profile_image: employee.profile_image ? `/api/uploads/${employee.profile_image.replace(/\\/g, "/")}` : null
      // -----------------------------------------------------------
    })),
    search,
    sortBy: safeSortBy,
    sortOrder: safeSortOrder
  };
};
const actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const gender = data.get("gender")?.toString();
    const birthday = data.get("birthday")?.toString();
    const role = data.get("role")?.toString();
    const inventory_assignment = data.get("inventory_assignment")?.toString();
    const profile_image = data.get("profile_image");
    if (!name || !gender || !birthday || !role) {
      return fail(400, {
        error: "Name, gender, birthday, and role are required."
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
        const filePath = path.join(EMPLOYEES_UPLOAD_DIR, uniqueFilename);
        writeFileSync(filePath, Buffer.from(await profile_image.arrayBuffer()));
        imageRelativePath = path.join("employees", uniqueFilename);
        imageRelativePath = imageRelativePath.replace(/\\/g, "/");
      } catch (err) {
        console.error("Error saving profile image:", err);
        return fail(500, { error: "Failed to upload profile image." });
      }
    }
    try {
      const transactionResult = db.transaction(() => {
        const insertResult = db.prepare(
          `
          INSERT INTO employees (name, gender, birthday, role, inventory_assignment, profile_image)
          VALUES (?, ?, ?, ?, ?, ?)
          `
        ).run(
          name,
          gender,
          birthday,
          role,
          inventory_assignment || null,
          imageRelativePath
          // Save the relative image path
        );
        const newID = Number(insertResult.lastInsertRowid);
        const userId = locals.user?.id || null;
        logActivity(
          "created",
          "employee",
          newID,
          `New employee "${name}" added.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error creating employee:", error);
      return fail(500, { error: "Failed to create employee." });
    }
  },
  update: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    const name = data.get("name")?.toString();
    const gender = data.get("gender")?.toString();
    const birthday = data.get("birthday")?.toString();
    const role = data.get("role")?.toString();
    const inventory_assignment = data.get("inventory_assignment")?.toString();
    const profile_image_file = data.get("profile_image");
    data.get("current_image_path")?.toString();
    const remove_profile_image_flag = data.get("remove_profile_image") === "true";
    if (isNaN(id) || !name || !gender || !birthday || !role) {
      return fail(400, {
        error: "ID, name, gender, birthday, and role are required."
      });
    }
    const currentEmployee = db.prepare("SELECT name, profile_image FROM employees WHERE id = ?").get(id);
    const oldEmployeeName = currentEmployee?.name || "Unknown Employee";
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
        if (currentEmployee?.profile_image) {
          const oldFilePath = path.join(
            UPLOADS_BASE_DIR,
            currentEmployee.profile_image
          );
          if (existsSync(oldFilePath)) {
            unlinkSync(oldFilePath);
          }
        }
        const fileExtension = path.extname(profile_image_file.name);
        const uniqueFilename = `${v4()}${fileExtension}`;
        const filePath = path.join(EMPLOYEES_UPLOAD_DIR, uniqueFilename);
        writeFileSync(
          filePath,
          Buffer.from(await profile_image_file.arrayBuffer())
        );
        newImageRelativePath = path.join("employees", uniqueFilename);
        newImageRelativePath = newImageRelativePath.replace(/\\/g, "/");
      } catch (err) {
        console.error("Error updating profile image:", err);
        return fail(500, { error: "Failed to upload new profile image." });
      }
    } else if (remove_profile_image_flag) {
      if (currentEmployee?.profile_image) {
        const oldFilePath = path.join(
          UPLOADS_BASE_DIR,
          currentEmployee.profile_image
        );
        if (existsSync(oldFilePath)) {
          unlinkSync(oldFilePath);
        }
      }
      newImageRelativePath = null;
    }
    try {
      const transactionResult = db.transaction(() => {
        let updateQuery = `
          UPDATE employees
          SET name = ?, gender = ?, birthday = ?, role = ?, inventory_assignment = ?
        `;
        const params = [
          name,
          gender,
          birthday,
          role,
          inventory_assignment || null
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
        logActivity(
          "updated",
          "employee",
          id,
          `Employee "${oldEmployeeName}" (ID: ${id}) updated.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error updating employee:", error);
      return fail(500, { error: "Failed to update employee." });
    }
  },
  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    if (isNaN(id)) {
      return fail(400, { error: "Employee ID is required." });
    }
    try {
      const transactionResult = db.transaction(() => {
        const employee = db.prepare("SELECT name, profile_image FROM employees WHERE id = ?").get(id);
        const employeeName = employee?.name || "Unknown Employee";
        if (employee && employee.profile_image) {
          const imagePathToDelete = path.join(
            UPLOADS_BASE_DIR,
            employee.profile_image
          );
          if (existsSync(imagePathToDelete)) {
            unlinkSync(imagePathToDelete);
            console.log(`Deleted employee image: ${imagePathToDelete}`);
          }
        }
        db.prepare("DELETE FROM employees WHERE id = ?").run(id);
        const userId = locals.user?.id || null;
        logActivity(
          "deleted",
          "employee",
          id,
          `Employee "${employeeName}" (ID: ${id}) deleted.`,
          userId
        );
        return { success: true };
      })();
      return transactionResult;
    } catch (error) {
      console.error("Error deleting employee:", error);
      return fail(500, { error: "Failed to delete employee." });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DXocdQHY.js')).default;
const server_id = "src/routes/dashboard/employees/+page.server.ts";
const imports = ["_app/immutable/nodes/10.-f1DYnyQ.js","_app/immutable/chunks/CY4Ce0c4.js","_app/immutable/chunks/BdQXYw_T.js","_app/immutable/chunks/BO5sSAji.js","_app/immutable/chunks/DAK0Aekt.js","_app/immutable/chunks/D9hGQICX.js","_app/immutable/chunks/DsUCSRu3.js","_app/immutable/chunks/B7wWqVz8.js","_app/immutable/chunks/D8SxGvop.js","_app/immutable/chunks/Bex-ZZ3I.js","_app/immutable/chunks/1fwwRmkB.js","_app/immutable/chunks/BZ9DdiR_.js","_app/immutable/chunks/B3kFzWm3.js","_app/immutable/chunks/MTanKdmA.js","_app/immutable/chunks/BDEhTM1z.js","_app/immutable/chunks/79yj6mvb.js","_app/immutable/chunks/C8nz08U9.js","_app/immutable/chunks/BXiYU_fU.js","_app/immutable/chunks/DYevSITT.js","_app/immutable/chunks/BnoYQOO4.js","_app/immutable/chunks/DG-I9f0P.js","_app/immutable/chunks/BCMyTCEX.js","_app/immutable/chunks/B_4Zpmki.js","_app/immutable/chunks/BOqc4mWw.js","_app/immutable/chunks/FbqajOR9.js","_app/immutable/chunks/UFUhM6vw.js","_app/immutable/chunks/6xhieDVM.js","_app/immutable/chunks/CsJL26Fh.js","_app/immutable/chunks/CVjO-GJU.js","_app/immutable/chunks/DIvwaDiU.js","_app/immutable/chunks/CEVutZxn.js","_app/immutable/chunks/CPRTWbuQ.js","_app/immutable/chunks/BZzk2vwh.js","_app/immutable/chunks/0sm_qxqv.js","_app/immutable/chunks/_cz2kCqa.js","_app/immutable/chunks/DKAGjdov.js","_app/immutable/chunks/0urWu8Wf.js","_app/immutable/chunks/CjAUM5o7.js","_app/immutable/chunks/CfmL5u39.js","_app/immutable/chunks/CTGOP75E.js","_app/immutable/chunks/Dt21h0cY.js","_app/immutable/chunks/DgoSFWl1.js","_app/immutable/chunks/NyzMnUbZ.js","_app/immutable/chunks/D_UmtYL2.js","_app/immutable/chunks/CsSzQ2UU.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-CyGiYXrR.js.map
