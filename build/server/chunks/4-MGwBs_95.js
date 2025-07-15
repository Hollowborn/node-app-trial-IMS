import './auth-D4luyh-r.js';
import { e as error } from './index2-Ddp2AB5f.js';
import { d as db } from './database-BZRN5Cgi.js';
import 'bcryptjs';
import 'better-sqlite3';
import 'path';
import 'fs';

const load = async (event) => {
  if (!event.locals.user) {
    console.warn(
      "DEBUG: event.locals.user is null in dashboard load. Providing a placeholder."
    );
    event.locals.user = {
      id: 0,
      // Placeholder ID
      username: "guest",
      display_name: "Guest User",
      role: "admin",
      // Or 'admin' if you want to see admin features
      profile_image: null
      // No avatar for guest
    };
  }
  try {
    const totalClients = db.prepare("SELECT COUNT(id) AS count FROM clients").get();
    const newClientsLastMonth = db.prepare(
      `SELECT COUNT(id) AS count FROM clients WHERE created_at >= DATE('now', '-30 days')`
    ).get();
    const totalPonds = db.prepare("SELECT COUNT(id) AS count FROM ponds").get();
    const activePonds = db.prepare("SELECT COUNT(id) AS count FROM ponds WHERE status = 'active'").get();
    const inactiveClients = db.prepare(
      "SELECT COUNT(id) AS count FROM clients WHERE status != 'active'"
    ).get();
    const inactivePonds = db.prepare("SELECT COUNT(id) AS count FROM ponds WHERE status != 'active'").get();
    const totalEmployees = db.prepare("SELECT COUNT(id) AS count FROM employees").get();
    const newEmployeesThisQuarter = db.prepare(
      `SELECT COUNT(id) AS count FROM employees WHERE created_at >= DATE('now', '-3 months')`
    ).get();
    const totalStockingEvents = db.prepare("SELECT COUNT(id) AS count FROM stocking_info").get();
    const lastStockingDate = db.prepare("SELECT MAX(stocking_date) AS last_date FROM stocking_info").get();
    const stockedThisMonth = db.prepare(
      `
    SELECT COUNT(*) AS count
    FROM stocking_info
    WHERE strftime('%Y-%m', stocking_date) = strftime('%Y-%m', 'now')
  `
    ).get();
    const employeesWithBirthdayThisMonth = db.prepare(
      `SELECT id, name, birthday
     FROM employees
     WHERE strftime('%m', birthday) = strftime('%m', 'now')`
    ).all();
    const formattedBirthdays = employeesWithBirthdayThisMonth.map((emp) => ({
      ...emp,
      birthday: new Date(emp.birthday).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
      })
    }));
    const salesSummary = db.prepare(
      `
      SELECT
        SUM(estimated_sales) AS total_estimated_sales,
        SUM(projected_amount) AS total_projected_amount,
        SUM(feeds_used_kg) AS total_feeds_used_kg,
        SUM(feed_cost) AS total_feed_cost
      FROM sales
    `
    ).get();
    const feedInventorySummary = db.prepare(
      `
      SELECT
        SUM(quantity_kg) AS total_quantity_kg,
        SUM(total_cost) AS total_cost
      FROM feed_inventory
    `
    ).get();
    const hardwareInventorySummary = db.prepare(
      `
      SELECT
        SUM(quantity) AS total_quantity,
        SUM(total_cost) AS total_cost
      FROM hardware_inventory
    `
    ).get();
    const recentStocking = db.prepare(
      `
      SELECT
        si.id,
        si.stocking_date,
        si.species_name,
        si.fingerlings_stocked_count_ma,
        c.name AS client_name
      FROM stocking_info AS si
      JOIN clients AS c ON si.client_id = c.id
      ORDER BY si.stocking_date DESC
      LIMIT 5
    `
    ).all();
    const productionSummary = db.prepare(
      `
      SELECT
        SUM(mortality_count) AS total_mortality_count,
        SUM(feed_consumed_kg) AS total_feed_consumed_kg
      FROM production_reports
    `
    ).get();
    const clientsByOperatorType = db.prepare(
      `
      SELECT operator_type, COUNT(id) AS count
      FROM clients
      GROUP BY operator_type
    `
    ).all() || [];
    const monthlyStocking = db.prepare(
      `
      SELECT
        STRFTIME('%Y-%m', stocking_date) AS month,
        COUNT(id) AS count
      FROM stocking_info
      GROUP BY month
      ORDER BY month ASC
      LIMIT 12 -- Last 12 months
    `
    ).all() || [];
    const monthlyStockingChartData = monthlyStocking.map((item) => {
      const [yearStr, monthStr] = item.month.split("-");
      const date = new Date(parseInt(yearStr), parseInt(monthStr) - 1);
      const monthName = date.toLocaleString("en-US", { month: "short" });
      return {
        month: monthName,
        // The short month name for X-axis
        year: parseInt(yearStr),
        // The year as a number
        fullMonth: item.month,
        // Keep the original 'YYYY-MM' for tooltip if needed
        count: item.count
      };
    });
    const feedConsumptionByStage = db.prepare(
      `
      SELECT feed_stage, SUM(current_stock_kg) AS current_kg, SUM(quantity_kg) AS total_kg
      FROM feed_inventory
      GROUP BY feed_stage
    `
    ).all() || [];
    const topHardwareItems = db.prepare(
      `
      SELECT item_name, total_cost
      FROM hardware_inventory
      ORDER BY total_cost DESC
      LIMIT 5
    `
    ).all() || [];
    const bookingsStatus = db.prepare(
      `
      SELECT status, COUNT(id) AS count
      FROM bookings
      GROUP BY status
    `
    ).all() || [];
    const recentActivities = db.prepare(
      `
    SELECT
      al.id,
      al.action_type,
      al.entity_type,
      al.entity_id,
      al.description,
      al.timestamp,
      u.username AS performed_by_user -- Assuming a 'users' table with username
    FROM activity_log AS al
    LEFT JOIN users AS u ON al.user_id = u.id -- Join if user_id is logged
    ORDER BY al.timestamp DESC
    LIMIT 10 -- Fetch the latest 10 activities
  `
    ).all();
    return {
      keyMetrics: {
        totalClients: totalClients.count,
        newClientsLastMonth: newClientsLastMonth.count,
        totalPonds: totalPonds.count,
        activePonds: activePonds.count,
        inactivePonds: inactivePonds.count,
        totalEmployees: totalEmployees.count,
        newEmployeesThisQuarter: newEmployeesThisQuarter.count,
        totalStockingEvents: totalStockingEvents.count,
        lastStockingDate: lastStockingDate.last_date,
        stockedPondsThisMonth: stockedThisMonth.count,
        inactiveClients: inactiveClients.count,
        birthdaysThisMonth: formattedBirthdays
      },
      financialSummary: {
        totalEstimatedSales: salesSummary.total_estimated_sales || 0,
        totalProjectedAmount: salesSummary.total_projected_amount || 0,
        totalFeedsUsedKg: salesSummary.total_feeds_used_kg || 0,
        totalFeedCost: salesSummary.total_feed_cost || 0
      },
      inventorySummary: {
        totalFeedQuantityKg: feedInventorySummary.total_quantity_kg || 0,
        totalFeedCost: feedInventorySummary.total_cost || 0,
        totalHardwareQuantity: hardwareInventorySummary.total_quantity || 0,
        totalHardwareCost: hardwareInventorySummary.total_cost || 0
      },
      productionSummary: {
        totalMortalityCount: productionSummary.total_mortality_count || 0,
        totalFeedConsumedKg: productionSummary.total_feed_consumed_kg || 0
      },
      recentActivities: recentActivities.map((activity) => ({
        ...activity,
        timestamp: new Date(activity.timestamp).toLocaleString()
        // Format timestamp for display
      })),
      recentStocking: recentStocking.map((s) => ({
        ...s,
        stocking_date: new Date(s.stocking_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        })
      })),
      charts: {
        clientsByOperatorType,
        monthlyStockingChartData,
        feedConsumptionByStage,
        topHardwareItems,
        bookingsStatus
      }
    };
  } catch (error$1) {
    console.error("Error loading dashboard data:", error$1);
    throw error(
      500,
      "Failed to load dashboard data. Please try again later."
    );
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B1A9b4cv.js')).default;
const server_id = "src/routes/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/4.DJosKEiE.js","_app/immutable/chunks/BxWPM7vt.js","_app/immutable/chunks/VrzbJYtp.js","_app/immutable/chunks/jPwQk_2E.js","_app/immutable/chunks/BwGKD061.js","_app/immutable/chunks/K2z4qc4G.js","_app/immutable/chunks/3dJlLkWl.js","_app/immutable/chunks/DhHZR6J_.js","_app/immutable/chunks/_Y1sUBdb.js","_app/immutable/chunks/BHm98m4T.js","_app/immutable/chunks/CNxF7Pog.js","_app/immutable/chunks/BjxZ6Dx9.js","_app/immutable/chunks/DTKX657x.js","_app/immutable/chunks/KVJ3k5BI.js","_app/immutable/chunks/CfhtIqMF.js","_app/immutable/chunks/CmULTxPs.js","_app/immutable/chunks/PI_H1sqg.js","_app/immutable/chunks/DGxjUAYV.js","_app/immutable/chunks/HUBSOgFT.js","_app/immutable/chunks/D40UmvHY.js","_app/immutable/chunks/Dg2TCPR_.js","_app/immutable/chunks/CD-1ytIX.js","_app/immutable/chunks/BdHGsVH7.js","_app/immutable/chunks/Dcluerj8.js","_app/immutable/chunks/a2Q9XIBf.js","_app/immutable/chunks/twlfZeI1.js","_app/immutable/chunks/Cvje7MCY.js","_app/immutable/chunks/D1dXutnj.js","_app/immutable/chunks/CLa6yqf_.js","_app/immutable/chunks/Cj2i8k79.js","_app/immutable/chunks/ClzY2XPi.js","_app/immutable/chunks/CO0Jp7Tw.js","_app/immutable/chunks/BBOATMWh.js","_app/immutable/chunks/CvWd9xh1.js","_app/immutable/chunks/Dny4sgdo.js","_app/immutable/chunks/De5Sab-k.js","_app/immutable/chunks/m2nucEPg.js"];
const stylesheets = ["_app/immutable/assets/4.D5n1WDsw.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-MGwBs_95.js.map
