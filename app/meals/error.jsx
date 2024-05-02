"use client";

// Reserved file that handles errors in this folder
const ErrorPage = ({ error }) => {
  return (
    <main className="error">
      <h1>An error occured</h1>
      <p>Failed to fetch meal data. Please try again!</p>
    </main>
  );
};

export default ErrorPage;
