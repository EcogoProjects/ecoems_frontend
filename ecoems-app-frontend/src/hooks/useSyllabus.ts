import { useState, useEffect } from 'react';
import { getSyllabus } from '@/lib/api';

export interface Subtopic {
    subtopic_id: number;
    name: string;
    subtopic_order: number;
}

export interface SyllabusTopic {
    topic_id: number;
    topic: string;
    topic_order: number;
    subtopics: Subtopic[];
}

export interface SyllabusSubject {
    subject_id: number;
    subject: string;
    display_order: number;
    topics: SyllabusTopic[];
}

let syllabusCache: SyllabusSubject[] | null = null;

export function useSyllabus(): { data: SyllabusSubject[] | null; isLoading: boolean } {
    const [data, setData] = useState<SyllabusSubject[] | null>(syllabusCache);
    const [isLoading, setIsLoading] = useState<boolean>(syllabusCache === null);

    useEffect(() => {
        if (syllabusCache !== null) return;

        getSyllabus()
            .then(({ data: raw }: { data: any[] | null; error: string | null }) => {
                if (!raw) return;
                const mapped: SyllabusSubject[] = raw.map(subject => ({
                    subject_id: subject.subject_id,
                    subject: subject.name,
                    display_order: subject.display_order,
                    topics: subject.topics.map((topic: any) => ({
                        topic_id: topic.topic_id,
                        topic: topic.name,
                        topic_order: topic.topic_order,
                        subtopics: topic.subtopics,
                    })),
                }));
                syllabusCache = mapped;
                setData(mapped);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return { data, isLoading };
}
