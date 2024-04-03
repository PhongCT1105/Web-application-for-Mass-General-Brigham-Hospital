import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "./routes/LoginPage.tsx";
import HomePage from "@/routes/HomePage.tsx";
import AboutUsPage from "@/routes/AboutUsPage.tsx";
import ServiceRequestPage from "@/routes/service-request/ServiceRequestPage.tsx";
// import HeroPage from "@/routes/HeroPage.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <h1>ERROR</h1>,
      element: <Root />,
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
      ],
    },
    {
      path: "/home",
      errorElement: <h1>ERROR</h1>,
      element: <HomePage />,
    },
    {
      path: "/login",
      errorElement: <h1>ERROR</h1>,
      element: <LoginPage />,
    },
    {
      path: "/about-us",
      errorElement: <h1>ERROR</h1>,
      element: <AboutUsPage />,
    },
    {
      path: "/login",
      errorElement: <h1>ERROR</h1>,
      element: <LoginPage />,
    },
    {
      path: "/service-requests",
      errorElement: <h1>ERROR</h1>,
      element: <ServiceRequestPage />,
    },
  ]);

  return <RouterProvider router={router} />;

  function Root() {
    return (
      <div className="w-full flex flex-col">
        <Outlet />
      </div>
    );
  }
}

export default App;
