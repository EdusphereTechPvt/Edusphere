import CardComponent from "@/app/components/CardComponent/Index";
import Image from "next/image";

export default function ImpactAndStatistic() {
  const stats = [
    {
      type: "generic",
      title: "+45%",
      desc: "Increase in Student Engagement",
      styles: {
        cardStyle: { inlineStyle: { px: 4, width: 300 } },
        iconContainerStyle: { inlineStyle: { backgroundColor: "#0b73da" } },
        iconStyles: { inlineStyle: { color: "white" } },
        textContainerStyle: {
          inlineStyle: { mt: 1 },
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "2rem", sm: "2.3rem", lg: "2.5rem" },
              fontWeight: "600",
              color: "#0b73da",
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
      title: "92%",
      desc: "Teacher Satisfaction Rate",
      styles: {
        cardStyle: { inlineStyle: { px: 4, width: 300 } },
        iconContainerStyle: { inlineStyle: { backgroundColor: "#0b73da" } },
        iconStyles: { inlineStyle: { color: "white" } },
        textContainerStyle: {
          inlineStyle: { mt: 1 },
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "2rem", sm: "2.3rem", lg: "2.5rem" },
              fontWeight: "600",
              color: "#0b73da",
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
      title: "98%",
      desc: "School Retention Rate",
      styles: {
        cardStyle: { inlineStyle: { px: 4, width: 300 } },
        iconContainerStyle: { inlineStyle: { backgroundColor: "#0b73da" } },
        iconStyles: { inlineStyle: { color: "white" } },
        textContainerStyle: {
          inlineStyle: { mt: 1 },
          titleStyle: {
            inlineStyle: {
              fontSize: { xs: "2rem", sm: "2.3rem", lg: "2.5rem" },
              fontWeight: "600",
              color: "#0b73da",
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

  const testimonials = [
    {
      type: "testimonial",
      content: "This app is amazing!",
      avatar: "https://avatar.iran.liara.run/public/18",
      desc: "Role 1",
      styles: {
        cardStyle: {
          inlineStyle: {
            padding: 0,
            width: "100%",
            minWidth: { xs: "280px", sm: "320px", md: "360px" },
            maxWidth: "420px",
            // maxHeight: { xs: "200px", sm: "220px", md: "240px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
            },
          },
        },
        textStyle: {
          inlineStyle: {
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
            color: "#333",
            fontStyle: "italic",
          },
        },
        avatarStyle: {
          inlineStyle: {
            height: { xs: 40, sm: 44, md: 48 },
            width: { xs: 40, sm: 44, md: 48 },
            border: "2px solid #eee",
          },
        },
        infoContainerStyle: {
          inlineStyle: {
            mb: -0.5,
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
          },
        },
      },
    },
    {
      type: "testimonial",
      content: "Love this app, it has transformed my learning experience!",
      avatar: "https://avatar.iran.liara.run/public/19",
      name: "Name 2",
      desc: "Role 2",
      styles: {
        cardStyle: {
          inlineStyle: {
            padding: 0,
            width: "100%",
            minWidth: { xs: "280px", sm: "320px", md: "360px" },
            maxWidth: "420px",
            maxHeight: { xs: "200px", sm: "220px", md: "240px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
            },
          },
        },
        textStyle: {
          inlineStyle: {
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
            color: "#333",
            fontStyle: "italic",
          },
        },
        avatarStyle: {
          inlineStyle: {
            height: { xs: 40, sm: 44, md: 48 },
            width: { xs: 40, sm: 44, md: 48 },
            border: "2px solid #eee",
          },
        },
        infoContainerStyle: {
          inlineStyle: {
            mb: -0.5,
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
          },
        },
      },
    },
    {
      type: "testimonial",
      content: "Wow, this app is really helpful for my studies!",
      avatar: "https://avatar.iran.liara.run/public/20",
      name: "Name 3",
      desc: "Role 3",
      styles: {
        cardStyle: {
          inlineStyle: {
            padding: 0,
            width: "100%",
            minWidth: { xs: "280px", sm: "320px", md: "360px" },
            maxWidth: "420px",
            maxHeight: { xs: "200px", sm: "220px", md: "240px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
            },
          },
        },
        textStyle: {
          inlineStyle: {
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
            color: "#333",
            fontStyle: "italic",
          },
        },
        avatarStyle: {
          inlineStyle: {
            height: { xs: 40, sm: 44, md: 48 },
            width: { xs: 40, sm: 44, md: 48 },
            border: "2px solid #eee",
          },
        },
        infoContainerStyle: {
          inlineStyle: {
            mb: -0.5,
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
          },
        },
      },
    },
  ];

  return (
    <section className="py-16 px-6 text-center bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-black">
        Impact and Statistics
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-6 mx-auto">
        {stats.map((stat, i) => (
          <CardComponent key={i} data={stat} />
        ))}
      </div>

      <div className="flex items-center justify-center my-16">
        <Image
          src="https://placehold.co/600x400"
          alt="Statistic Illustration"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          unoptimized
        />
      </div>

      <h2 className="text-3xl font-bold mb-12 text-black">
        From Our Community
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-6 mx-auto">
        {testimonials.map((testimonial, i) => (
          <CardComponent
            key={i}
            data={testimonial}
          />
        ))}
      </div>
    </section>
  );
}