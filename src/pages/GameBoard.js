// src/pages/GameBoard.js
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGameContext } from "../contexts/GameContext";
import GameBoardSVG from "../components/GameBoard/GameBoardSVG";
import Header from "../components/layout/Header";
import GoldenToken from "../components/shared/GoldenToken";

const GameBoard = () => {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const {
    currentScenario,
    startScenario,
    showRoles,
    setShowRoles,
    goldenTokens,
    useGoldenToken,
    saveGame,
    score,
  } = useGameContext();

  useEffect(() => {
    const loadScenario = async () => {
      // Only load if current scenario doesn't match the URL param
      if (!currentScenario || currentScenario.id !== scenarioId) {
        const scenario = await startScenario(scenarioId);
        if (!scenario) {
          navigate("/scenarios");
        }
      }
    };

    loadScenario();
  }, [scenarioId, currentScenario, startScenario, navigate]);

  const handleGoldenTokenUse = (action) => {
    useGoldenToken(action);
  };

  if (!currentScenario) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-900">
        <div className="text-white text-xl">Chargement du scénario...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header
        title={`Scénario: ${currentScenario.name}`}
        onBack={() => navigate("/scenarios")}
        rightContent={
          <div className="flex space-x-3 items-center">
            <div className="flex items-center space-x-2 bg-indigo-800 px-3 py-1 rounded">
              <svg
                className="w-5 h-5 text-indigo-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>Score: {score}</span>
            </div>
            <GoldenToken
              count={goldenTokens}
              onUse={handleGoldenTokenUse}
              actions={["hint", "remove-impact"]}
            />
          </div>
        }
      />

      <div className="flex space-x-3 mb-4 px-4">
        <button
          className="bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-white flex items-center space-x-1"
          onClick={() => navigate("/impact-table")}
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span>Tableau d'impacts</span>
        </button>
        <button
          className={`px-3 py-1 rounded text-white flex items-center space-x-1 ${
            showRoles
              ? "bg-purple-700 hover:bg-purple-600"
              : "bg-indigo-700 hover:bg-indigo-600"
          }`}
          onClick={() => setShowRoles(!showRoles)}
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>{showRoles ? "Masquer rôles" : "Afficher rôles"}</span>
        </button>
        <button className="bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-white flex items-center space-x-1">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Détails du scénario</span>
        </button>
        <button
          className="bg-green-700 hover:bg-green-600 px-3 py-1 rounded text-white flex items-center space-x-1 ml-auto"
          onClick={saveGame}
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
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          <span>Sauvegarder</span>
        </button>
      </div>

      <div className="flex-grow bg-indigo-900 bg-opacity-50 rounded-lg mx-4 p-4 overflow-auto">
        <GameBoardSVG />
      </div>

      <div className="mt-4 flex justify-between px-4 pb-4">
        <div className="flex space-x-2">
          <div className="flex items-center space-x-1 bg-indigo-800 px-2 py-1 rounded text-sm">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <span className="text-white">Moniteur d'Étude</span>
          </div>
          <div className="flex items-center space-x-1 bg-indigo-800 px-2 py-1 rounded text-sm">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-white">Équipe TOM</span>
          </div>
          <div className="flex items-center space-x-1 bg-indigo-800 px-2 py-1 rounded text-sm">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-white">Opérateur</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
