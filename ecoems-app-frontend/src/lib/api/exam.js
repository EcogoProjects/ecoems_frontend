import { api } from './client'

export async function startExam({ exam_type, subtopic_id = null }) {
    return api.post('/exams/start', { exam_type, subtopic_id })
}

export async function getDailyUsage() {
    return api.get('/users/me/usage/daily')
}

export async function submitAnswer({ session_id, question_id, selected_answer }) {
    return api.post(`/exams/${session_id}/answer`, { question_id, selected_answer })
}

export async function submitExam(session_id) {
    return api.post(`/exams/${session_id}/submit`, {})
}
