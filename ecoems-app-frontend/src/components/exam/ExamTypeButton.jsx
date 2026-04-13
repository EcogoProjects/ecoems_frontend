import { MdShutterSpeed } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUnlockAlt, FaBookReader } from "react-icons/fa";

function ExamTypeButton({ type, title, icon, isDisabled = false }) {
    const getIcon = () => {
        switch (icon) {
            case 'speed':
                return <MdShutterSpeed size={40} />;
            case 'calendar':
                return <RiCalendarScheduleFill size={30} />;
            case 'unlock':
                return <FaUnlockAlt size={30} />;
            case 'book':
                return <FaBookReader size={30} />;
            default:
                return null;
        }
    };

    return (
        <div className={`flex items-center justify-between gap-3 min-h-[60px] max-w-[154px] bg-base-dark p-1.5 rounded-[15px] 
        transition-all duration-200 hover:bg-base-hard-alt hover:text-base-dark hover:ring-1  hover:shadow-lg`}>
            <h3 className="font-semibold">{title}</h3>
            <div className="flex items-center justify-center w-10 h-10">
                {getIcon()}
            </div>
        </div>
    );
}

export default ExamTypeButton;