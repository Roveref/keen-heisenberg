// src/pages/ImpactTable.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../contexts/GameContext";
import Header from "../components/layout/Header";
import GoldenToken from "../components/shared/GoldenToken";

const ImpactTable = () => {
  const navigate = useNavigate();
  const {
    impacts,
    completedSteps,
    steps,
    goldenTokens,
    useGoldenToken,
    score,
  } = useGameContext();

  // Generate step results for the table
  const stepResults = completedSteps
    .map((stepId) => {
      const step = steps.find((s) => s.id === stepId);
      if (!step) return null;

      return {
        id: stepId,
        title: step.title,
        type: step.type,
        status: step.success ? "OK" : "NOK",
        impacts: step.impacts || {},
      };
    })
    .filter(Boolean);

  const handleGoldenTokenUse = () => {
    useGoldenToken("remove-impact");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header
        title="Tableau d'impacts"
        onBack={() => navigate("/board")}
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
              <span className="text-white">Score: {score}</span>
            </div>
          </div>
        }
      />

      <div className="flex-grow p-4 overflow-auto">
        <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-5 mb-4 flex-grow overflow-auto">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-left text-indigo-100">
              <thead className="text-xs uppercase bg-indigo-800 text-indigo-300">
                <tr>
                  <th className="px-6 py-3">Étape</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Temps de traversée</th>
                  <th className="px-6 py-3">Échanges inutiles</th>
                  <th className="px-6 py-3">ETP</th>
                </tr>
              </thead>
              <tbody>
                {stepResults.map((result, index) => (
                  <tr
                    key={result.id}
                    className={`border-b border-indigo-800 ${
                      index % 2 === 1 ? "bg-indigo-800 bg-opacity-30" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium">
                      {result.id} - {result.title}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          result.status === "OK"
                            ? "bg-green-800 text-green-200"
                            : "bg-red-800 text-red-200"
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-indigo-300">
                      {result.impacts.traversalTime
                        ? `${result.impacts.traversalTime}h`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-indigo-300">
                      {result.impacts.unnecessaryExchanges
                        ? `${result.impacts.unnecessaryExchanges}h`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-indigo-300">
                      {result.impacts.etp ? result.impacts.etp : "-"}
                    </td>
                  </tr>
                ))}
                <tr className="bg-indigo-800 text-white font-medium">
                  <td className="px-6 py-4">TOTAL</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">{impacts.traversalTime}h</td>
                  <td className="px-6 py-4">{impacts.unnecessaryExchanges}h</td>
                  <td className="px-6 py-4">{impacts.etp}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between">
          <GoldenToken
            count={goldenTokens}
            onUse={handleGoldenTokenUse}
            actions={["remove-impact"]}
          />

          <button
            className="bg-indigo-800 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center space-x-2"
            onClick={() => navigate("/board")}
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
            <span>Retour au plateau</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImpactTable;
