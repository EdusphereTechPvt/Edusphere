import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RequestDemo() {
  const router = useRouter();
  return (
    <section className="text-center py-16 bg-white text-black">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black">
        Ready to Transform Your School?
      </h1>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
        Join the growing number of schools that are enhancing their educational
        experience with Edusphere.
      </p>
      <Button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition" 
              onClick={()=>router.push("/demo")}
              variant="contained">
        Request a Free Demo
      </Button>
    </section>
  );
}