import Image from "next/image";
import vector from "@/public/vector.png";


export default function Home() {
  return (
    <main className="bg-[#f6edff] min-h-screen flex items-center">
      <section className="w-full grid grid-cols-2 max-w-7xl mx-auto items-center">
        <div className="flex flex-col items-center justify-center text-center px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
            The best URL shortener 
          </h1>
          <p className="text-base text-[#222] mb-1">
            We are the most straightforward URL Shortener in the world. Most of the url shorteners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortener
          </p>
          <div className="flex gap-4 mt-6">
            <button className="bg-[#a259f7] hover:bg-[#8f3ff7] text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
              Try Now
            </button>
            <button className="bg-white hover:bg-[#f3eaff] text-[#a259f7] font-bold py-2 px-6 rounded-lg shadow-md border border-[#a259f7] transition">
              GitHub
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={vector}
            width={500}
            height={350}
            alt="Team working illustration"
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
      </section>
    </main>
  );
}
