import { api } from './client'

/**
 * Devuelve el temario completo con materias, temas y subtemas.
 * GET /syllabus
 * @returns {{ data: Array<{ subject_id: number, name: string, display_order: number, topics: Array<{ topic_id: number, name: string, topic_order: number, subtopics: Array<{ subtopic_id: number, name: string, subtopic_order: number }> }> }>|null, error: string|null }}
 */
export async function getSyllabus() {
    return api.get('/syllabus')
}
