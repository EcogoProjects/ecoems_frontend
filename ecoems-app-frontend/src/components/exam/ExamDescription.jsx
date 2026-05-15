import React from 'react'
import { IoMdBookmarks } from 'react-icons/io';
import { MdOutlineCollectionsBookmark, MdTimer } from "react-icons/md";
import { FaChevronLeft, FaPlay } from "react-icons/fa";

export default function ExamDescription({ examTitle, description, time, n_questions, range, show_subtopic = true }) {

    return (
        <div className="bg-base-dark text-base-soft p-6 rounded-[28px] flex flex-col items-center w-full max-w-[420px] md:max-w-[600px] shadow-2xl relative overflow-hidden group">
            <h2 className='text-2xl text-center font-extrabold mb-6 tracking-tight relative z-10'>
                {examTitle}
                <div className="h-1.5 w-16 bg-premium-box mx-auto mt-3 rounded-full opacity-90"></div>
            </h2>

            {/* Panel de información */}
            <div className='w-full flex flex-col bg-base-hard text-base-dark p-5 sm:p-6 rounded-2xl font-medium shadow-inner relative z-10 gap-5'>

                {/* Caracteristicas del examen */}
                <div className='flex flex-wrap justify-center gap-2.5 w-full text-base '>
                    <div className='flex items-center gap-1.5 bg-base-dark px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide'>
                        <MdOutlineCollectionsBookmark size={16} className="text-base opacity-80" />
                        <span>{range}</span>
                    </div>
                    <div className='flex items-center gap-1.5 bg-base-dark px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide'>
                        <MdTimer size={16} className="text-base opacity-80" />
                        <span>{time}</span>
                    </div>
                    <div className='flex items-center gap-1.5 bg-base-dark px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide'>
                        <IoMdBookmarks size={16} className="text-baseopacity-80" />
                        <span>{n_questions} preg.</span>
                    </div>
                </div>

                {/* Separador */}
                <div className="w-full h-[2px] bg-base-dark/5 rounded-full"></div>

                {/* Formulario para elegir subtema */}
                <div className='flex flex-col gap-3.5 w-full'>
                    <h3 className="text-[11px] font-extrabold uppercase tracking-widest opacity-60 mb-0.5 text-center">Elige un tema para practicar</h3>

                    <div className="flex flex-col gap-1 w-full relative">
                        <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 pl-1" htmlFor="materias">Materia</label>
                        <select id="materias" className="appearance-none bg-base-soft text-base-dark px-4 py-2.5 rounded-xl text-sm border-2 border-transparent outline-none focus:ring-0 focus:border-base-dark cursor-pointer w-full font-semibold shadow-sm transition-all hover:bg-white hover:shadow-md">
                            <option value="">Seleccionar materia...</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-4 text-base-dark opacity-60">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full relative">
                        <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 pl-1" htmlFor="temas">Tema</label>
                        <select id="temas" className="appearance-none bg-base-soft text-base-dark px-4 py-2.5 rounded-xl text-sm border-2 border-transparent outline-none focus:ring-0 focus:border-base-dark cursor-pointer w-full font-semibold shadow-sm transition-all hover:bg-white hover:shadow-md">
                            <option value="">Seleccionar tema...</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-4 text-base-dark opacity-60">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    {show_subtopic && (
                        <div className="flex flex-col gap-1 w-full relative">
                            <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 pl-1" htmlFor="subtemas">Subtema</label>
                            <select id="subtemas" className="appearance-none bg-base-soft text-base-dark px-4 py-2.5 rounded-xl text-sm border-2 border-transparent outline-none focus:ring-0 focus:border-base-dark cursor-pointer w-full font-semibold shadow-sm transition-all hover:bg-white hover:shadow-md">
                                <option value="">Seleccionar subtema...</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-4 text-base-dark opacity-60">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <p className='text-[15px] leading-relaxed opacity-90 text-center mt-7 mb-8 relative z-10 font-medium px-2'>
                {description}
            </p>

            <div className='flex gap-3 w-full relative z-10'>
                <button className='flex-1 flex justify-center items-center gap-2 py-3.5 px-2 rounded-xl font-bold transition-all duration-300 text-base-soft bg-transparent border-2 border-base-soft/20 hover:border-base-soft/60 hover:bg-base-soft/5 active:scale-[0.97]'>
                    <FaChevronLeft size={14} />
                    Regresar
                </button>
                <button className='flex-1 flex justify-center items-center gap-2 py-3.5 px-2 rounded-xl font-bold transition-all duration-300 bg-premium-box text-base-dark hover:bg-premium-alt-box hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]'>
                    Comenzar
                    <FaPlay size={12} />
                </button>
            </div>
        </div>
    )
}
