// src/components/GameBoard/BoardNode.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../contexts/GameContext";

const BoardNode = ({
  node,
  position,
  isCurrentStep,
  isCompleted,
  isAvailable,
}) => {
  const navigate = useNavigate();
  const { showRoles } = useGameContext();

  const handleNodeClick = () => {
    if (!isAvailable) return;

    // Navigate to role selection first
    navigate(`/role-selection/${node.id}`);
  };

  // Determine node styling based on state
  const getNodeStyle = () => {
    if (isCurrentStep) {
      return "stroke-purple-400 stroke-[3px] fill-indigo-600";
    }
    if (isCompleted) {
      return "stroke-green-400 stroke-[3px] fill-indigo-800";
    }
    if (isAvailable) {
      return "stroke-indigo-400 stroke-[2px] fill-indigo-700 cursor-pointer hover:fill-indigo-600";
    }
    return "stroke-gray-600 stroke-[1px] fill-indigo-900 opacity-50";
  };

  // Render different node shapes based on type
  const renderNode = () => {
    const style = getNodeStyle();

    if (node.type === "challenge") {
      return (
        <g
          transform={`translate(${position.x}, ${position.y})`}
          onClick={handleNodeClick}
        >
          <circle r="40" className={style} />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="white"
            fontSize="24"
            fontWeight="bold"
          >
            {node.id}
          </text>
          <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10">
            {node.title}
          </text>
          {showRoles && renderRoleBadges(node.correctRoles)}
        </g>
      );
    } else if (node.type === "quest") {
      return (
        <g
          transform={`translate(${position.x}, ${position.y})`}
          onClick={handleNodeClick}
        >
          <rect
            x="-40"
            y="-40"
            width="80"
            height="80"
            rx="10"
            className={style}
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="white"
            fontSize="24"
            fontWeight="bold"
          >
            {node.id}
          </text>
          <text x="0" y="25" textAnchor="middle" fill="white" fontSize="10">
            {node.title}
          </text>
          {showRoles && renderRoleBadges(node.correctRoles)}
        </g>
      );
    } else if (node.type === "start" || node.type === "end") {
      return (
        <g transform={`translate(${position.x}, ${position.y})`}>
          <rect
            x="-50"
            y="-25"
            width="100"
            height="50"
            rx="25"
            className={style}
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="bold"
          >
            {node.type === "start" ? "START" : "FIN"}
          </text>
        </g>
      );
    }

    return null;
  };

  // Render role badges below the node
  const renderRoleBadges = (roles = []) => {
    const roleColors = {
      moniteur: "bg-purple-600",
      equipe: "bg-green-600",
      operateur: "bg-yellow-500",
      referent: "bg-blue-600",
      cro: "bg-red-600",
    };

    return (
      <g transform="translate(0, 45)">
        {roles.map((role, index) => {
          const offset = (index - (roles.length - 1) / 2) * 15;
          return (
            <circle
              key={role}
              cx={offset}
              cy="0"
              r="6"
              className={roleColors[role] || "bg-gray-600"}
            />
          );
        })}
      </g>
    );
  };

  return renderNode();
};

export default BoardNode;
