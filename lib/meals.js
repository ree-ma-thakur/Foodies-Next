import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Loading meals failed");  //Eg for error handling
  return db.prepare("SELECT * FROM meals").all(); // all is used to fetch all data, run is used to insert data, to get single row we use get
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); // Not directly adding slug to get protection from sql injections, use ? & add slug with get
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  // We will store image in public folder not in DB (only in dvt, in production we have .next folder that is used, there is production this code will break)
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`; // To make sure that we don't accidently override other images with same file name
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer(); // It will return promise, therefore await
  // Stream.write takes 2 arguments: thing we want to write & another is function that executes when write is completed
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });
  meal.image = `/images/${fileName}`; // We don't use public here
  db.prepare(
    `
    INSERT INTO  meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
