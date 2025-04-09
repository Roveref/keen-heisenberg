// src/pages/ScenarioSelection.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchScenarios } from "../api/gameApi";

const ScenarioSelection = () => {
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScenarios = async () => {
      try {
        const data = await fetchScenarios();
        setScenarios(data);
      } catch (error) {
        console.error("Failed to load scenarios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadScenarios();
  }, []);

  const handleSelectScenario = (scenarioId) => {
    navigate(`/game/${scenarioId}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-900">
        <div className="text-white text-xl">Chargement des scénarios...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-900">
      <header className="bg-indigo-900 bg-opacity-80 p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <button
            className="bg-indigo-700 hover:bg-indigo-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            onClick={() => navigate("/")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Retour à l'accueil</span>
          </button>
        </div>
      </header>

      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Choisissez un scénario
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-indigo-800 bg-opacity-50 rounded-lg p-6 cursor-pointer hover:bg-opacity-70 transition-all border-2 border-transparent hover:border-indigo-500"
              onClick={() => handleSelectScenario(scenario.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">
                  {scenario.name}
                </h2>
                <span
                  className={`${
                    scenario.difficulty === "beginner"
                      ? "bg-green-600"
                      : scenario.difficulty === "intermediate"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  } text-white text-xs px-2 py-1 rounded`}
                >
                  {scenario.difficulty === "beginner"
                    ? "Débutant"
                    : scenario.difficulty === "intermediate"
                    ? "Intermédiaire"
                    : "Avancé"}
                </span>
              </div>
              <p className="text-indigo-200 mb-4">{scenario.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-indigo-300">
                  Durée estimée: {scenario.estimatedDuration} min
                </span>
                <span className="text-indigo-300">
                  Difficulté:{" "}
                  {scenario.difficulty === "beginner"
                    ? "Débutant"
                    : scenario.difficulty === "intermediate"
                    ? "Intermédiaire"
                    : "Avancé"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-indigo-900 bg-opacity-80 p-3 shadow-lg">
        <div className="flex justify-between items-center text-sm text-indigo-300">
          <div>PredQuest © 2025 - BearingPoint</div>
        </div>
      </footer>
    </div>
  );
};

export default ScenarioSelection;
