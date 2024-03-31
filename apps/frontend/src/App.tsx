import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

function Root() {
  return (
    <div className="w-full flex flex-col px-20 gap-5">
      <LoginPage />
      <Outlet />
    </div>
  );
}

export default App;
