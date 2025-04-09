// src/components/Challenge/DifficultyWheel.js
import React, { useState, useEffect } from "react";

const DifficultyWheel = ({ onDifficultySelected }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Random number of rotations between 3 and 5
    const rotations = 3 + Math.random() * 2;

    // Random additional angle to determine the final position
    const finalAngle = Math.floor(Math.random() * 360);

    // Calculate total rotation
    const totalRotation = rotation + rotations * 360 + finalAngle;

    // Animate the wheel
    let start = null;
    const duration = 3000; // 3 seconds

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      // Ease out function for a natural slowdown
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      // Calculate current rotation
      const currentRotation = rotation + (totalRotation - rotation) * easeOut;
      setRotation(currentRotation);

      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation is complete
        setIsSpinning(false);

        // Determine difficulty based on final position
        const normalizedAngle = currentRotation % 360;
        let difficulty;

        if (normalizedAngle < 120) {
          difficulty = 1;
        } else if (normalizedAngle < 240) {
          difficulty = 2;
        } else {
          difficulty = 3;
        }

        setSelectedDifficulty(difficulty);
        onDifficultySelected(difficulty);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Auto-spin when component mounts
    setTimeout(() => {
      spinWheel();
    }, 500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-64 h-64">
        {/* Wheel background */}
        <svg
          className="w-full h-full"
          viewBox="0 0 200 200"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "none" : "transform 0.5s ease",
          }}
        >
          {/* Level 1 Section */}
          <path
            d="M100,100 L100,0 A100,100 0 0,1 186.6,50 z"
            fill="#4F46E5"
            stroke="#6366F1"
            strokeWidth="1"
          />
          <text
            x="130"
            y="40"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            transform="rotate(30, 100, 100)"
          >
            Niveau 1
          </text>

          {/* Level 2 Section */}
          <path
            d="M100,100 L186.6,50 A100,100 0 0,1 186.6,150 z"
            fill="#7C3AED"
            stroke="#8B5CF6"
            strokeWidth="1"
          />
          <text
            x="160"
            y="100"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            transform="rotate(90, 100, 100)"
          >
            Niveau 2
          </text>

          {/* Level 3 Section */}
          <path
            d="M100,100 L186.6,150 A100,100 0 0,1 100,200 z"
            fill="#C026D3"
            stroke="#D946EF"
            strokeWidth="1"
          />
          <text
            x="130"
            y="160"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            transform="rotate(150, 100, 100)"
          >
            Niveau 3
          </text>

          {/* Level 3 Section (continued) */}
          <path
            d="M100,100 L100,200 A100,100 0 0,1 13.4,150 z"
            fill="#C026D3"
            stroke="#D946EF"
            strokeWidth="1"
          />

          {/* Level 2 Section (continued) */}
          <path
            d="M100,100 L13.4,150 A100,100 0 0,1 13.4,50 z"
            fill="#7C3AED"
            stroke="#8B5CF6"
            strokeWidth="1"
          />

          {/* Level 1 Section (continued) */}
          <path
            d="M100,100 L13.4,50 A100,100 0 0,1 100,0 z"
            fill="#4F46E5"
            stroke="#6366F1"
            strokeWidth="1"
          />

          {/* Center circle */}
          <circle
            cx="100"
            cy="100"
            r="15"
            fill="#1E1B4B"
            stroke="white"
            strokeWidth="2"
          />
        </svg>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M10,0 L20,10 L0,10 z" fill="white" />
          </svg>
        </div>
      </div>

      <p className="text-lg mt-4 text-indigo-100">
        {isSpinning
          ? "La roue tourne..."
          : selectedDifficulty
          ? `Niveau ${selectedDifficulty} sélectionné!`
          : "Prêt à tourner"}
      </p>

      {!isSpinning && selectedDifficulty === null && (
        <button
          className="mt-4 bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
          onClick={spinWheel}
        >
          Tourner la roue
        </button>
      )}
    </div>
  );
};

export default DifficultyWheel;
