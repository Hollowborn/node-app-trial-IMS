import { d as db } from './database-BZRN5Cgi.js';

async function logActivity(actionType, entityType, entityId, description, userId = null) {
  try {
    db.prepare(
      `
            INSERT INTO activity_log (user_id, action_type, entity_type, entity_id, description)
            VALUES (?, ?, ?, ?, ?)
        `
    ).run(userId, actionType, entityType, entityId, description);
  } catch (logError) {
    console.error(
      `Failed to log activity for ${actionType} ${entityType} (ID: ${entityId}):`,
      logError
    );
  }
}

export { logActivity as l };
//# sourceMappingURL=activityLogger-DQXDyR0j.js.map
