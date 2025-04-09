// src/components/GameBoard/GameBoardSVG.js
import React from "react";
import BoardNode from "./BoardNode";
import { useGameContext } from "../../contexts/GameContext";

const GameBoardSVG = () => {
  const { currentScenario, currentStep, steps, completedSteps } =
    useGameContext();

  if (!currentScenario || !steps || steps.length === 0) {
    return (
      <div className="text-center text-indigo-300 p-6">No scenario loaded</div>
    );
  }

  // Determine which steps are available
  const isStepAvailable = (stepId) => {
    // Start and end are always available
    if (["start", "end"].includes(stepId)) return true;

    // If it's the current step, it's available
    if (stepId === currentStep) return true;

    // If it's already completed, it's not available
    if (completedSteps.includes(stepId)) return false;

    // Check if any of its prerequisites are in the completed steps
    const step = steps.find((s) => s.id === stepId);
    if (!step) return false;

    // A step is available if all of its prerequisites are completed
    const prerequisites = steps
      .filter((s) => s.nextSteps && s.nextSteps.includes(stepId))
      .map((s) => s.id);

    if (prerequisites.length === 0) return false;

    return prerequisites.every((prereq) => completedSteps.includes(prereq));
  };

  // Generate path data for connecting nodes
  const generatePaths = () => {
    return steps
      .filter((step) => step.nextSteps && step.nextSteps.length > 0)
      .flatMap((step) => {
        return step.nextSteps
          .map((nextId) => {
            const nextStep = steps.find((s) => s.id === nextId);
            if (!nextStep) return null;

            const start = step.position;
            const end = nextStep.position;

            // Simple straight line for now
            return {
              id: `${step.id}-${nextId}`,
              path: `M${start.x},${start.y} L${end.x},${end.y}`,
              isActive:
                completedSteps.includes(step.id) || currentStep === step.id,
            };
          })
          .filter(Boolean);
      });
  };

  const paths = generatePaths();

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 600"
      className="text-indigo-300"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Draw connection paths */}
      {paths.map((path) => (
        <path
          key={path.id}
          d={path.path}
          stroke="currentColor"
          strokeWidth={path.isActive ? 3 : 1}
          strokeOpacity={path.isActive ? 1 : 0.5}
          fill="none"
        />
      ))}

      {/* Draw nodes */}
      {steps.map((node) => (
        <BoardNode
          key={node.id}
          node={node}
          position={node.position}
          isCurrentStep={currentStep === node.id}
          isCompleted={completedSteps.includes(node.id)}
          isAvailable={isStepAvailable(node.id)}
        />
      ))}
    </svg>
  );
};

export default GameBoardSVG;
