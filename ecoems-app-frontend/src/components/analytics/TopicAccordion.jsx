"use client"
import { useState } from "react";
import { FaSortDown } from "react-icons/fa";

export default function TopicAccordion({ topics = [] }) {
  const [openTopics, setOpenTopics] = useState({});

  const subjects = Array.isArray(topics) && topics.length > 0 && topics[0].subject != null
    ? topics
    : [{ title: "Temas", topics }];

  const toggleTopic = (subjectIndex, topicIndex) => {
    setOpenTopics((prev) => ({
      ...prev,
      [subjectIndex]: prev[subjectIndex] === topicIndex ? null : topicIndex,
    }));
  };

  return (
    <div className="bg-base p-4 rounded-[18px] flex flex-col gap-4">
      <h2 className="w-full text-base bg-base-dark rounded-[11px] p-1.5 text-center tracking-wider font-bold">
        Temas por revisar
      </h2>

      {subjects.map((subject, subjectIndex) => (
        <div key={subject.subject ?? subject.title ?? subjectIndex} className="bg-base-soft rounded-[18px] p-4">
          <p className="font-semibold text-lg mb-3">{subject.subject ?? subject.title}</p>
          <div className="flex flex-col gap-3">
            {(subject.topics ?? []).map((topic, topicIndex) => {
              const isOpen = openTopics[subjectIndex] === topicIndex;
              const title = topic.topic ?? topic.title;
              const description = topic.description;
              const subtopics = topic.subtopics ?? [];

              return (
                <div key={topic.topic_id ?? title ?? topicIndex} className="bg-base p-3 rounded-[18px] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleTopic(subjectIndex, topicIndex)}
                    className="w-full flex items-center justify-between gap-3 text-left hover:cursor-pointer  hover:opacity-70 transition-colors duration-150"
                  >
                    <div>
                      <p className="font-semibold">{title}</p>
                      {description && <p className="text-sm text-base-dark/70 mt-1">{description}</p>}
                    </div>
                    <span className={`text-2xl font-bold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                      <FaSortDown />
                    </span>
                  </button>

                  {isOpen && subtopics.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2 border-t border-base-dark/10 pt-3">
                      {subtopics.map((subtopic, subIndex) => (
                        <div key={subtopic.subtopic_id ?? subtopic.title ?? subIndex} className="rounded-[18px] bg-base-soft p-3">
                          <p className="font-semibold">{subtopic.name ?? subtopic.title}</p>
                          {subtopic.description && <p className="text-sm opacity-80 mt-1">{subtopic.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
