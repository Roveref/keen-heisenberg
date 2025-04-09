// src/pages/Challenge.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGameContext } from "../contexts/GameContext";
import Header from "../components/layout/Header";
import DifficultyWheel from "../components/Challenge/DifficultyWheel";
import Timer from "../components/Challenge/Timer";
import GoldenToken from "../components/shared/GoldenToken";

const Challenge = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const {
    loadChallenge,
    completeStep,
    goldenTokens,
    useGoldenToken,
    timeRemaining,
    setTimeRemaining,
  } = useGameContext();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      const data = await loadChallenge(challengeId);
      if (data) {
        setChallenge(data);
      } else {
        navigate("/board");
      }
      setLoading(false);
    };

    fetchChallenge();
  }, [challengeId, loadChallenge, navigate]);

  useEffect(() => {
    if (difficultyLevel && challenge) {
      // Find question for this difficulty level
      const question = challenge.difficultyLevels.find(
        (q) => q.level === difficultyLevel
      );
      if (question) {
        setCurrentQuestion(question);
        // Set timer based on difficulty
        setTimeRemaining(
          question.timeLimit || (difficultyLevel === 3 ? 180 : 60)
        );
      }
    }
  }, [difficultyLevel, challenge, setTimeRemaining]);

  const handleDifficultySelected = (level) => {
    setDifficultyLevel(level);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;

    let correct = false;
    if (Array.isArray(currentQuestion.correctAnswer)) {
      correct = currentQuestion.correctAnswer.includes(selectedAnswer);
    } else {
      correct = selectedAnswer === currentQuestion.correctAnswer;
    }

    setIsCorrect(correct);
    setShowResult(true);

    // Apply impacts if wrong
    if (!correct && currentQuestion.impacts) {
      completeStep(challengeId, false, currentQuestion.impacts);
    } else {
      completeStep(challengeId, true);
    }
  };

  const handleTimeout = () => {
    setShowResult(true);
    setIsCorrect(false);

    // Apply default impact for timeout
    completeStep(challengeId, false, { traversalTime: 1 });
  };

  const handleGoldenTokenUse = (action) => {
    switch (action) {
      case "hint":
        // Implementation depends on how hints are stored
        useGoldenToken("hint", challengeId);
        break;
      case "reset-timer":
        // Reset timer to initial value
        if (currentQuestion) {
          const newTime =
            currentQuestion.timeLimit || (difficultyLevel === 3 ? 180 : 60);
          useGoldenToken("reset-timer");
          setTimeRemaining(newTime);
        }
        break;
      default:
        useGoldenToken(action);
    }
  };

  const continueToNextStep = () => {
    // Navigate back to the board to continue the game
    navigate("/board");
  };

  if (loading || !challenge) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-900">
        <div className="text-white text-xl">Chargement du défi...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header
        title={`Défi ${challengeId}: ${challenge.title}`}
        onBack={() => navigate("/board")}
        rightContent={
          currentQuestion && (
            <div className="flex space-x-3 items-center">
              <Timer
                duration={timeRemaining}
                onTimeEnd={handleTimeout}
                isPaused={showResult}
              />
              {difficultyLevel && (
                <div className="flex items-center space-x-2 bg-indigo-800 px-3 py-1 rounded">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="text-white">Niveau {difficultyLevel}</span>
                </div>
              )}
            </div>
          )
        }
      />

      <div className="flex-grow p-4 overflow-auto">
        {!difficultyLevel ? (
          <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              Tournez la roue pour déterminer la difficulté
            </h2>
            <DifficultyWheel onDifficultySelected={handleDifficultySelected} />
          </div>
        ) : currentQuestion ? (
          <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-6 mb-4">
            <h2 className="text-lg font-bold text-white mb-3">Question:</h2>
            <p className="text-indigo-100 mb-6">{currentQuestion.question}</p>

            {currentQuestion.type === "multiple-choice" && (
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-colors border-2 ${
                      selectedAnswer === option
                        ? "bg-indigo-700 border-purple-500"
                        : "bg-indigo-800 border-transparent hover:border-indigo-500"
                    }`}
                    onClick={() => !showResult && handleAnswerSelect(option)}
                  >
                    <p className="text-white">{option}</p>
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.type === "open-ended" && (
              <div className="mb-6">
                <textarea
                  className="w-full h-32 p-3 rounded-lg bg-indigo-800 text-white border-2 border-indigo-700 focus:border-purple-500 focus:outline-none"
                  placeholder="Votre réponse..."
                  value={selectedAnswer || ""}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  disabled={showResult}
                ></textarea>
              </div>
            )}

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
                    ? "Félicitations, vous avez répondu correctement à cette question."
                    : `La bonne réponse était: ${
                        Array.isArray(currentQuestion.correctAnswer)
                          ? currentQuestion.correctAnswer.join(", ")
                          : currentQuestion.correctAnswer
                      }`}
                </p>
                {!isCorrect && currentQuestion.impacts && (
                  <div className="mt-2 text-red-200">
                    <p className="font-bold">Impacts:</p>
                    <ul className="list-disc list-inside">
                      {currentQuestion.impacts.traversalTime > 0 && (
                        <li>
                          Temps de traversée: +
                          {currentQuestion.impacts.traversalTime}h
                        </li>
                      )}
                      {currentQuestion.impacts.etp > 0 && (
                        <li>ETP: +{currentQuestion.impacts.etp}</li>
                      )}
                      {currentQuestion.impacts.unnecessaryExchanges > 0 && (
                        <li>
                          Échanges inutiles: +
                          {currentQuestion.impacts.unnecessaryExchanges}h
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <GoldenToken
                  count={goldenTokens}
                  onUse={handleGoldenTokenUse}
                  actions={["hint", "reset-timer"]}
                />
                <button
                  className={`bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded ${
                    !selectedAnswer ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                >
                  Valider la réponse
                </button>
              </div>
            )}

            {showResult && (
              <div className="flex justify-end mt-4">
                <button
                  className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded"
                  onClick={continueToNextStep}
                >
                  Continuer
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-indigo-300 p-6">
            Une erreur s'est produite lors du chargement de la question.
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenge;
