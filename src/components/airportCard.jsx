'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export function AirportCard({ airport }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/aeropuerto/${airport.airport_id}`);
  };

  return (
    <section onClick={handleClick} className="cursor-pointer border border-white rounded bg-gradient-target">
      <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[180px] relative">
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {airport.airport_name}
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              {airport.city} {airport.country_name}
            </p>
          </div>

          <div className="mt-8">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {airport.iata_code}
            </span>

          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2">
          <div className="h-full w-full relative">
            <img
              src="/airport-bg.jpg"
              alt="Airport"
              className="h-full w-full object-cover opacity-10"
            />
            <Image
              src="/flight.png"
              alt="Plane"
              className="absolute right-6 top-6"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </section>
  );
}