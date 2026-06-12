const SUBJECTS = [
    { topics: 4 },
    { topics: 3 },
];

function SkeletonBar({ className = "" }) {
    return <div className={`bg-base-hard/20 rounded-full animate-pulse ${className}`} />;
}

export default function TopicAccordionSkeleton() {
    return (
        <div className="bg-base p-4 rounded-[18px] flex flex-col gap-4">
            <SkeletonBar className="h-8 w-full rounded-[11px]" />

            {SUBJECTS.map((subject, si) => (
                <div key={si} className="bg-base-soft rounded-[18px] p-4 flex flex-col gap-3">
                    <SkeletonBar className="h-5 w-2/5" />
                    {Array.from({ length: subject.topics }).map((_, ti) => (
                        <div key={ti} className="bg-base p-3 rounded-[18px] flex items-center justify-between gap-3">
                            <SkeletonBar className="h-4 w-3/5" />
                            <SkeletonBar className="h-5 w-5 rounded-full shrink-0" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
