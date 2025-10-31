import CardComponent from "@/app/components/CardComponent/Index";
import React from "react";

export default function MeetOurTeam() {
  const cards = [
    {
      type: "team",
      title: "Name 1",
      avatar: "https://placehold.co/300x300",
      desc: "Role 1",
      styles: {
        cardStyle: {
          inlineStyle: { px: 2, width: 460, height: 220, boxShadow: "none" },
        },
        avatarStyle: { inlineStyle: { width: 150, height: 150 } },
        textContainerStyle: {
          inlineStyle: { mt: -1 },
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "0.9rem", sm: "1rem", lg: "1.1rem" },
              fontWeight: "600",
            },
          },
          descStyle: {
            inlineStyle: {
              fontSize: { xs: "0.75rem", sm: "0.8rem", lg: "0.9rem" },
              color: "#0b73da",
            },
          },
        },
      },
    },
    {
      type: "team",
      title: "Name 2",
      avatar: "https://placehold.co/300x300",
      desc: "Role 2",
      styles: {
        cardStyle: {
          inlineStyle: { px: 2, width: 460, height: 220, boxShadow: "none" },
        },
        avatarStyle: { inlineStyle: { width: 150, height: 150 } },
        textContainerStyle: {
          inlineStyle: { mt: -1 },
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "0.9rem", sm: "1rem", lg: "1.1rem" },
              fontWeight: "600",
            },
          },
          descStyle: {
            inlineStyle: {
              fontSize: { xs: "0.75rem", sm: "0.8rem", lg: "0.9rem" },
              color: "#0b73da",
            },
          },
        },
      },
    },
    {
      type: "team",
      title: "Name 3",
      avatar: "https://placehold.co/300x300",
      desc: "Role 3",
      styles: {
        cardStyle: {
          inlineStyle: { px: 2, width: 460, height: 220, boxShadow: "none" },
        },
        avatarStyle: { inlineStyle: { width: 150, height: 150 } },
        textContainerStyle: {
          inlineStyle: { mt: -1 },
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "0.9rem", sm: "1rem", lg: "1.1rem" },
              fontWeight: "600",
            },
          },
          descStyle: {
            inlineStyle: {
              fontSize: { xs: "0.75rem", sm: "0.8rem", lg: "0.9rem" },
              color: "#0b73da",
            },
          },
        },
      },
    },
  ];

  return (
    <section id="team-section" className="py-10 md:py-20 px-6 text-center bg-white">
      <h1 className="text-base md:text-xl lg:text-4xl   font-bold mb-4 text-black">
        Meet Our Team
      </h1>

      <p className="text-gray-600 text-[0.8rem] md:text-base leading-relaxed max-w-md mx-auto  mb-12 text-center">
        The Passionate Minds Behind Edusphere: Meet the Team Driving Educational
        Innovation.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mx-auto" role="list">
        {cards.map((card, i) => (
          <CardComponent key={i} data={card} />
        ))}
      </div>
    </section>
  );
}