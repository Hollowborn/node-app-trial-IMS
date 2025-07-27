import './auth-CkYXVrx8.js';
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
    const upcomingBookings = db.prepare(
      `
        SELECT
        b.id,
        b.purpose,
        b.date,
        b.time,
        c.name AS client_name
      FROM bookings AS b
      JOIN clients AS c ON b.client_id = c.id
      WHERE
        (b.date > CURRENT_DATE) -- Bookings on future dates
        OR
        (b.date = CURRENT_DATE AND b.time > CURRENT_TIME) -- Bookings today, but in the future
        ORDER BY b.date ASC, b.time ASC
      LIMIT 5        
        `
    ).all();
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
      upcomingBookings: upcomingBookings.map((booking) => ({
        ...booking,
        date: new Date(booking.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }),
        time: booking.time.substring(0, 5)
        // Format time to HH:MM
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
const component = async () => component_cache ??= (await import('./_page.svelte-CjLldD2u.js')).default;
const server_id = "src/routes/dashboard/+page.server.ts";
const imports = ["_app/immutable/nodes/4.EgezDq83.js","_app/immutable/chunks/Do_-mL-j.js","_app/immutable/chunks/CSgM7ggg.js","_app/immutable/chunks/Cc2sBIKg.js","_app/immutable/chunks/DFkGWr6I.js","_app/immutable/chunks/BveS6AeT.js","_app/immutable/chunks/BxwOPTHF.js","_app/immutable/chunks/BBrFK00f.js","_app/immutable/chunks/eOTtUvit.js","_app/immutable/chunks/AFOXVD51.js","_app/immutable/chunks/C_qPImRn.js","_app/immutable/chunks/BgG39g1l.js","_app/immutable/chunks/C9JwNqn8.js","_app/immutable/chunks/D5BR4JST.js","_app/immutable/chunks/Cdy27KB5.js","_app/immutable/chunks/BVmkDKMc.js","_app/immutable/chunks/C4zdccf6.js","_app/immutable/chunks/BAYIV7lD.js","_app/immutable/chunks/oTMF8r7P.js","_app/immutable/chunks/DTVKcNaw.js","_app/immutable/chunks/CFJF3e64.js","_app/immutable/chunks/DKYlzseR.js","_app/immutable/chunks/Cj5OlSWR.js","_app/immutable/chunks/C5bcMok0.js","_app/immutable/chunks/Bi5o8etP.js","_app/immutable/chunks/Dlm0QRJp.js","_app/immutable/chunks/OZ3l4Dmb.js","_app/immutable/chunks/CU8TJT68.js","_app/immutable/chunks/esl9IfTG.js","_app/immutable/chunks/CwTfDKE9.js","_app/immutable/chunks/ARt1Dh6s.js","_app/immutable/chunks/DgaOHvE-.js","_app/immutable/chunks/DimrunNa.js","_app/immutable/chunks/vwxvcgrC.js"];
const stylesheets = ["_app/immutable/assets/4.D5n1WDsw.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-BRFmLS_D.js.map
