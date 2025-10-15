"use client";
import { ContactUsConfig } from "@/app/config/ContactUsConfig";
import GenericCard from "@/app/components/CardComponent/GenericCard";

const ContactUs = () => {
  const config = ContactUsConfig;

  const handleEmailClick = (email) => {
    if (email) window.location.href = `mailto:${email}`;
  };

  return (
    <div className="bg-gray-50 py-5 min-h-screen">
      <div className="p-6 md:p-8 rounded-2xl w-full max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 text-gray-900 text-center">
          {config.title}
        </h1>

        <p className="text-xs md:text-sm lg:text-base text-gray-500 text-center mb-6">
          {config.desc}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "80%",
          alignItems: "stretch",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {config.cards.map((card, key) => (
          <GenericCard
            key={key}
            title={card.title}
            desc={card.desc}
            icon={card.icon}
            additionalInfo={[
              {
                email: (
                  <span
                    onClick={() => handleEmailClick(card.email)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    {card.email}
                  </span>
                ),
              },
              { time: card.time },
            ]}
            styles={config.styles}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactUs;
