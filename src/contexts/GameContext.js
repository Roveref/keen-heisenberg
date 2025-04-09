// src/contexts/GameContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchScenario, fetchChallenge, fetchQuest } from "../api/gameApi";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [showRoles, setShowRoles] = useState(false);
  const [impacts, setImpacts] = useState({
    traversalTime: 0,
    etp: 0,
    unnecessaryExchanges: 0,
  });
  const [goldenTokens, setGoldenTokens] = useState(1);
  const [steps, setSteps] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Load session from localStorage on init
  useEffect(() => {
    const savedSession = localStorage.getItem("predquest_session");
    if (savedSession) {
      setCurrentSession(JSON.parse(savedSession));
    } else {
      // Create a new session ID
      setCurrentSession({
        id: `session_${Date.now()}`,
        startedAt: new Date(),
      });
    }
  }, []);

  // Save session to localStorage when it changes
  useEffect(() => {
    if (currentSession) {
      localStorage.setItem("predquest_session", JSON.stringify(currentSession));
    }
  }, [currentSession]);

  const startScenario = async (scenarioId) => {
    try {
      const scenario = await fetchScenario(scenarioId);
      setCurrentScenario(scenario);
      setSteps(scenario.steps);
      setCurrentStep(scenario.initialStep);
      setCompletedSteps([]);
      setImpacts({
        traversalTime: 0,
        etp: 0,
        unnecessaryExchanges: 0,
      });
      setScore(0);
      setGoldenTokens(1);

      // Update session
      setCurrentSession({
        ...currentSession,
        scenarioId,
        startedAt: new Date(),
      });

      return scenario;
    } catch (error) {
      console.error("Failed to start scenario:", error);
      return null;
    }
  };

  const loadChallenge = async (challengeId) => {
    try {
      return await fetchChallenge(challengeId);
    } catch (error) {
      console.error("Failed to load challenge:", error);
      return null;
    }
  };

  const loadQuest = async (questId) => {
    try {
      return await fetchQuest(questId);
    } catch (error) {
      console.error("Failed to load quest:", error);
      return null;
    }
  };

  const validateRoles = (stepId, selectedRoles) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return false;

    // Simple matching (can be more complex based on game rules)
    const correctRoles = step.correctRoles || [];
    const isCorrect =
      selectedRoles.length === correctRoles.length &&
      selectedRoles.every((role) => correctRoles.includes(role));

    if (!isCorrect) {
      // Add impact for incorrect role selection
      addImpact({ unnecessaryExchanges: 1 });
    }

    return isCorrect;
  };

  const completeStep = (stepId, success = true, additionalImpacts = {}) => {
    // Mark step as completed
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }

    // Add impacts if not successful
    if (!success) {
      addImpact(additionalImpacts);
    } else {
      // Check for consecutive successes to award token
      const consecutiveSuccesses = completedSteps
        .slice(-2)
        .every((step) => steps.find((s) => s.id === step)?.success);

      if (consecutiveSuccesses) {
        setGoldenTokens(goldenTokens + 1);
      }

      // Update score
      setScore(score + 100);
    }

    // Find next step based on scenario configuration
    const currentStepObj = steps.find((s) => s.id === stepId);
    if (
      currentStepObj &&
      currentStepObj.nextSteps &&
      currentStepObj.nextSteps.length > 0
    ) {
      // For simplicity, just take the first next step
      // In a real implementation, this could be based on conditions
      setCurrentStep(currentStepObj.nextSteps[0]);
    }
  };

  const addImpact = (newImpacts) => {
    setImpacts({
      traversalTime: impacts.traversalTime + (newImpacts.traversalTime || 0),
      etp: impacts.etp + (newImpacts.etp || 0),
      unnecessaryExchanges:
        impacts.unnecessaryExchanges + (newImpacts.unnecessaryExchanges || 0),
    });
  };

  const useGoldenToken = (action, stepId) => {
    if (goldenTokens <= 0) return false;

    switch (action) {
      case "hint":
        // Logic to provide hint for current step
        setGoldenTokens(goldenTokens - 1);
        return true;
      case "reset-timer":
        // Logic to reset timer
        setGoldenTokens(goldenTokens - 1);
        return true;
      case "remove-impact":
        // Logic to remove the last impact
        // For simplicity, just reduce one traversal time hour
        if (impacts.traversalTime > 0) {
          setImpacts({
            ...impacts,
            traversalTime: impacts.traversalTime - 1,
          });
          setGoldenTokens(goldenTokens - 1);
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  const saveGame = () => {
    // Save current game state
    const gameState = {
      session: currentSession,
      scenario: currentScenario,
      currentStep,
      completedSteps,
      impacts,
      score,
      goldenTokens,
      savedAt: new Date(),
    };

    localStorage.setItem("predquest_saved_game", JSON.stringify(gameState));
    return true;
  };

  const loadGame = () => {
    const savedGame = localStorage.getItem("predquest_saved_game");
    if (!savedGame) return false;

    const gameState = JSON.parse(savedGame);
    setCurrentSession(gameState.session);
    setCurrentScenario(gameState.scenario);
    setCurrentStep(gameState.currentStep);
    setCompletedSteps(gameState.completedSteps);
    setImpacts(gameState.impacts);
    setScore(gameState.score);
    setGoldenTokens(gameState.goldenTokens);

    return true;
  };

  const value = {
    currentSession,
    currentScenario,
    currentStep,
    showRoles,
    impacts,
    goldenTokens,
    steps,
    completedSteps,
    score,
    timeRemaining,
    setShowRoles,
    setTimeRemaining,
    startScenario,
    loadChallenge,
    loadQuest,
    validateRoles,
    completeStep,
    addImpact,
    useGoldenToken,
    saveGame,
    loadGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
