// src/components/Quest/QuestCard.js
import React from "react";

const QuestCard = ({ card, isSelected, onSelect }) => {
  return (
    <div
      className={`bg-indigo-800 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-2 border-purple-500 shadow-lg shadow-purple-900/30"
          : "border-2 border-transparent hover:border-indigo-500"
      }`}
      onClick={() => onSelect(card.id)}
    >
      <div className="flex justify-between mb-2">
        <span className="font-bold text-white">
          {card.title || `Carte ${card.id}`}
        </span>
        <div className="w-6 h-6 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-white">
          {card.id}
        </div>
      </div>
      <div className="text-indigo-200 text-sm">
        {card.content}
        {card.items && (
          <>
            <p className="mt-2 font-semibold">
              {card.itemsTitle || "Éléments"}:
            </p>
            <ul className="list-disc list-inside mt-1">
              {card.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestCard;
