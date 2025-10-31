import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RequestDemo() {
  const router = useRouter();
  return (
    <section className="text-center py-10 lg:py-16 bg-white text-black">
      <h1 className="text-base md:text-xl lg:text-4xl font-bold mb-4 text-black">
        Ready to Transform Your School?
      </h1>
      <p className="text-gray-600 text-[0.8rem] md:text-base mb-6 max-w-xl mx-auto">
        Join the growing number of schools that are enhancing their educational
        experience with Edusphere.
      </p>
      <Button
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
        onClick={() => router.push("/demo")}
        variant="contained"
        sx={{
          color: "white",
          textTransform: "none",
          fontWeight: "bold",
          py: { xs: 1, sm: 1.2, md: 1.5 },
          minWidth: { sm: 120, md: 140, lg: 160 },
          fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
        }}
      >
        Request a Free Demo
      </Button>
    </section>
  );
}
