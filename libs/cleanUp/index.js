import cron from "node-cron";

cron.schedule("0 * * * *", async () => {
  console.log("🧹 Running cleanup cron job...");
  await deleteUnverifiedUsers();
});
