import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

function AvatarSelector({ avatars, onSelect, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-base-soft p-6 rounded-lg max-w-md w-full opacity-100 flex flex-col">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold mb-4">Selecciona un avatar</h2>
                    <button onClick={onClose} className="cursor-pointer hover:opacity-70 transition-opacity">
                        <IoCloseSharp />
                    </button>
                </div>
                
                <div className="flex justify-center flex-wrap gap-3">
                    {avatars.map((avatar, index) => (
                        <div key={index} className="cursor-pointer
                        rounded-full overflow-hidden" onClick={() => onSelect(avatar)}>
                            <Image src={avatar} 
                            alt={`Avatar ${index + 1}`} 
                            width={80} height={80} 
                            className="rounded-full border-3 border-base-dark" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AvatarSelector;