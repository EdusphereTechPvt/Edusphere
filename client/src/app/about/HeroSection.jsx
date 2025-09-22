import Image from "next/image";

export default function HeroSection({ title, subtitle, buttonText, imageUrl, onButtonClick })
{
  return (
    <section className="relative min-h-[70vh] lg:h-screen w-full">
      <Image
        src={imageUrl}
        fill
        alt="Hero Background"
        unoptimized
        className="object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 bg-black/40">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-xl max-w-4xl">{subtitle}</p>
        )}
        {buttonText && (
          <button 
            onClick={onButtonClick} 
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}
