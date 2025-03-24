'use client'

import { useAirportStore } from '@/store/airportStore'
import { Button } from '@/components/ui/button'
import { Clock, X } from 'lucide-react'

export function SearchHistory() {
  const {
    searchHistory,
    setSearchQuery,
    removeFromSearchHistory,
    clearSearchHistory,
  } = useAirportStore()

  if (searchHistory.length === 0) {
    return null
  }

  return (
    <section className='mb-6' data-testid="search-history">
      <div className='pb-2'>
        <div className='flex flex-row items-center justify-between py-4'>
          <div className='text-lg flex items-center gap-2'>
            <Clock className='mr-2 h-4 w-4' />
            Busquedas recientes
          </div>
          <Button
            onClick={clearSearchHistory}
            className='h-8 text-sm hover:text-blue-400 outline-none border-none'
          >
            Borrar todo
          </Button>
        </div>
      </div>
      <div>
        <div className='flex flex-wrap gap-2'>
          {searchHistory.map((term, index) => (
            <div
              key={`${term}-${index}`}
              className='flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm'
            >
              <span
                className='cursor-pointer'
                onClick={() => setSearchQuery(term)}
              >
                {term}
              </span>
              <Button
                variant='ghost'
                size='icon'
                className='h-5 w-5 ml-1 p-0'
                onClick={() => removeFromSearchHistory(index)}
              >
                <X className='h-3 w-3' />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
