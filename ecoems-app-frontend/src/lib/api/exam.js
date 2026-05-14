import { api } from './client'

export async function startExam({ exam_type, subject_id = null, topic_id = null, subtopic_id = null }) {
    return api.post('/exams/start', { exam_type, subject_id, topic_id, subtopic_id })
}

export async function getDailyUsage() {
    return api.get('/users/me/usage/daily')
}
