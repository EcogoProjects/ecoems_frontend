'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import raccoon from "@/assets/Raccoon_question.png";

interface FAQItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Cuánto tiempo dura el acceso a los planes?",
    answer: "El acceso es por todo el periodo de estudio para el examen ECOEMS 2026. Tu cuenta se mantendrá activa y con todas las características de tu plan hasta la fecha del periodo indicada (18 de diciembre de 2026). Normalmente los periodos finalizan una semana después del último examen."
  },
  {
    question: "¿Puedo cambiar de plan más adelante?",
    answer: "¡Por supuesto! Puedes iniciar con el Plan Smart de forma gratuita y actualizar al Plan Pro en cualquier momento desde tu panel de usuario o por esta página, para desbloquear accesos, pistas y explicaciones ilimitadas."
  },
  {
    question: "¿Qué métodos de pago están disponibles?",
    answer: "Actualmente solo aceptamos transferencias bancarias, estamos trabajando para pronto implementar pagos con tarjeta de crédito y débito."
  },
  {
    question: "¿Ofrecen alguna garantía de reembolso?",
    answer: "Sí, queremos que estudies con total tranquilidad. Ofrecemos una garantía de satisfacción de 7 días. Si durante tu primera semana con el Plan Pro consideras que no se adapta a tus necesidades, puedes solicitar la devolución del 100% de tu dinero."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 w-full  flex flex-col md:flex-row justify-center items-center">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#3D281F]">
            Preguntas Frecuentes
          </h2>
          <p className="mt-4 text-[#3D281F]/80 text-lg">
            Todo lo que necesitas saber sobre nuestros planes y el acceso a la plataforma
          </p>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="border-b border-[#3D281F]/10 pb-4 transition-all duration-300"
              >
                <div
                  role="button"
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left py-4 text-[#3D281F] font-semibold text-lg hover:text-[#CDAD75] transition-colors cursor-pointer select-none"
                >
                  <span className="pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3D281F]/50 transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180 text-[#3D281F]/80 ' : ''
                      }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all text-[#3D281F] duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-sm md:text-[16px] leading-relaxed text-[#3D281F] pb-2">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='max-w-3xl mx-auto px-6'>
        <Image src={raccoon} alt="" width={400} height={400} />
      </div>
    </section>
  )
}
