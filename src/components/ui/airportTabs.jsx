import React from 'react'

export const AirportTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="grid grid-cols-4 gap-1 bg-[#3F495F] rounded-md overflow-hidden">
      <button
        className={`py-3 px-4 text-center transition-colors ${activeTab === "general" ? "tab-active" : "text-gray-300 hover:bg-[#1e3050]"}`}
        onClick={() => setActiveTab("general")}
      >
        General
      </button>
      <button
        className={`py-3 px-4 text-center transition-colors ${activeTab === "ubicacion" ? "tab-active" : "text-gray-300 hover:bg-[#1e3050]"}`}
        onClick={() => setActiveTab("ubicacion")}
      >
        Ubicación
      </button>
      <button
        className={`py-3 px-4 text-center transition-colors ${activeTab === "zona-horaria" ? "tab-active" : "text-gray-300 hover:bg-[#1e3050]"}`}
        onClick={() => setActiveTab("zona-horaria")}
      >
        Zona Horaria
      </button>
      <button
        className={`py-3 px-4 text-center transition-colors ${activeTab === "estadisticas" ? "tab-active" : "text-gray-300 hover:bg-[#1e3050]"}`}
        onClick={() => setActiveTab("estadisticas")}
      >
        Estadísticas
      </button>
    </div>
  )
}
