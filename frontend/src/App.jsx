import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { FiActivity, FiGrid } from "react-icons/fi";

import SessionsList from "./components/SessionsList";
import SessionJourney from "./components/SessionJourney";
import Heatmap from "./components/Heatmap";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        
        {/* Header */}
        <header className="border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <h1 className="text-3xl font-bold">
              User Analytics Dashboard
            </h1>

            <p className="text-slate-400 mt-1">
              Session tracking, user journeys and click heatmaps
            </p>
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-b border-slate-800 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 py-3 flex gap-3">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 hover:bg-slate-700"
                }`
              }
            >
              <FiActivity />
              Sessions
            </NavLink>

            <NavLink
              to="/heatmap"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 hover:bg-slate-700"
                }`
              }
            >
              <FiGrid />
              Heatmap
            </NavLink>

          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-6">
          <Routes>
            <Route path="/" element={<SessionsList />} />
            <Route path="/session/:sessionId" element={<SessionJourney />} />
            <Route path="/heatmap" element={<Heatmap />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;