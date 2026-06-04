'use client'

import { useState } from 'react';
import { IoMdBookmarks, IoMdClose } from 'react-icons/io';
import { MdOutlineCollectionsBookmark, MdTimer } from "react-icons/md";
import { FaChevronLeft, FaPlay, FaHeart } from "react-icons/fa";
import { PiPawPrintFill } from 'react-icons/pi';
import { useAvailableSyllabus } from '@/hooks/useSyllabus';

export default function ExamDescription({ examTitle, description, time, n_questions, range, show_subtopic = true, onClose, onStart, isStarting = false, examsRemaining, examsUsed }) {
    const { data: syllabus } = useAvailableSyllabus();

    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [selectedTopicId, setSelectedTopicId] = useState('');
    const [selectedSubtopicId, setSelectedSubtopicId] = useState('');

    const selectedSubject = syllabus?.find(s => s.subject_id === Number(selectedSubjectId)) ?? null;
    const selectedTopic = selectedSubject?.topics.find(t => t.topic_id === Number(selectedTopicId)) ?? null;

    const clip = (text, max = 70) => text.length > max ? text.slice(0, max) + '…' : text;

    const canStart = selectedSubjectId !== '' && selectedTopicId !== '' && (!show_subtopic || selectedSubtopicId !== '');

    const handleSubjectChange = (e) => {
        setSelectedSubjectId(e.target.value);
        setSelectedTopicId('');
        setSelectedSubtopicId('');
    };

    const handleTopicChange = (e) => {
        setSelectedTopicId(e.target.value);
        setSelectedSubtopicId('');
    };

    const selectClass = "appearance-none bg-[#FFF9E4] text-base-dark pl-3 pr-10 py-3 md:pl-4 md:py-2.5 rounded-xl text-sm border-2 border-transparent outline-none focus:ring-0 focus:border-base-dark cursor-pointer w-full font-semibold shadow-sm transition-all hover:bg-white hover:shadow-md truncate";
    const selectDisabledClass = "appearance-none bg-[#FFF9E4] text-base-dark pl-3 pr-10 py-3 md:pl-4 md:py-2.5 rounded-xl text-sm border-2 border-transparent outline-none w-full font-semibold shadow-sm truncate cursor-not-allowed";
    const chevron = (
        <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-3 text-base-dark opacity-60">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
        </div>
    );

    return (
        <div className="bg-base-dark text-base-soft p-4 md:p-6 rounded-[28px] flex flex-col items-center w-full shadow-2xl relative group">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 text-base-soft/50 hover:text-base-soft transition-colors p-1 cursor-pointer"
                >
                    <IoMdClose size={22} />
                </button>
            )}

            <h2 className='text-xl md:text-2xl text-center font-extrabold mb-4 md:mb-6 tracking-tight relative z-10'>
                {examTitle}
                <div className="h-1.5 w-16 bg-premium-box mx-auto mt-3 rounded-full opacity-90"></div>
            </h2>

            {/* Panel de información */}
            <div className='w-full flex flex-col bg-base-hard text-base-dark p-5 sm:p-6 rounded-2xl font-medium shadow-inner relative z-10 gap-5'>

                {/* Características del examen */}
                <div className='flex flex-wrap justify-center gap-2.5 w-full text-base'>
                    <div className='flex items-center gap-1.5 bg-base-dark px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide'>
                        <MdOutlineCollectionsBookmark size={16} className="text-base opacity-80" />
                        <span>{range}</span>
                    </div>
                    <div className='flex items-center gap-1.5 bg-base-dark px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide'>
                        <MdTimer size={16} className="text-base opacity-80" />
                        <span>{time}</span>
                    </div>
                    <div className='flex items-center gap-1.5 bg-base-dark px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide'>
                        <IoMdBookmarks size={16} className="text-base opacity-80" />
                        <span>{n_questions} preg.</span>
                    </div>
                </div>

                {/* Intentos del día */}
                {examsRemaining !== undefined && examsUsed !== undefined && (
                    <div className="bg-base-dark/10 rounded-xl p-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 shrink-0">
                            <FaHeart size={13} className="text-base-dark/80" />
                            <span className="text-[13px] font-semibold text-base-dark">Tus intentos de hoy</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: examsRemaining }).map((_, i) => (
                                <PiPawPrintFill key={`r-${i}`} size={13} className="text-base-dark" />
                            ))}
                            {Array.from({ length: examsUsed }).map((_, i) => (
                                <PiPawPrintFill key={`u-${i}`} size={13} className="text-base-dark/40" />
                            ))}
                            <span className="text-base-dark font-bold text-sm ml-1.5">
                                {examsRemaining}/{examsRemaining + examsUsed}
                            </span>
                        </div>
                    </div>
                )}

                {/* Separador */}
                <div className="w-full h-[2px] bg-base-dark/5 rounded-full"></div>

                {/* Formulario cascada */}
                <div className='flex flex-col gap-3.5 w-full'>
                    <h3 className="text-[11px] font-extrabold uppercase tracking-widest opacity-60 mb-0.5 text-center">Elige un tema para practicar</h3>

                    {/* Materia */}
                    <div className="flex flex-col gap-1 w-full relative">
                        <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 pl-1" htmlFor="materias">Materia</label>
                        <select
                            id="materias"
                            value={selectedSubjectId}
                            onChange={handleSubjectChange}
                            className={selectClass}
                        >
                            <option value="">Seleccionar materia...</option>
                            {syllabus?.map(s => (
                                <option key={s.subject_id} value={s.subject_id} title={s.subject}>
                                    {clip(s.subject)}
                                </option>
                            ))}
                        </select>
                        {chevron}
                    </div>

                    {/* Tema */}
                    <div className={`flex flex-col gap-1 w-full relative transition-opacity duration-200 ${!selectedSubjectId ? 'opacity-40 pointer-events-none' : ''}`}>
                        <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 pl-1" htmlFor="temas">Tema</label>
                        <select
                            id="temas"
                            value={selectedTopicId}
                            onChange={handleTopicChange}
                            disabled={!selectedSubjectId}
                            className={!selectedSubjectId ? selectDisabledClass : selectClass}
                        >
                            <option value="">Seleccionar tema...</option>
                            {selectedSubject?.topics.map(t => (
                                <option key={t.topic_id} value={t.topic_id} title={t.topic}>
                                    {clip(t.topic)}
                                </option>
                            ))}
                        </select>
                        {chevron}
                    </div>

                    {/* Subtema */}
                    {show_subtopic && (
                        <div className={`flex flex-col gap-1 w-full relative transition-opacity duration-200 ${!selectedTopicId ? 'opacity-40 pointer-events-none' : ''}`}>
                            <label className="text-[11px] font-bold uppercase tracking-wider opacity-80 pl-1" htmlFor="subtemas">Subtema</label>
                            <select
                                id="subtemas"
                                value={selectedSubtopicId}
                                onChange={e => setSelectedSubtopicId(e.target.value)}
                                disabled={!selectedTopicId}
                                className={!selectedTopicId ? selectDisabledClass : selectClass}
                            >
                                <option value="">Seleccionar subtema...</option>
                                {selectedTopic?.subtopics.map(s => (
                                    <option key={s.subtopic_id} value={s.subtopic_id} title={s.name}>
                                        {clip(s.name)}
                                    </option>
                                ))}
                            </select>
                            {chevron}
                        </div>
                    )}
                </div>
            </div>

            <p className='text-[14px] md:text-[15px] leading-relaxed text-center mt-5 md:mt-7 mb-5 md:mb-8 relative z-10 font-medium px-2'>
                {description}
            </p>

            <div className='flex gap-3 w-full relative z-10'>
                <button
                    onClick={onClose}
                    className='flex-1 flex justify-center items-center gap-2 py-3.5 px-2 rounded-xl font-bold transition-all duration-300 text-base-soft bg-transparent border-2 border-base-soft/20 hover:border-base-soft/60 hover:bg-base-soft/5 active:scale-[0.97] cursor-pointer'
                >
                    <FaChevronLeft size={14} />
                    Regresar
                </button>
                <button
                    disabled={!canStart || isStarting}
                    onClick={() => onStart?.({ subtopic_id: Number(selectedSubtopicId) })}
                    className={`flex-1 flex justify-center items-center gap-2 py-3.5 px-2 rounded-xl font-bold transition-all duration-300 text-base-dark active:translate-y-0 active:scale-[0.97]
                        ${canStart && !isStarting ? 'bg-premium-box hover:bg-premium-alt-box hover:-translate-y-0.5 cursor-pointer' : 'bg-base-hard/60 cursor-not-allowed'}`}
                >
                    {isStarting ? 'Iniciando...' : 'Comenzar'}
                    {!isStarting && <FaPlay size={12} />}
                </button>
            </div>
        </div>
    );
}
