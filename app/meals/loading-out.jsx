// It is reserved file name that get activated when the page.jsx is loading the data
import classes from "./loading.module.css";

const MealsLoadingPage = () => {
  return <p className={classes.loading}>Loading meals...</p>;
};

export default MealsLoadingPage;
