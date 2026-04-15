"use client";
import { useState } from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";


function AnnouncementBox({
    title,
    content_text,
    background,
    text_color,
    image_url = null,
    image_alt = "",
    can_close = false,
}) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return ( 
        <div className={`bg-${background} p-4 rounded-[18px] flex flex-col gap-3 shadow-lg justify-center items-center
        mb-6 w-4/5 md:max-w-[600px] `}>
            <div className="w-full flex justify-between">
                    <h2 className="font-bold text-xl">{title}</h2>
                    {can_close ? (
                        <button onClick={handleClose} className="float-right cursor-pointer hover:opacity-70 transition-opacity">
                            <IoCloseSharp />
                        </button>
                    ) : null}
                </div>
            <div className="flex flex-col items-center md:flex-row">
                <p>{content_text}</p>
                { image_url ? (<Image 
                src={image_url} 
                alt={image_alt}
                width={100}
                height={100}
                />) : null }
            </div>
            
        </div>
     );
}

export default AnnouncementBox;