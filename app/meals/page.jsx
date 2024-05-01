import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";

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
        <MealsGrid meals={[]} />
      </main>
    </>
  );
};

export default MealsPage;
