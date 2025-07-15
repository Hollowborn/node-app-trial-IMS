import { r as redirect } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import bcrypt from 'bcryptjs';

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    role TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);
async function login(username, password) {
  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (!user) {
      return { success: false, message: "Invalid username or password" };
    }
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return { success: false, message: "Invalid username or password" };
    }
    const sessionId = crypto.randomUUID();
    db.prepare(
      `
      INSERT INTO sessions (id, user_id, role)
      VALUES (?, ?, ?)
    `
    ).run(sessionId, user.id, user.role);
    return {
      success: true,
      sessionId,
      user: {
        id: user.id,
        display_name: user.display_name,
        username: user.username,
        role: user.role
      }
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }
}
function getSession(sessionId) {
  try {
    const sessionRow = db.prepare(
      `
            SELECT
                s.id,
                s.user_id AS userId,  -- <<< IMPORTANT: Alias 'user_id' to 'userId'
                s.created_at AS createdAt,
                u.role                -- Join with users table to get role if needed
            FROM sessions s
            JOIN users u ON s.user_id = u.id
            WHERE s.id = ?
        `
    ).get(sessionId);
    if (sessionRow) {
      return {
        id: sessionRow.id,
        userId: sessionRow.userId,
        // Use the aliased name here
        role: sessionRow.role,
        createdAt: new Date(sessionRow.createdAt)
      };
    }
    return void 0;
  } catch (error) {
    console.error("Error in getSession:", error);
    return void 0;
  }
}
function logout(sessionId) {
  try {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId);
  } catch (error) {
    console.error("Logout error:", error);
  }
}
async function requireAuth(event) {
  const sessionId = event.cookies.get("sessionId");
  const session = sessionId ? getSession(sessionId) : null;
  if (!session) {
    throw redirect(303, "/login");
  }
  return session;
}
async function requireRole(event, roles) {
  const session = await requireAuth(event);
  if (!roles.includes(session.role)) {
    throw redirect(303, "/unauthorized");
  }
  return session;
}
function getUserById(userId) {
  try {
    return db.prepare(
      "SELECT id, username, display_name, password_hash, role, profile_image FROM users WHERE id = ?"
    ).get(userId);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return void 0;
  }
}

export { getUserById as a, login as b, getSession as g, logout as l, requireRole as r };
//# sourceMappingURL=auth-D4luyh-r.js.map
