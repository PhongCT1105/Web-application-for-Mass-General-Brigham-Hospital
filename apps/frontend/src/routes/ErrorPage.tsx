import React from "react";
import "leaflet/dist/leaflet.css";

const ErrorPage: React.FC = () => {
  return (
    <div
      className="dark flex flex-col h-screen justify-center items-center"
      style={{
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-300">
        We're sorry, but an error occurred while processing your request.
      </p>
      <p className="text-lg" style={{ color: "hsl(var(--background))" }}>
        Team Awesome was here
      </p>
    </div>
  );
};

export default ErrorPage;
