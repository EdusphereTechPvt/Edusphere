import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import CardComponent from "@/app/components/CardComponent/Index";
import { Hedvig_Letters_Serif } from "next/font/google";

export default function MissionAndValues() {
  const cards = [
    {
      type: "generic",
      title: "Innovation",
      icon: TipsAndUpdatesRoundedIcon,
      desc: "To empower educators with innovative tools that enhance teaching and learning experiences.",
      styles: {
        cardStyle:{inlineStyle:{px:4, width: 500, height: 220,}},
        iconContainerStyle: { inlineStyle: { backgroundColor: "#0b73da" } },
        iconStyles: { inlineStyle: { color: "white" } },
        textContainerStyle: {
          inlineStyle:{mt:1},
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "1.1rem", sm: "1.2rem", lg: "1.3rem" },
              fontWeight: "600"
            },
          },
          descStyle: {
            inlineStyle: {
              fontSize: { xs: "0.75rem", sm: "0.8rem", lg: "0.9rem" },
            },
          },
        },
      },
    },
    {
      type: "generic",
      title: "Collaboration",
      icon: Groups2RoundedIcon,
      desc: "We believe in working together with educators, students, and communities to build meaningful solutions.",
      styles: {
        cardStyle:{inlineStyle:{px:4, width: 500, height: 220,}},
        iconContainerStyle: { inlineStyle: { backgroundColor: "#0b73da" } },
        iconStyles: { inlineStyle: { color: "white" } },
        textContainerStyle: {
          inlineStyle:{mt:1},
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "1.1rem", sm: "1.2rem", lg: "1.3rem" },
              fontWeight: "600"
            },
          },
          descStyle: {
            inlineStyle: {
              fontSize: { xs: "0.75rem", sm: "0.8rem", lg: "0.9rem" },
            },
          },
        },
      },
    },
    {
      type: "generic",
      title: "Commitment",
      icon: VerifiedUserRoundedIcon,
      desc: "We are dedicated to continuously improving our tools and supporting schools with integrity and reliability.",
      styles: {
        cardStyle:{inlineStyle:{px:4, width: 500, height: 220,}},
        iconContainerStyle: { inlineStyle: { backgroundColor: "#0b73da" } },
        iconStyles: { inlineStyle: { color: "white" } },
        textContainerStyle: {
          inlineStyle:{mt:1},
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "1.1rem", sm: "1.2rem", lg: "1.3rem" },
              fontWeight: "600"
            },
          },
          descStyle: {
            inlineStyle: {
              fontSize: { xs: "0.75rem", sm: "0.8rem", lg: "0.9rem" },
            },
          },
        },
      },
    },
  ];

  return (
    <section className="py-20 px-6 text-center bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
        Our Mission & Values
      </h2>
      <p className="text-gray-600 leading-relaxed max-w-md mx-auto mb-12 text-center">
        At Edusphere, we are guided by clear mission and core values that shape
        everything we do.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mx-auto">
        {cards.map((card, i) => (
          <CardComponent key={i} data={card} />
        ))}
      </div>
    </section>
  );
}