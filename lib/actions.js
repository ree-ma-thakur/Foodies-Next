"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

// create the server action that can be used a prop & function will run over there only

export async function shareMeal(formData) {
  // We can not have server actions in client page
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  await saveMeal(meal);
  redirect("/meals");
}
