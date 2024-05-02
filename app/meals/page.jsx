import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import MealsLoadingPage from "./loading-out";

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delecious Meals, created
          <span className={classes.highlight}> by yoy</span>
        </h1>
        <p>
          Choose your favourite recipe & cook it for yourself. It is easy & fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favourite Recipe</Link>
        </p>
      </header>
      <main className={classes}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
