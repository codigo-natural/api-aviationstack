import React from 'react'

export function RightCardSection() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-1/2">
      <div className="h-full w-full relative">
        <img
          src="/airport-bg.jpg"
          alt="Airport"
          className="h-full w-full object-cover opacity-10"
        />
      </div>
    </div>
  )
}
