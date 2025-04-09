// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import Welcome from "./pages/Welcome";
import ScenarioSelection from "./pages/ScenarioSelection";
import GameBoard from "./pages/GameBoard";
import Challenge from "./pages/Challenge";
import Quest from "./pages/Quest";
import RoleSelection from "./pages/RoleSelection";
import ImpactTable from "./pages/ImpactTable";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/scenarios" element={<ScenarioSelection />} />
          <Route path="/game/:scenarioId" element={<GameBoard />} />
          <Route path="/challenge/:challengeId" element={<Challenge />} />
          <Route path="/quest/:questId" element={<Quest />} />
          <Route path="/role-selection/:stepId" element={<RoleSelection />} />
          <Route path="/impact-table" element={<ImpactTable />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
