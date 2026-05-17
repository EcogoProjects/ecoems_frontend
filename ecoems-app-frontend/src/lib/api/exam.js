import { api } from './client'

export async function startExam({ exam_type, subtopic_id = null }) {
    return api.post('/exams/start', { exam_type, subtopic_id })
}

export async function getCurrentSession() {
    return api.get('/exams/active')
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

export async function closeExam() {
    return api.post('/exams/close', null)
}

export async function getExplication({ session_id, question_id }) {
    return api.post(`/exams/${session_id}/explanation`, { question_id })
}

export async function getHint({ session_id, question_id }) {
    return api.post(`/exams/${session_id}/hint`, { question_id })
}
