// src/components/layout/Header.js
import React from "react";

const Header = ({ title, onBack, rightContent }) => {
  return (
    <header className="bg-indigo-900 bg-opacity-80 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              className="bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded-lg flex items-center space-x-2 transition-colors"
              onClick={onBack}
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
              <span>Retour</span>
            </button>
          )}
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>

        {rightContent}
      </div>
    </header>
  );
};

export default Header;
