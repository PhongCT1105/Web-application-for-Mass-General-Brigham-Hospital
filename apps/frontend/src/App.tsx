import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ExampleRoute from "./routes/ExampleRoute.tsx";
import HomePage from "./routes/HomePage.tsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <h1>Error</h1>,
      element: <Root />,
      children: [
        {
          path: "",
          element: <ExampleRoute />,
        },
      ],
    },
    {
      path: "/home-page",
      errorElement: (
        <>
          <h1>Error</h1>
        </>
      ),
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="w-full flex flex-col px-20 gap-5">
        <h1>Welcome to your starter code.</h1>
        <Outlet />
      </div>
    );
  }
}

export default App;
