import { r as requireRole } from './auth-D4luyh-r.js';
import { f as fail } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import { existsSync, unlinkSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { l as logActivity } from './activityLogger-DQXDyR0j.js';
import 'bcryptjs';
import 'better-sqlite3';

const UPLOAD_DIR = path.join(process.cwd(), "static", "uploads", "employees");
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
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
      birthday: employee.birthday ? new Date(employee.birthday).toISOString().split("T")[0] : null
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
        imagePath = `/uploads/employees/${uniqueFilename}`;
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
          imagePath
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
    const current_image_path = data.get("current_image_path")?.toString();
    const remove_profile_image_flag = data.get("remove_profile_image") === "true";
    if (isNaN(id) || !name || !gender || !birthday || !role) {
      return fail(400, {
        error: "ID, name, gender, birthday, and role are required."
      });
    }
    const currentEmployee = db.prepare("SELECT name FROM employees WHERE id = ?").get(id);
    const oldEmployeeName = currentEmployee?.name || "Unknown Employee";
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
        newImagePath = `/uploads/employees/${uniqueFilename}`;
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
        if (newImagePath !== void 0) {
          updateQuery += `, profile_image = ?`;
          params.push(newImagePath);
        }
        updateQuery += ` WHERE id = ?`;
        params.push(id);
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
            process.cwd(),
            "static",
            employee.profile_image
          );
          if (existsSync(imagePathToDelete)) {
            unlinkSync(imagePathToDelete);
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
const component = async () => component_cache ??= (await import('./_page.svelte-BZpT4Rwl.js')).default;
const server_id = "src/routes/dashboard/employees/+page.server.ts";
const imports = ["_app/immutable/nodes/10.DS6u3EzE.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/q_geWe1R.js","_app/immutable/chunks/Co0R7JPe.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/Cl_oq7nf.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/BUlJYItk.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/C43ptUaS.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/DOd2QSgZ.js","_app/immutable/chunks/DaJoOla_.js","_app/immutable/chunks/HUBSOgFT.js","_app/immutable/chunks/Cd7yCszS.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/BeUoQy-y.js","_app/immutable/chunks/okGsx2OR.js","_app/immutable/chunks/DQk1ANEP.js","_app/immutable/chunks/CbD0lEU8.js","_app/immutable/chunks/Dcluerj8.js","_app/immutable/chunks/DBcW8l46.js","_app/immutable/chunks/BMspJ8Yh.js","_app/immutable/chunks/FAwHm2RX.js","_app/immutable/chunks/D47F4gF3.js","_app/immutable/chunks/CvWd9xh1.js","_app/immutable/chunks/BD6Ecydl.js","_app/immutable/chunks/CkucYYup.js","_app/immutable/chunks/ClzY2XPi.js","_app/immutable/chunks/Jos_wYTi.js","_app/immutable/chunks/DOotmoI5.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-DowxBR8Y.js.map
