// Importing necessary modules from React and react-router-dom library
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Importing different pages and components for routing
import LoginPage from "./routes/LoginPage.tsx";
import HomePage from "./routes/HomePage.tsx"; // Correct import path
import AboutCreditsPages from "./routes/AboutCreditsPages.tsx"; // Correct import path
import ServiceRequestPage from "./routes/service-request/ServiceRequestPage.tsx"; // Correct import path
import CSVTable from "./routes/CSVPage/csvTable.tsx";
import RequestLogPage from "@/routes/request-log/RequestLogPage.tsx"; // Correct import path
import { Sanitation } from "@/routes/service-request/SanitationRequestPage.tsx";
import MapEditingPage from "@/routes/MapEditingPage.tsx";
import StartPage from "@/routes/StartPage.tsx";
import { GraphStateProvider } from "@/context/nodeContext.tsx";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import ProtectedPage from "@/routes/ProtectedPage.tsx";
import { Header } from "@/components/blocks/header.tsx";
import { MapEditorTablePage } from "@/routes/map-editor/mapEditorTablePage.tsx";
import InsightRoute from "@/routes/InsightRoute.tsx";
import InstructionsPage from "./routes/InstructionsPage.tsx";
import DashBoard from "./routes/DashBoard.tsx";
// import { HeaderHome } from "@/components/blocks/headerHome.tsx";

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
          element: <AboutCreditsPages />,
        },
        {
          path: "/dashboard",
          errorElement: <h1>ERROR</h1>,
          element: <DashBoard />,
        },
        {
          path: "/insight",
          errorElement: <h1>ERROR</h1>,
          element: <ProtectedPage Page={InsightRoute} />,
        },
        {
          path: "/service-requests",
          errorElement: <h1>ERROR</h1>,
          element: <ProtectedPage Page={ServiceRequestPage} />,
        },
        {
          path: "/csv-table",
          element: <ProtectedPage Page={CSVTable} />,
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
        {
          path: "/map-editor/table",
          errorElement: <h1>ERROR</h1>,
          element: <MapEditorTablePage />,
        },
        {
          path: "/instructions",
          errorElement: <h1>ERROR</h1>,
          element: <InstructionsPage />,
        },
      ],
    },
  ]);

  return (
    <GraphStateProvider>
      <RouterProvider router={router} />
    </GraphStateProvider>
  );

  function Root() {
    const navigate = useNavigate();
    const showHeader = !location.pathname.startsWith("/directions");

    return (
      <Auth0Provider
        useRefreshTokens
        cacheLocation="localstorage"
        domain="dev-jlbrj4wjzo7qtfya.us.auth0.com"
        clientId="G05wEL2kMXB7UKNbgajmIiy9cGW9RKhx"
        onRedirectCallback={(appState) => {
          navigate(appState?.returnTo || window.location.pathname);
        }}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "/api",
          scope: "openid profile email offline_access",
        }}
      >
        {showHeader && <Header />}
        {/*{showHeader && <HeaderHome/>}*/}
        <div className="w-full flex flex-col">
          <Outlet />
        </div>
      </Auth0Provider>
    );
  }
}

export default App;
