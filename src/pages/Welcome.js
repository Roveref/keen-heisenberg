// src/pages/Welcome.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../contexts/GameContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { currentSession, loadGame } = useGameContext();
  const [showLoadOptions, setShowLoadOptions] = useState(false);

  const handleStartNew = () => {
    navigate("/scenarios");
  };

  const handleContinue = () => {
    const success = loadGame();
    if (success) {
      navigate("/board");
    } else {
      setShowLoadOptions(false);
    }
  };

  const handleManageSessions = () => {
    // Placeholder for admin functionality
    console.log("Manage sessions clicked");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-900">
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="w-24 h-24 mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="#4C1D95"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
            <path d="M30,35 L70,35 L70,65 L30,65 Z" fill="#8B5CF6" />
            <circle cx="50" cy="50" r="15" fill="#EDE9FE" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">PredQuest</h1>
        <p className="text-xl text-indigo-200 mb-8 max-w-2xl">
          Bienvenue dans PredQuest, un Serious Game collaboratif conçu pour
          renforcer la compréhension et la maîtrise du processus Matières
          Premières de la plateforme PredTest.
        </p>

        <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4 mb-8 w-full max-w-md">
          <p className="text-indigo-200 mb-2">Session active:</p>
          <p className="text-white font-mono">
            {currentSession?.id || "Aucune session active"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          <button
            className="bg-indigo-700 hover:bg-indigo-600 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-colors"
            onClick={handleStartNew}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Démarrer une partie</span>
          </button>

          <button
            className="bg-indigo-900 hover:bg-indigo-800 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 transition-colors"
            onClick={() => setShowLoadOptions(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>Charger une partie</span>
          </button>
        </div>

        <button
          className="mt-6 bg-indigo-900 hover:bg-indigo-800 text-indigo-300 hover:text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          onClick={handleManageSessions}
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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Gérer les sessions</span>
        </button>

        {showLoadOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-indigo-900 rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-white mb-4">
                Charger une partie
              </h2>

              <div className="mb-6">
                <button
                  className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  onClick={handleContinue}
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Continuer la dernière partie</span>
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-indigo-800 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                  onClick={() => setShowLoadOptions(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-indigo-300 mt-10 text-sm max-w-xl">
          Ce serious game est conçu pour tester et améliorer vos connaissances
          du processus PredTest dans un contexte proche des missions réelles
          chez BearingPoint.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
