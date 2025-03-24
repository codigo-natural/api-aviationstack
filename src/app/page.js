'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/aeropuertos?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <main
      className='relative flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center bg-no-repeat bg-black/60 bg-blend-overlay'
      style={{ backgroundImage: "url('/airport-background.jpg')" }}
    >
      <div className='w-full flex flex-col items-center'>
        <Link href='/' className='mb-8'>
          <h1 className='text-4xl font-bold text-blue-400'>
            SkyConnect Explorer
          </h1>
        </Link>

        <form
          onSubmit={handleSearch}
          className='w-full flex flex-col items-center gap-4'
        >
          <Input
            type='text'
            placeholder='Buscar aeropuerto...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-md bg-white text-black rounded-full px-4 h-[59px] w-[780px] placeholder:text-blue-400'
          />
          <Button
            type='submit'
            className='bg-gradient-button h-[52px] w-[234px] hover:bg-blue-600 text-white rounded-sm px-6'
          >
            <Image src='/search.png' alt='Buscar' width={20} height={20} />
            Buscar
          </Button>
        </form>
      </div>
    </main>
  )
}
