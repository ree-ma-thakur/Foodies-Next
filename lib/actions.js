"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

// create the server action that can be used a prop & function will run over there only
export async function shareMeal(prevState, formData) {
  // We can not have server actions in client page
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { message: "Invali Input" };
  }
  await saveMeal(meal);
  revalidatePath("/meals"); // This tell nextjs to revalidate the cache path: This will revalidate only /meals not other nested paths
  //   revalidatePath("/meals", "layout"); // now it will revalidate nested paths of  also (by default it is page, not layout)
  //   revalidatePath("/", "layout"); // now it will revalidate all nested paths of project
  redirect("/meals");
}
