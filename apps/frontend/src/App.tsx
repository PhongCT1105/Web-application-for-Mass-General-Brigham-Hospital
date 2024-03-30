import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";

function App() {
  return (
    <Router>
      <div className="w-full flex flex-col px-20 gap-5">
        <h1>Welcome to your starter code.</h1>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/home-page" element={<HomePage />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

function Root() {
  return (
    <div>
      <h2>Root Component</h2>
      <HomePage />
    </div>
  );
}

export default App;
