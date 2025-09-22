"use client";
import React from "react";
import StatCard from "./StatCard";
import ImageCard from "./ImageCard";
import HeaderCard from "./HeaderCard";
import GenericCard from "./GenericCard";
import ProgressBar from "./ProgressBar";
import TeamCard from "./TeamCard";
import TestimonialCard from "./TestimonialCard";

const CardComponent = ({ data }) => {
  switch (data.type) {
    case "stat":
      return <StatCard {...data} />;
    case "headerCard":
      return <HeaderCard {...data} />;
    case "image":
      return <ImageCard {...data} />;
    case "progressbar":
      return <ProgressBar {...data} />;
    case "team":
      return <TeamCard {...data} />;
    case "testimonial":
      return <TestimonialCard {...data} />;
    default:
      return <GenericCard {...data} />;
  }
};

export default CardComponent;
