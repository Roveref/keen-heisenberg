// src/api/gameApi.js

// Mock data for development
const mockScenarios = [
  {
    id: "test-interne",
    name: "Test Interne",
    description:
      "Une nouvelle demande Support Data Gap est arrivée ! Un extrait de navet violet doit être testé rapidement par l'équipe PredTest pour s'assurer de la conformité de la demande.",
    difficulty: "beginner",
    estimatedDuration: 45,
    initialStep: "start",
    steps: [
      {
        id: "start",
        type: "start",
        title: "Départ",
        position: { x: 500, y: 100 },
        nextSteps: ["A"],
      },
      {
        id: "A",
        type: "challenge",
        title: "Saisie de la demande",
        correctRoles: ["moniteur"],
        position: { x: 500, y: 240 },
        nextSteps: ["B"],
      },
      {
        id: "B",
        type: "challenge",
        title: "Planification des tests",
        correctRoles: ["moniteur", "operateur"],
        position: { x: 500, y: 390 },
        nextSteps: ["C", "1"],
      },
      {
        id: "C",
        type: "challenge",
        title: "Réception échantillons",
        correctRoles: ["operateur"],
        position: { x: 300, y: 500 },
        nextSteps: ["D"],
      },
      {
        id: "D",
        type: "challenge",
        title: "Réalisation des tests",
        correctRoles: ["operateur"],
        position: { x: 300, y: 630 },
        nextSteps: ["E"],
      },
      {
        id: "E",
        type: "challenge",
        title: "Génération du rapport",
        correctRoles: ["operateur"],
        position: { x: 500, y: 630 },
        nextSteps: ["F"],
      },
      {
        id: "F",
        type: "challenge",
        title: "Réception rapport & synthèse",
        correctRoles: ["moniteur"],
        position: { x: 700, y: 630 },
        nextSteps: ["end"],
      },
      {
        id: "1",
        type: "quest",
        title: "Le grand tri",
        correctRoles: ["equipe", "referent"],
        position: { x: 700, y: 500 },
        nextSteps: ["F"],
      },
      {
        id: "end",
        type: "end",
        title: "Fin",
        position: { x: 500, y: 770 },
        nextSteps: [],
      },
    ],
  },
  {
    id: "test-externe",
    name: "Test Externe",
    description:
      "Une demande Best Hit arrive au sein de PredTest pour la MP longevity booster. Votre objectif est de coordonner les différentes étapes du processus tout en respectant les procédures.",
    difficulty: "intermediate",
    estimatedDuration: 60,
    initialStep: "start",
    steps: [
      {
        id: "start",
        type: "start",
        title: "Départ",
        position: { x: 500, y: 100 },
        nextSteps: ["A"],
      },
      {
        id: "A",
        type: "challenge",
        title: "Saisie de la demande",
        correctRoles: ["moniteur"],
        position: { x: 500, y: 240 },
        nextSteps: ["P"],
      },
      {
        id: "P",
        type: "challenge",
        title: "Demande devis au CRO",
        correctRoles: ["moniteur"],
        position: { x: 500, y: 390 },
        nextSteps: ["5", "Q"],
      },
      {
        id: "5",
        type: "quest",
        title: "L'opération devis",
        correctRoles: ["moniteur", "equipe"],
        position: { x: 300, y: 500 },
        nextSteps: ["Q"],
      },
      {
        id: "Q",
        type: "challenge",
        title: "Transfert du devis à la logistique",
        correctRoles: ["moniteur", "equipe"],
        position: { x: 500, y: 500 },
        nextSteps: ["R"],
      },
      // Add more steps as needed
    ],
  },
];

const mockChallenges = {
  A: {
    id: "A",
    title: "Saisie de la demande",
    description:
      "Évaluez les informations nécessaires pour saisir une nouvelle demande.",
    difficultyLevels: [
      {
        level: 1,
        timeLimit: 60,
        question: "Où la demande de test peut-elle être consultée ?",
        type: "multiple-choice",
        options: [
          "Consultée dans Teams",
          "Consultée dans les fichiers de suivi et prochainement dans un outil digital via une notification",
          "Consultée dans mes mails",
        ],
        correctAnswer:
          "Consultée dans les fichiers de suivi et prochainement dans un outil digital via une notification",
        impacts: {
          traversalTime: 1,
          etp: 0,
          unnecessaryExchanges: 1,
        },
      },
      {
        level: 2,
        timeLimit: 60,
        question:
          "Combien d'informations sont nécessaires pour saisir une nouvelle demande ? Citez-en 5.",
        type: "open-ended",
        correctAnswer:
          "Code orchestra, Code MP, Numéro lot MP, FDS disponible dans Milor, Disponibilité MP chez EVOTEC, Stratégie test définie, Information budget si test externe",
        impacts: {
          traversalTime: 1.5,
          etp: 0,
          unnecessaryExchanges: 1,
        },
      },
      {
        level: 3,
        timeLimit: 180,
        question:
          "Quelles informations supplémentaires de l'Exp. Req. sont disponibles dans les outils de suivi PredTest ?",
        type: "multiple-choice",
        options: [
          "Type de demande (ie. Best Hit / Screening / Design Assistance / Data Gap / Claim)",
          "Informations sur le budget",
          "Statut de la demande et des différents tests associés",
        ],
        correctAnswer: [
          "Type de demande (ie. Best Hit / Screening / Design Assistance / Data Gap / Claim)",
          "Informations sur le budget",
          "Statut de la demande et des différents tests associés",
        ],
        impacts: {
          traversalTime: 2,
          etp: 0.1,
          unnecessaryExchanges: 2,
        },
      },
    ],
  },
  B: {
    id: "B",
    title: "Planification des tests",
    description:
      "Planifiez les tests à réaliser et identifiez les ressources nécessaires.",
    difficultyLevels: [
      {
        level: 1,
        timeLimit: 60,
        question:
          "Après validation de prise en charge du testing suite à l'étude de faisabilité, quelle action doit être engagée ?",
        type: "multiple-choice",
        options: [
          "Effectuer la demande de pesée pour envoi au labo",
          "Faire valider par le toxicologue",
          "Archiver la demande",
        ],
        correctAnswer: "Effectuer la demande de pesée pour envoi au labo",
        impacts: {
          traversalTime: 2,
          etp: 0,
          unnecessaryExchanges: 0,
        },
      },
      // Add more difficulty levels
    ],
  },
};

