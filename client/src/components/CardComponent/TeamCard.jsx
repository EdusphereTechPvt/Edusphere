"use client";
import React from "react";
import GenericCard from "./GenericCard";

const TeamCard = ({ avatar, title, role }) => {
  return (
    <GenericCard
      avatar={avatar}
      title={title}
      role={role}
      styles={{
        avatar: { width: 140, height: 140 },
        role: { color: "#1976d2", fontWeight: 500 },
        card: {
          boxShadow: "none",
          backgroundColor: "transparent",
          cursor: "default",
        },
      }}
    />
  );
};

export default TeamCard;