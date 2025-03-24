"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function AirportMap({ latitude, longitude, name }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current)

      const airportIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3097/3097166.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      })

      L.marker([latitude, longitude], { icon: airportIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b>${name}</b><br>Lat: ${latitude}<br>Lng: ${longitude}`)
        .openPopup()
    } else {
      mapInstanceRef.current.setView([latitude, longitude], 13)

      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current?.removeLayer(layer)
        }
      })

      const airportIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/3097/3097166.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      })

      L.marker([latitude, longitude], { icon: airportIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b>${name}</b><br>Lat: ${latitude}<br>Lng: ${longitude}`)
        .openPopup()
    }

    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize()
      }
    }, 100)

    return () => {
      if (mapInstanceRef.current && !mapRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [latitude, longitude, name])

  return <div ref={mapRef} className="h-full w-full rounded-md" />
}

