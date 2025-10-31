import Image from "next/image";
import { Button } from "@mui/material";

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  imageUrl,
  onButtonClick,
}) {
  return (
    <section className="relative w-full h-[65vh] sm:h-[68vh] md:h-[70vh] lg:h-screen">
      <Image
        src={imageUrl}
        fill
        alt="Hero Background"
        unoptimized
        className="object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 bg-black/40">
        <h1 className="text-xl md:text-5xl lg:text-6xl font-bold max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm md:text-base max-w-4xl">{subtitle}</p>
        )}
        {buttonText && (
          <Button
            onClick={onButtonClick}
            sx={{
              py: { xs: 1, sm: 1.2, md: 1.5 },
              minWidth: { sm: 120, md: 140, lg: 160 },
              textTransform: "none",
              fontWeight: "bold",
              py: { xs: 1, sm: 1.2, md: 1.5 },
              minWidth: { sm: 120, md: 140, lg: 160 },
              mt: 2,
              fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
            }}
            variant="contained"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </section>
  );
}
