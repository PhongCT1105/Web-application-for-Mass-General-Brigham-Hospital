// Importing necessary modules from React and react-router-dom library
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Importing different pages and components for routing
import LoginPage from "./routes/LoginPage.tsx";
import HomePage from "./routes/HomePage.tsx"; // Correct import path
import AboutUsPage from "./routes/AboutUsPage.tsx"; // Correct import path
import ServiceRequestPage from "./routes/service-request/ServiceRequestPage.tsx"; // Correct import path
import CSVTable from "./routes/CSVPage/csvTable.tsx";
import RequestLogPage from "@/routes/request-log/RequestLogPage.tsx"; // Correct import path
import { Sanitation } from "@/routes/service-request/SanitationRequestPage.tsx";
import MapEditingPage from "@/routes/MapEditingPage.tsx";
import StartPage from "@/routes/StartPage.tsx";
import { GraphStateProvider } from "@/context/nodeContext.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <h1>ERROR</h1>,
      element: <Root />,
      children: [
        {
          path: "",
          element: <StartPage />,
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
      path: "/request-log-Page",
      errorElement: <h1>ERROR</h1>,
      element: <RequestLogPage />,
    },
    {
      path: "/about-us",
      errorElement: <h1>ERROR</h1>,
      element: <AboutUsPage />,
    },
    {
      path: "/service-requests",
      errorElement: <h1>ERROR</h1>,
      element: <ServiceRequestPage />,
    },
    {
      path: "/csv-table",
      element: <CSVTable />,
    },
    {
      path: "/sanitation",
      element: <Sanitation />,
    },
    {
      path: "/map-editor/map",
      errorElement: <h1>ERROR</h1>,
      element: <MapEditingPage />,
    },
  ]);

  return (
    <GraphStateProvider>
      <RouterProvider router={router} />
    </GraphStateProvider>
  );

  function Root() {
    return (
      <div className="w-full flex flex-col">
        <Outlet />
      </div>
    );
  }
}

export default App;
