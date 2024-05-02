import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Loading meals failed");  //Eg for error handling
  return db.prepare("SELECT * FROM meals").all(); // all is used to fetch all data, run is used to insert data, to get single row we use get
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); // Not directly adding slug to get protection from sql injections, use ? & add slug with get
}
