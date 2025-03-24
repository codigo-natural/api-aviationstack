'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAirportStore } from "@/store/airportStore"
import { AirportCard } from "@/components/airportCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import Image from "next/image"
import { SearchHistory } from "./searchHistory"
import Pagination from "@/components/ui/Pagination"

export function AirportList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialSearch = searchParams.get("search") || ""
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const {
    airports,
    isLoading,
    error,
    fetchAirports,
    currentPage,
    totalPages,
    setCurrentPage,
    searchHistory,
  } = useAirportStore()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    fetchAirports(initialSearch)
  }, [fetchAirports, initialSearch])

  const handleSearch = async (e) => {
    e.preventDefault()
    router.push(`/aeropuertos?search=${encodeURIComponent(searchTerm)}`)
    await fetchAirports(searchTerm)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => fetchAirports(searchTerm)} data-testid="retry-button">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="block text-center">
            <h1 className="text-4xl font-bold text-blue-400">SkyConnect Explorer</h1>
          </Link>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mr-0">
            <Input
              type="text"
              placeholder="Buscar aeropuerto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-black rounded-full w-[792px] placeholder:text-blue-400"
            />
            <Button type="submit" className="bg-gradient-button hover:bg-blue-600 text-white rounded-sm px-6 w-[218px] gap-2">
              <Image src='/search.png' alt='Buscar' width={20} height={20} />
              Buscar
            </Button>
          </form>

          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            data-testid="toggle-theme"
            className="bg-gradient-button hover:bg-blue-600 text-white rounded-sm p-3">
            {theme === 'dark' ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
        </div>

        {searchHistory.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Historial de Búsquedas</h2>
            <SearchHistory />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {airports.length > 0 ? (
              airports.map((airport) => <AirportCard key={airport.airport_id} airport={airport} />)
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-gray-400">No se encontraron aeropuertos</p>
              </div>
            )}
          </div>
        )}

        {airports.length > 0 && !isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  )
}
