import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import AboutUsPage from "./routes/AboutUsPage";
import ServiceRequestPage from "./routes/ServiceRequestPage";
import HeroPage from "./routes/HeroPage";

function App() {
  return (
    <Router>
      <div className="w-full flex flex-col px-20 gap-5">
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/service-requests" element={<ServiceRequestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
