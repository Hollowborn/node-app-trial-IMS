import { r as redirect } from './index2-Ddp2AB5f.js';
import { g as getSession, a as getUserById, l as logout } from './auth-D4luyh-r.js';
import cron from 'node-cron';
import { d as db } from './database-BZRN5Cgi.js';
import 'bcryptjs';
import 'better-sqlite3';
import 'path';
import 'fs';

let cronJobInitialized = false;
const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("sessionId");
  let user = null;
  console.log("--- hooks.server.ts START ---");
  console.log("Request URL:", event.url.pathname);
  console.log("Session ID from cookie:", sessionId);
  if (!cronJobInitialized) {
    console.log("Initializing monthly session cleanup cron job...");
    cron.schedule("0 0 1 * *", () => {
      console.log("Running monthly session cleanup...");
      try {
        db.prepare(
          "DELETE FROM sessions WHERE created_at < strftime('%Y-%m-%d %H:%M:%S', 'now', '-1 month');"
        ).run();
        console.log("Monthly session cleanup completed.");
      } catch (error) {
        console.error("Error during monthly session cleanup:", error);
      }
    });
    cronJobInitialized = true;
  }
  if (sessionId) {
    const session = getSession(sessionId);
    console.log("Session retrieved by getSession:", session);
    if (session) {
      const fetchedUser = getUserById(session.userId);
      console.log("User fetched by getUserById:", fetchedUser);
      if (fetchedUser) {
        user = {
          id: fetchedUser.id,
          username: fetchedUser.username,
          display_name: fetchedUser.display_name,
          role: fetchedUser.role,
          profile_image: fetchedUser.profile_image
          // Make sure this is included in your User type in auth.ts
        };
        console.log("event.locals.user WILL BE:", user);
      } else {
        console.log(
          "User NOT FOUND for session ID:",
          sessionId,
          "Logging out session."
        );
        logout(sessionId);
        event.cookies.delete("sessionId", { path: "/" });
      }
    } else {
      console.log(
        "Session NOT FOUND for session ID:",
        sessionId,
        "Deleting cookie."
      );
      event.cookies.delete("sessionId", { path: "/" });
    }
  } else {
    console.log("No session ID found in cookie.");
  }
  event.locals.user = user;
  if (event.url.pathname === "/logout") {
    console.log("Handling logout request.");
    if (sessionId) {
      logout(sessionId);
      event.cookies.delete("sessionId", { path: "/" });
    }
    throw redirect(303, "/login");
  }
  const response = await resolve(event);
  console.log("--- hooks.server.ts END ---");
  return response;
};

export { handle };
//# sourceMappingURL=hooks.server-CK-551md.js.map
