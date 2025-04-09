// src/components/shared/GoldenToken.js
import React, { useState } from "react";

const GoldenToken = ({
  count,
  onUse,
  actions = ["hint", "reset-timer", "remove-impact"],
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleTokenClick = () => {
    if (count <= 0) return;
    setShowActions(!showActions);
  };

  const handleActionClick = (action) => {
    onUse(action);
    setShowActions(false);
  };

  const getActionLabel = (action) => {
    switch (action) {
      case "hint":
        return "Obtenir un indice";
      case "reset-timer":
        return "Ajouter du temps";
      case "remove-impact":
        return "Supprimer un impact";
      default:
        return action;
    }
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
          count > 0
            ? "bg-yellow-600 hover:bg-yellow-500"
            : "bg-gray-700 cursor-not-allowed"
        } text-white transition-colors`}
        onClick={handleTokenClick}
        disabled={count <= 0}
      >
        <span className="text-xl">🪙</span>
        <span>{count}</span>
      </button>

      {showActions && count > 0 && (
        <div className="absolute mt-2 left-0 w-48 bg-indigo-800 rounded-lg shadow-lg overflow-hidden z-10">
          {actions.map((action) => (
            <button
              key={action}
              className="w-full text-left px-4 py-2 text-white hover:bg-indigo-700 transition-colors"
              onClick={() => handleActionClick(action)}
            >
              {getActionLabel(action)}
            </button>
          ))}
          <button
            className="w-full text-left px-4 py-2 text-indigo-300 hover:bg-indigo-700 transition-colors border-t border-indigo-700"
            onClick={() => setShowActions(false)}
          >
            Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default GoldenToken;
