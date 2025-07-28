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
const component = async () => component_cache ??= (await import('./_page.svelte-BNBr75pp.js')).default;
const server_id = "src/routes/dashboard/employees/+page.server.ts";
const imports = ["_app/immutable/nodes/10.DGMfltvI.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/BOZ4giT5.js","_app/immutable/chunks/uKHEHksz.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/B5-iWWaj.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/Bo2GsiZ3.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/CdrzcX6z.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/BVRQx7W_.js","_app/immutable/chunks/CW0o_Oq5.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/EdVlTvtb.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/DtIGnhnO.js","_app/immutable/chunks/DRgJLo_S.js","_app/immutable/chunks/B762jp4P.js","_app/immutable/chunks/Dlm0QRJp.js","_app/immutable/chunks/BkXn0r0G.js","_app/immutable/chunks/BAa4oyvZ.js","_app/immutable/chunks/DoL5uH6g.js","_app/immutable/chunks/C0R_oNfb.js","_app/immutable/chunks/ARt1Dh6s.js","_app/immutable/chunks/fdmIGhiF.js","_app/immutable/chunks/B3v1Wr7v.js","_app/immutable/chunks/Ca16gRfA.js","_app/immutable/chunks/CU8TJT68.js","_app/immutable/chunks/HFpTe9lc.js","_app/immutable/chunks/nTpf8bzQ.js"];
const stylesheets = ["_app/immutable/assets/index.CV-KWLNP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-B_8hMULH.js.map