const mockQuests = {
  1: {
    id: "1",
    title: "Le grand tri",
    description:
      "Identifiez les demandes conformes parmi un ensemble de demandes.",
    timeLimit: 600,
    instructions:
      "Vous devez examiner plusieurs cartes représentant des demandes PredTest. Parmi ces demandes, certaines ne sont pas conformes. Vous disposez de 10 minutes pour passer en revue toutes les demandes et identifier lesquelles sont conformes.",
    tips: [
      "Vérifiez attentivement les informations transmises dans chaque demande et comparez-les aux exigences de conformité du processus PredTest.",
    ],
    cards: [
      {
        id: "1",
        title: "Carte 1/5",
        content:
          "Jules a besoin de générer du testing pour une étude de screening sur un projet anti-âge incluant du test interne et externe. Il a généré une demande sur Expertise Request.",
        items: [
          "Disponibilité de la MP chez Evotech",
          "Code projet",
          "Fiche de sécurité (FDS)",
          "Informations sur les budgets",
        ],
        isConforming: true,
      },
      {
        id: "2",
        title: "Carte 2/5",
        content:
          "Jules a besoin de générer du testing pour une étude de screening sur un projet anti-âge. Il a envoyé un mail à l'équipe TOM.",
        items: [
          "Disponibilité de la MP chez Evotech",
          "Code projet",
          "Fiche de sécurité (FDS)",
          "Informations sur les budgets",
        ],
        isConforming: false,
      },
      {
        id: "3",
        title: "Carte 3/5",
        content:
          "Jules a besoin de générer du testing pour une étude de screening sur un projet anti-âge. Il a généré une demande sur Expertise Request.",
        items: [
          "Disponibilité de la MP chez Evotech",
          "Code projet",
          "Fiche de sécurité (FDS)",
          "Informations sur les budgets",
          "Poids moléculaire",
        ],
        isConforming: false,
      },
      {
        id: "4",
        title: "Carte 4/5",
        content:
          "Jules a besoin de générer du testing pour une étude de screening sur un projet anti-âge. Il a généré une demande sur Expertise Request.",
        items: [
          "Disponibilité de la MP chez Evotech",
          "Conditions de stockage",
          "Fiche de sécurité (FDS)",
          "Informations sur les budgets",
          "Poids moléculaire",
        ],
        isConforming: false,
      },
      {
        id: "5",
        title: "Carte 5/5",
        content:
          "Jules a besoin de générer du testing pour une étude de screening sur un projet anti-âge incluant du test interne et externe. Il a généré une demande sur Expertise Request.",
        items: [
          "Disponibilité de la MP chez Evotech",
          "Code projet",
          "Fiche de sécurité (FDS)",
          "Informations sur les budgets",
          "Solubilité",
          "Poids moléculaire",
        ],
        isConforming: true,
      },
    ],
    correctAnswers: ["1", "5"],
    impacts: {
      traversalTime: 2,
      etp: 0,
      unnecessaryExchanges: 2,
    },
  },
  5: {
    id: "5",
    title: "L'opération devis",
    description:
      "Évaluez un devis de CRO et identifiez les éléments non conformes.",
    timeLimit: 600,
    instructions:
      "Vous recevez un devis de la part du CRO MARVIlab et devez assurer la conformité de ce dernier. Identifiez les éléments rédhibitoires.",
    tips: [
      "Vérifiez attentivement les conditions contractuelles et financières du devis.",
    ],
    // Additional quest data would go here
  },
};

// API functions using promises for future backend integration
export const fetchScenarios = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockScenarios);
    }, 300);
  });
};

export const fetchScenario = (scenarioId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const scenario = mockScenarios.find((s) => s.id === scenarioId);
      if (scenario) {
        resolve(scenario);
      } else {
        reject(new Error(`Scenario with ID ${scenarioId} not found`));
      }
    }, 300);
  });
};

export const fetchChallenge = (challengeId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const challenge = mockChallenges[challengeId];
      if (challenge) {
        resolve(challenge);
      } else {
        reject(new Error(`Challenge with ID ${challengeId} not found`));
      }
    }, 300);
  });
};

export const fetchQuest = (questId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const quest = mockQuests[questId];
      if (quest) {
        resolve(quest);
      } else {
        reject(new Error(`Quest with ID ${questId} not found`));
      }
    }, 300);
  });
};
