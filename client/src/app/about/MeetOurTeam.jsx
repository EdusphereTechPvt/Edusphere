import React from "react";

import CardComponent from "@/components/CardComponent/Index";

export default function MeetOurTeam() {
  const cards = [
    { type: "team", title: "Name 1", avatar: "https://placehold.co/300x300", role: "Role 1" },
    { type: "team", title: "Name 2", avatar: "https://placehold.co/300x300", role: "Role 2" },
    { type: "team", title: "Name 3", avatar: "https://placehold.co/300x300", role: "Role 3" },
  ];

  return (
    <section id="team-section" className="py-20 px-6 text-center bg-white">
      <h2 className="text-3xl font-bold mb-4 text-black">Meet Our Team</h2>

      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        The Passionate Minds Behind Edusphere: Meet the Team Driving Educational
        Innovation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto items-stretch" role="list">
        {cards.map((card, i) => (
          <CardComponent key={i} data={card} role="listitem" />
        ))}
      </div>
    </section>
  );
}

