// src/pages/Quest.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGameContext } from "../contexts/GameContext";
import Header from "../components/layout/Header";
import Timer from "../components/Challenge/Timer";
import QuestCard from "../components/Quest/QuestCard";
import GoldenToken from "../components/shared/GoldenToken";

const Quest = () => {
  const { questId } = useParams();
  const navigate = useNavigate();
  const { loadQuest, completeStep, goldenTokens, useGoldenToken } =
    useGameContext();

  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes default

  useEffect(() => {
    const fetchQuest = async () => {
      setLoading(true);
      const data = await loadQuest(questId);
      if (data) {
        setQuest(data);
        setTimer(data.timeLimit || 600);
      } else {
        navigate("/board");
      }
      setLoading(false);
    };

    fetchQuest();
  }, [questId, loadQuest, navigate]);

  const handleCardSelect = (cardId) => {
    if (showResult) return;

    setSelectedCards((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      } else {
        return [...prev, cardId];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedCards.length === 0 || !quest) return;

    // Check if all selected cards match the correct answers
    const correct =
      selectedCards.length === quest.correctAnswers.length &&
      selectedCards.every((card) => quest.correctAnswers.includes(card));

    setIsCorrect(correct);
    setShowResult(true);

    // Apply impacts if wrong
    if (!correct && quest.impacts) {
      completeStep(questId, false, quest.impacts);
    } else {
      completeStep(questId, true);
    }
  };

  const handleTimeout = () => {
    setShowResult(true);
    setIsCorrect(false);

    // Apply default impact for timeout
    completeStep(questId, false, { traversalTime: 2 });
  };

  const handleGoldenTokenUse = (action) => {
    switch (action) {
      case "hint":
        // Implementation depends on how hints are stored
        useGoldenToken("hint", questId);
        break;
      case "reset-timer":
        // Add 5 minutes to the timer
        useGoldenToken("reset-timer");
        setTimer((prev) => prev + 300);
        break;
      default:
        useGoldenToken(action);
    }
  };

  const continueToNextStep = () => {
    // Navigate back to the board to continue the game
    navigate("/board");
  };

  if (loading || !quest) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-900">
        <div className="text-white text-xl">Chargement de la quête...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header
        title={`Quête ${questId}: ${quest.title}`}
        onBack={() => navigate("/board")}
        rightContent={
          <div className="flex space-x-3 items-center">
            <Timer
              duration={timer}
              onTimeEnd={handleTimeout}
              isPaused={showResult}
            />
          </div>
        }
      />

      <div className="flex-grow p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-5">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-indigo-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Consigne
            </h2>
            <div className="bg-indigo-800 bg-opacity-50 p-3 rounded-lg text-indigo-100">
              <p>{quest.instructions}</p>
            </div>
          </div>

          {quest.tips && quest.tips.length > 0 && (
            <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-5">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Astuce
              </h2>
              <div className="bg-yellow-900 bg-opacity-20 p-3 rounded-lg text-yellow-200 border border-yellow-700">
                <p>{quest.tips[0]}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-5 mb-4">
          <h2 className="text-lg font-bold text-white mb-3">
            Cartes à analyser
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quest.cards.map((card) => (
              <QuestCard
                key={card.id}
                card={card}
                isSelected={selectedCards.includes(card.id)}
                onSelect={handleCardSelect}
              />
            ))}
          </div>
        </div>

        {showResult ? (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isCorrect
                ? "bg-green-900 bg-opacity-50 border border-green-600"
                : "bg-red-900 bg-opacity-50 border border-red-600"
            }`}
          >
            <h3 className="font-bold text-lg mb-2">
              {isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}
            </h3>
            <p>
              {isCorrect
                ? "Félicitations, vous avez correctement identifié les cartes conformes."
                : `Les cartes conformes sont : ${quest.correctAnswers
                    .map((id) => `Carte ${id}`)
                    .join(", ")}`}
            </p>
            {!isCorrect && quest.impacts && (
              <div className="mt-2 text-red-200">
                <p className="font-bold">Impacts:</p>
                <ul className="list-disc list-inside">
                  {quest.impacts.traversalTime > 0 && (
                    <li>Temps de traversée: +{quest.impacts.traversalTime}h</li>
                  )}
                  {quest.impacts.etp > 0 && <li>ETP: +{quest.impacts.etp}</li>}
                  {quest.impacts.unnecessaryExchanges > 0 && (
                    <li>
                      Échanges inutiles: +{quest.impacts.unnecessaryExchanges}h
                    </li>
                  )}
                </ul>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded"
                onClick={continueToNextStep}
              >
                Continuer
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-5 mb-4">
            <h2 className="text-lg font-bold text-white mb-3">Votre réponse</h2>
            <p className="text-indigo-200 mb-3">
              Sélectionnez les cartes qui représentent des demandes conformes:
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {quest.cards.map((card) => (
                <div
                  key={card.id}
                  className={`py-1 px-3 rounded-lg cursor-pointer transition-colors border border-indigo-600 flex items-center ${
                    selectedCards.includes(card.id)
                      ? "bg-purple-700 hover:bg-purple-600"
                      : "bg-indigo-800 hover:bg-indigo-700"
                  }`}
                  onClick={() => handleCardSelect(card.id)}
                >
                  <div className="w-5 h-5 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-white text-xs mr-2">
                    {card.id}
                  </div>
                  <span className="text-white">Carte {card.id}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <GoldenToken
                count={goldenTokens}
                onUse={handleGoldenTokenUse}
                actions={["hint", "reset-timer"]}
              />
              <button
                className={`bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded ${
                  selectedCards.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleSubmit}
                disabled={selectedCards.length === 0}
              >
                Valider la réponse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quest;
