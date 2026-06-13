"use client"
import { useState } from "react";
import { reportQuestion } from "@/lib/api/exam";
import { MdClose, MdCheckCircle } from "react-icons/md";

export default function ReportModal({ questionId, sessionId, onClose, onReportSuccess }) {
    const [reason, setReason] = useState("");
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const reasons = [
        { id: "wrong_answer", label: "Respuesta incorrecta" },
        { id: "bad_wording", label: "Mala redacción" },
        { id: "image_missing", label: "Falta una imagen" },
        { id: "duplicate", label: "Pregunta duplicada" },
        { id: "other", label: "Otro" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reason) return;

        setIsSubmitting(true);
        setSubmitError(null);

        const { error } = await reportQuestion({
            question_id: questionId,
            reason,
            comment,
            session_id: sessionId
        });

        setIsSubmitting(false);

        if (error) {
            setSubmitError("Hubo un problema al enviar el reporte. Intenta de nuevo.");
            return;
        }

        setIsSuccess(true);
        if (onReportSuccess) {
            onReportSuccess();
        }

        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="relative w-full max-w-md rounded-[24px] bg-base p-6 shadow-2xl animate-in fade-in zoom-in-95">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-2xl text-base-dark hover:text-red-500 transition-colors"
                >
                    <MdClose />
                </button>

                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <MdCheckCircle className="text-5xl text-base-dark mb-4" />
                        <h2 className="text-xl font-bold text-base-dark mb-2">¡Gracias por tu reporte!</h2>
                        <p className="text-base-dark/70 text-sm">
                            El equipo revisará esta pregunta para mejorar el banco.
                        </p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-base-dark mb-4">Reportar problema</h2>
                        <p className="text-sm text-base-dark/70 mb-6">
                            Ayúdanos a mejorar contándonos qué pasa con esta pregunta.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-base-dark">Motivo (Obligatorio)</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {reasons.map((r) => (
                                        <label key={r.id} className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-base-soft transition-colors">
                                            <input
                                                type="radio"
                                                name="reason"
                                                value={r.id}
                                                checked={reason === r.id}
                                                onChange={(e) => setReason(e.target.value)}
                                                className="w-4 h-4 text-base-dark border-gray-300 focus:ring-base-dark"
                                            />
                                            <span className="text-sm font-medium text-base-dark">{r.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-base-dark">Comentarios adicionales (Opcional)</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Da más detalles sobre el error..."
                                    className="w-full rounded-xl border bg-base-soft p-3 text-sm focus:border-base-dark focus:ring-base-dark resize-none h-24 text-base-dark"
                                />
                            </div>

                            {submitError && (
                                <p className="text-sm text-red-500 font-medium">{submitError}</p>
                            )}

                            <button
                                type="submit"
                                disabled={!reason || isSubmitting}
                                className={`w-full py-3 rounded-xl font-bold text-white transition-all
                                    ${!reason || isSubmitting ? 'bg-base-dark/50 cursor-not-allowed' : 'bg-base-dark hover:opacity-90'}
                                `}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
