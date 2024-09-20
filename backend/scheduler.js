const cron = require("node-cron");
const { notifyUpcomingEvents } = require("./controllers/eventController");

// Schedule notification job to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  await notifyUpcomingEvents();
  console.log("Notification for upcoming events sent.");
});
