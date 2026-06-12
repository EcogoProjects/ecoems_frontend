import React from 'react';

export default function ExamenRapidoCard() {
  return (
    <div className="w-[360px] bg-[#3E2A1D] rounded-2xl p-4 font-sans border border-[#4A3728]">
      
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-[#D1A975] rounded-xl flex items-center justify-center text-2xl">
          ⏱️
        </div>
        <div className="flex flex-col">
          <h3 className="text-[#F5EBE1] font-bold text-lg m-0">Examen Rápido</h3>
          <p className="text-[#A39487] text-sm m-0">Realiza un examen de un solo subtema.</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#5C4A3A] w-full mb-3" />

      {/* Attempts Section */}
      <div className="bg-[#473424] rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#D1A975] text-lg">🤍</span>
          <span className="text-[#E8DCCB] text-sm font-medium">Tus intentos de hoy</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-[#FF595A] text-sm">❤️</span>
          <span className="text-[#FF595A] text-sm">❤️</span>
          <span className="text-[#6A5243] text-sm">🤎</span>
          <span className="text-[#F5EBE1] font-bold text-sm ml-2">2 / 3</span>
        </div>
      </div>
      
    </div>
  );
}