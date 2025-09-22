import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';

import CardComponent from "@/components/CardComponent/Index";


export default function MissionAndValues() {
  const cards = [
    {
      type: "generic",
      title: "Innovation",
      icon: TipsAndUpdatesRoundedIcon,
      role: "To empower educators with innovative tools that enhance teaching and learning experiences.",
    },
    {
      type: "generic",
      title: "Collaboration",
      icon: Groups2RoundedIcon,
      role: "We believe in working together with educators, students, and communities to build meaningful solutions.",
    },
    {
      type: "generic",
      title: "Commitment",
      icon: VerifiedUserRoundedIcon,
      role: "We are dedicated to continuously improving our tools and supporting schools with integrity and reliability.",
    },
  ];

  return (
    <section className="py-20 px-6 text-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-black">Our Mission & Values</h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        At Edusphere, we are guided by clear mission and core values that shape everything we do.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {cards.map((card, i) => (
          <CardComponent
            key={i}
            data={card}
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
}

