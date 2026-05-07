import Image from "next/image";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

function AvatarSelector({ avatars, onSelect, onClose }) {
    const [selected, setSelected] = useState(null);

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-base-soft p-6 rounded-2xl max-w-md w-full flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Selecciona un avatar</h2>
                    <button onClick={onClose} className="cursor-pointer hover:opacity-70 transition-opacity">
                        <IoCloseSharp size={20} />
                    </button>
                </div>

                <div className="flex justify-center flex-wrap gap-3">
                    {avatars.map((avatar) => {
                        const isSelected = selected === avatar.avatar_url;
                        return (
                            <button
                                key={avatar.id}
                                onClick={() => setSelected(avatar.avatar_url)}
                                className={`rounded-full transition-all duration-200 cursor-pointer ${
                                    isSelected
                                        ? 'scale-110 ring-4 ring-base-dark ring-offset-2 ring-offset-base-soft'
                                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <Image
                                    src={avatar.avatar_url}
                                    alt={avatar.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                />
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => selected && onSelect(selected)}
                    disabled={!selected}
                    className="w-full bg-base-dark text-base-soft py-2.5 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                    Guardar
                </button>
            </div>
        </div>
    );
}

export default AvatarSelector;
