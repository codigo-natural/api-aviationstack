'use client'

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useAirportStore } from "@/store/airportStore";
import Link from "next/link";
import { AirportTabs } from "@/components/ui/airportTabs";
import { Loading } from "@/components/Loading";
import Image from "next/image";
import { RightCardSection } from "@/components/RightCardSection";

const AirportMap = dynamic(() => import("@/components/airportMap"), {
  ssr: false,
  loading: () => <Loading />
})

export default function AirportDetail({ params }) {
  const [airport, setAirport] = useState(null)
  const { getAirportById, isLoading, error } = useAirportStore()
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const fetchAirport = async () => {
      const data = await getAirportById(params.id)
      setAirport(data)
    }

    fetchAirport()
  }, [params.id, getAirportById])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          {error}
        </div>
      </div>
    )
  }

  if (isLoading || !airport) {
    return <Loading />
  }

  const formatDate = () => {
    const now = new Date()
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="block text-center mb-4">
          <h1 className="text-4xl font-bold text-blue-400">{airport?.airport_name}</h1>
        </Link>

        <AirportTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "general" && (
          <section className="airport-card bg-gradient-target p-6 mt-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex items-start gap-3">
              <Image src="/Info_Circle.png" alt="info-icon" width={24} height={24} />
              <div>
                <h2 className="text-xl font-bold text-blue-400 mb-4">Información General</h2>
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-row gap-2">
                    <p className="text-gray-400">Código IATA:</p>
                    <p className="font-medium">{airport?.iata_code || "No disponible"}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-gray-400">Código ICAO:</p>
                    <p className="font-medium">{airport?.icao_code || "No disponible"}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-gray-400">País:</p>
                    <p className="font-medium">{airport?.country_name || "No disponible"}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-gray-400">Ciudad IATA:</p>
                    <p className="font-medium">{airport?.city_name || "No disponible"}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-gray-400">Teléfono:</p>
                    <p className="font-medium">{airport?.phone_number || "No disponible"}</p>
                  </div>
                </div>
              </div>
              <RightCardSection />
            </div>
          </section>
        )}

        {activeTab === "ubicacion" && (
          <>
            <section className="airport-card bg-gradient-target p-6 mt-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex items-start gap-3">
                <Image src="/Map_Point.png" alt="icon-map-marker" width={24} height={24} />
                <div>
                  <h2 className="text-xl font-bold text-blue-400 mb-4">Ubicación</h2>
                  <div className="flex flex-col gap-y-3">
                    <div className="flex flex-row gap-2">
                      <p className="text-gray-400">Latitud:</p>
                      <p className="font-medium">{airport.latitude || "No disponible"}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="text-gray-400">Longitud:</p>
                      <p className="font-medium">{airport.longitude || "No disponible"}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="text-gray-400">ID Geoname:</p>
                      <p className="font-medium">{airport.airport_id || "No disponible"}</p>
                    </div>
                  </div>
                </div>
                <RightCardSection />
              </div>
            </section>

            {airport.latitude && airport.longitude && (
              <div className="mt-4 h-[400px] w-full">
                <AirportMap
                  latitude={Number.parseFloat(airport.latitude)}
                  longitude={Number.parseFloat(airport.longitude)}
                  name={airport.airport_name}
                />
              </div>
            )}
          </>
        )}

        {activeTab === "zona-horaria" && (
          <>
            <section className="airport-card bg-gradient-target p-6 mt-4 border border-white rounded bg-card text-card-foreground shadow-sm">
              <div className="flex items-start gap-3">
                <Image src="/Global.png" alt="globe-icon-map" width={24} height={24} />
                <div>
                  <h2 className="text-xl font-bold text-blue-400 mb-4">Zona Horaria</h2>
                  <div className="flex flex-col gap-y-3">
                    <div className="flex flex-row gap-2">
                      <p className="text-gray-400">Zona Horaria:</p>
                      <p className="font-medium">{airport.timezone || "No disponible"}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <p className="text-gray-400">GMT:</p>
                      <p className="font-medium">
                        {airport.timezone ? new Date().getTimezoneOffset() / -60 : "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>
                <RightCardSection />
              </div>
            </section>

            <section className="airport-card bg-gradient-target p-6 mt-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex items-start gap-3">
                <Image src="/Clock_Circle.png" alt="icon-clock" width={24} height={24} />
                <div>
                  <h2 className="text-xl font-bold text-blue-400 mb-4">Hora Local</h2>
                  <p className="font-medium">{formatDate()}</p>
                </div>
                <RightCardSection />
              </div>
            </section>
          </>
        )}
      </div>
    </div >
  )
}
