import { api } from './client'

/**
 * Obtiene preguntas del banco de preguntas.
 * GET /api/v1/questions?subject=&exam_type=&limit=
 * @param {{ subject?: string, examType?: string, limit?: number }} options
 * @returns {{ data: object[]|null, error: string|null }}
 */
export async function getQuestions({ subject, examType, limit = 20 } = {}) {
  const params = new URLSearchParams()
  if (subject)  params.set('subject', subject)
  if (examType) params.set('exam_type', examType)
  params.set('limit', limit)

  return api.get(`/api/v1/questions?${params}`)
}

/**
 * Guarda el resultado de un examen completado.
 * POST /api/v1/exam-results
 * @param {{
 *   examType: string,
 *   subject: string|null,
 *   totalQuestions: number,
 *   correctAnswers: number,
 *   score: number,
 *   durationSeconds: number,
 *   answers: Array<{ questionId: string, selected: string, correct: boolean }>
 * }} result
 * @returns {{ data: object|null, error: string|null }}
 */
export async function saveExamResult(result) {
  return api.post('/api/v1/exam-results', {
    exam_type:       result.examType,
    subject:         result.subject,
    total_questions: result.totalQuestions,
    correct_answers: result.correctAnswers,
    score:           result.score,
    duration_seconds: result.durationSeconds,
    answers:         result.answers,
  })
}

/**
 * Obtiene el historial de exámenes del usuario autenticado.
 * GET /api/v1/exam-results?limit=
 * @param {{ limit?: number }} options
 * @returns {{ data: object[]|null, error: string|null }}
 */
export async function getExamHistory({ limit = 50 } = {}) {
  return api.get(`/api/v1/exam-results?limit=${limit}`)
}
