"use client";
import React from "react";
import StatCard from "./StatCard.jsx";
import ImageCard from "./ImageCard.jsx";
import HeaderCard from "./HeaderCard.jsx";
import GenericCard from "./GenericCard.jsx";
import ProgressBar from "./ProgressBar.jsx";
import TestimonialCard from "./TestimonailCard.jsx";
import ImgInfoCard from "./ImgInfoCard.jsx";

const CardComponent = ({ data }) => {
  switch (data?.type) {
    case "stat":
      return <StatCard {...data} />;
    case "headerCard":
      return <HeaderCard {...data} />;
    case "image":
      return <ImageCard {...data} />;
    case "progressbar":
      return <ProgressBar {...data} />;
    case "testimonial":
      return <TestimonialCard {...data} />;
    case "imgInfo":
      return <ImgInfoCard {...data} />;
    default:
      return <GenericCard {...data} />;
  }
};

export default CardComponent;
