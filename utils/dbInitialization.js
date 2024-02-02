const db = require("../lib/db.js");
const fs = require("fs");

const initializeDatabase = async () => {
  try {
    await db.query(fs.readFileSync("./db/schema.sql", "utf8"));
    // await db.query(fs.readFileSync("./db/seeds.sql", "utf8"));
  } catch (error) {
    console.error("Error initializing database:", error.message);
  }
};

module.exports = initializeDatabase;
