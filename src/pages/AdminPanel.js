// src/pages/AdminPanel.js
import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

// Placeholder component for the admin panel
// In a full implementation, this would have multiple views for scenario, quest, and challenge management
const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white">
      <header className="bg-indigo-900 bg-opacity-80 p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <button
            className="bg-indigo-700 hover:bg-indigo-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            onClick={() => navigate("/")}
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
            <span>Retour à l'accueil</span>
          </button>
          <h1 className="text-xl font-bold text-white">
            Panneau d'administration
          </h1>
        </div>
      </header>

      <div className="flex-grow p-6 overflow-auto">
        <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Gérer les sessions
          </h2>
          <p className="text-indigo-200 mb-6">
            Cette fonctionnalité vous permet de gérer les sessions de jeu en
            cours et passées.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">Sessions actives</h3>
                <span className="bg-green-600 px-2 py-1 rounded-full text-xs text-white">
                  2
                </span>
              </div>
              <p className="text-indigo-200 text-sm">
                Sessions actuellement en cours de jeu.
              </p>
              <button className="mt-3 bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-sm text-white">
                Voir les détails
              </button>
            </div>

            <div className="bg-indigo-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">Sessions terminées</h3>
                <span className="bg-indigo-600 px-2 py-1 rounded-full text-xs text-white">
                  15
                </span>
              </div>
              <p className="text-indigo-200 text-sm">
                Sessions complétées au cours des 30 derniers jours.
              </p>
              <button className="mt-3 bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-sm text-white">
                Afficher l'historique
              </button>
            </div>

            <div className="bg-indigo-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">Créer une session</h3>
              </div>
              <p className="text-indigo-200 text-sm">
                Démarrer une nouvelle session de jeu collective.
              </p>
              <button className="mt-3 bg-purple-700 hover:bg-purple-600 px-3 py-1 rounded text-sm text-white">
                Nouvelle session
              </button>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Gérer le contenu du jeu
          </h2>
          <p className="text-indigo-200 mb-6">
            Cette fonctionnalité vous permet de gérer les scénarios, défis, et
            quêtes du jeu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">Scénarios</h3>
                <span className="bg-indigo-600 px-2 py-1 rounded-full text-xs text-white">
                  2
                </span>
              </div>
              <p className="text-indigo-200 text-sm">
                Gérer les scénarios existants ou en créer de nouveaux.
              </p>
              <button className="mt-3 bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-sm text-white">
                Gérer les scénarios
              </button>
            </div>

            <div className="bg-indigo-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">Défis</h3>
                <span className="bg-indigo-600 px-2 py-1 rounded-full text-xs text-white">
                  26
                </span>
              </div>
              <p className="text-indigo-200 text-sm">
                Gérer les défis existants ou en créer de nouveaux.
              </p>
              <button className="mt-3 bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-sm text-white">
                Gérer les défis
              </button>
            </div>

            <div className="bg-indigo-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">Quêtes</h3>
                <span className="bg-indigo-600 px-2 py-1 rounded-full text-xs text-white">
                  6
                </span>
              </div>
              <p className="text-indigo-200 text-sm">
                Gérer les quêtes existantes ou en créer de nouvelles.
              </p>
              <button className="mt-3 bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-sm text-white">
                Gérer les quêtes
              </button>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900 bg-opacity-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Statistiques et analyses
          </h2>
          <p className="text-indigo-200 mb-6">
            Visualisez les statistiques des sessions de jeu et les performances
            des joueurs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-800 p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">
                Statistiques globales
              </h3>
              <p className="text-indigo-200 text-sm mb-3">
                Vue d'ensemble des performances de tous les joueurs.
              </p>
              <div className="flex justify-between text-sm text-indigo-200">
                <div>
                  <p>Sessions terminées:</p>
                  <p>Temps moyen par session:</p>
                  <p>Score moyen:</p>
                </div>
                <div className="text-right">
                  <p className="text-white">153</p>
                  <p className="text-white">47 min</p>
                  <p className="text-white">680</p>
                </div>
              </div>
              <button className="mt-3 bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-sm text-white">
                Voir toutes les statistiques
              </button>
            </div>

            <div className="bg-indigo-800 p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">Analyse des défis</h3>
              <p className="text-indigo-200 text-sm mb-3">
                Analyse de la difficulté et du taux de réussite des défis.
              </p>
              <div className="flex justify-between text-sm text-indigo-200">
                <div>
                  <p>Défis les plus difficiles:</p>
                  <p>Taux de réussite moyen:</p>
                  <p>Défis les plus faciles:</p>
                </div>
                <div className="text-right">
                  <p className="text-white">B, F, O</p>
                  <p className="text-white">68%</p>
                  <p className="text-white">A, C, K</p>
                </div>
              </div>
              <button className="mt-3 bg-indigo-700 hover:bg-indigo-600 px-3 py-1 rounded text-sm text-white">
                Voir l'analyse complète
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-indigo-900 bg-opacity-80 p-3 shadow-lg">
        <div className="flex justify-between items-center text-sm text-indigo-300">
          <div>PredQuest Admin © 2025 - BearingPoint</div>
        </div>
      </footer>

      <Routes>
        <Route
          path="/sessions"
          element={<div>Sessions management would go here</div>}
        />
        <Route
          path="/content"
          element={<div>Content management would go here</div>}
        />
        <Route path="/stats" element={<div>Statistics would go here</div>} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
