"use client"
import { useSyllabus } from "@/hooks/useSyllabus";
import TopicAccordion from "@/components/analytics/TopicAccordion";
import TopicAccordionSkeleton from "@/components/analytics/TopicAccordionSkeleton";

// Encapsula el patrón hook + skeleton + accordion del temario.
// El caché de módulo de useSyllabus dedupea el fetch entre páginas.
export default function SyllabusAccordion() {
    const { data: syllabus, isLoading } = useSyllabus();
    return isLoading ? <TopicAccordionSkeleton /> : <TopicAccordion topics={syllabus ?? []} />;
}
