const fs = require("fs");
const path = require("path");
const db = require("./lib/db");

const runSeed = async () => {
  try {
    const seedSqlPath = path.resolve(__dirname, "db/seeds.sql");
    const seedSql = fs.readFileSync(seedSqlPath, "utf-8");

    await db.query(seedSql);

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    db.end();
  }
};

runSeed();
