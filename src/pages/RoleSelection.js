// src/pages/RoleSelection.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGameContext } from "../contexts/GameContext";
import Header from "../components/layout/Header";

const RoleSelection = () => {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { validateRoles, steps } = useGameContext();

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);

  useEffect(() => {
    // Find step details
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      setCurrentStep(step);
    } else {
      navigate("/board");
    }
  }, [stepId, steps, navigate]);

  const roles = [
    { id: "moniteur", name: "Moniteur d'Étude", color: "bg-purple-600" },
    { id: "equipe", name: "Équipe TOM", color: "bg-green-600" },
    { id: "operateur", name: "Opérateur", color: "bg-yellow-500" },
    { id: "referent", name: "Référent", color: "bg-blue-600" },
    { id: "cro", name: "CRO", color: "bg-red-600" },
  ];

  const toggleRole = (roleId) => {
    setSelectedRoles((prev) => {
      if (prev.includes(roleId)) {
        return prev.filter((id) => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedRoles.length === 0) return;

    // Validate selected roles against correct roles
    const isValid = validateRoles(stepId, selectedRoles);

    // Navigate to the appropriate page based on step type
    if (currentStep) {
      if (currentStep.type === "challenge") {
        navigate(`/challenge/${stepId}`);
      } else if (currentStep.type === "quest") {
        navigate(`/quest/${stepId}`);
      } else {
        navigate("/board");
      }
    } else {
      navigate("/board");
    }
  };

  if (!currentStep) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-900">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <Header title="Sélection des rôles" onBack={() => navigate("/board")} />

      <div className="flex-grow p-4 overflow-auto">
        <div className="bg-indigo-900 bg-opacity-70 rounded-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">
            Sélection des rôles
          </h2>
          <p className="text-indigo-200 mb-6">
            Pour l'étape{" "}
            <span className="font-bold text-white">
              {stepId}: {currentStep.title}
            </span>
            , identifiez quel(s) rôle(s) est/sont responsable(s) de cette
            action:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedRoles.includes(role.id)
                    ? `${role.color} bg-opacity-70 border-2 border-white`
                    : "bg-indigo-800 hover:bg-indigo-700 border-2 border-transparent"
                }`}
                onClick={() => toggleRole(role.id)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full ${role.color} flex items-center justify-center text-white font-bold`}
                  >
                    {role.name.charAt(0)}
                  </div>
                  <span className="text-white">{role.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              className="bg-indigo-800 hover:bg-indigo-700 text-white py-2 px-4 rounded"
              onClick={() => navigate("/board")}
            >
              Annuler
            </button>
            <button
              className={`bg-purple-700 hover:bg-purple-600 text-white py-2 px-6 rounded ${
                selectedRoles.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleSubmit}
              disabled={selectedRoles.length === 0}
            >
              Valider la sélection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
