import { MdShutterSpeed } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaUnlockAlt, FaBookReader } from "react-icons/fa";

function ExamTypeButton({ type, title, icon, isDisabled = false, description, onClick }) {
    const getIcon = () => {
        switch (icon) {
            case 'speed':
                return <MdShutterSpeed size={30} />;
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
        <>
            <div onClick={onClick} className={`flex items-center justify-between gap-3 min-h-[60px]  bg-base-hard-alt/10 p-2 rounded-[15px] md:hidden cursor-pointer
            transition-all duration-200  hover:bg-base-hard-alt hover:text-base-dark hover:ring-3 hover:ring-base-hard-alt`}>
                <h3 className="font-semibold">{title}</h3>
                <div className="shrink-0 p-1.5 bg-base-hard-alt w-fit h-fit rounded-[10px] text-base-dark">
                    {getIcon()}
                </div>
            </div>
            <div onClick={onClick} className="hidden min-w-0 md:flex xl:flex-row md:flex-col gap-3 w-full rounded-[15px] justify-start items-start xl:items-center p-3 border-base-hard-alt cursor-pointer hover:opacity-70 bg-base-hard-alt/10 hover:ring-3 hover:ring-base-hard-alt">
                <h3 className="font-semibold md:w-full xl:hidden text-base">{title}</h3>
                <div className="flex min-w-0 gap-3 w-full">
                    <div className="shrink-0 p-1.5 bg-base-hard-alt w-fit h-fit rounded-[10px] text-base-dark">
                        {getIcon()}
                    </div>
                    <div className="flex min-w-0 flex-col text-sm xl:hidden">
                        <p className="opacity-60">{description}</p>
                    </div>
                    <div className="hidden min-w-0 xl:flex flex-col text-base">
                        <h3 className="font-semibold">{title}</h3>
                        <p className="opacity-60">{description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExamTypeButton;
