"use client"
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import { MdModeEdit } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import AvatarSelector from "@/components/profilepage/AvatarSelector";

function ProfilePage() {
    const avatars = ["/assets/ecogo_avatar_01.png","/assets/ecogo_avatar_02.png","/assets/ecogo_avatar_03.png","/assets/ecogo_avatar_04.png"]
    const [image_url, setImage_url] = useState("/assets/ecogo_avatar_04.png");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState("Nombre de Usuario");
    const [email, setEmail] = useState("ejemplo@gmail.com");
    const [phone_number, setPhone_number] = useState("+1234567890");
    const [school_target, setSchool_target] = useState('Preparatoria Oficial 9');
    const [address, setAddress] = useState('Col. Lorem. Calle Ipsum');
    const [city, setCity] = useState('Ciudad de México');
    const [gender, setGender] = useState('Otro');
    return ( 
        <div className="flex flex-col min-h-screen justify-center items-center">
            <NavBarDesktop/>
            <div className="flex flex-col gap-4 p-4 md:p-8 bg-base rounded-[18px] shadow-lg">
                <div className=" flex items-center gap-5 ">
                    <div className="relative rounded-full overflow-hidden border-3 border-base-dark cursor-pointer group" onClick={() => setIsModalOpen(true)}>
                        <Image 
                        src={image_url} 
                        alt="Profile Icon" 
                        width={100} 
                        height={100}/>
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-30 transition-opacity">
                            <MdModeEdit className="text-white text-2xl" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start h-full">
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="text-lg font-black text-base-dark bg-transparent border-b border-base-dark focus:outline-none"
                                />
                                <p className="opacity-60">{email}</p>
                                <input
                                    type="tel"
                                    value={phone_number}
                                    onChange={(e) => setPhone_number(e.target.value)}
                                    className="opacity-60 bg-transparent border-b border-gray-400 focus:outline-none"
                                />
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="opacity-60 bg-transparent border-b border-gray-400 focus:outline-none"
                                >
                                    <option value="Hombre">Hombre</option>
                                    <option value="Mujer">Mujer</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                <div className="">
                                    <p className="underline cursor-pointer" onClick={() => setIsEditing(false)}>Guardar</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-lg font-black text-base-dark">{username}</p>
                                <p className="opacity-60">{email}</p>
                                <p className="opacity-60">{phone_number}</p>
                                <p className="opacity-60">{gender}</p>
                                <div className="">
                                    <p className="underline cursor-pointer" onClick={() => setIsEditing(true)}>Editar</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="border-t-2 flex flex-col pt-2">
                    <p className="text-base-dark font-semibold">Escuela a la que quiero entrar:</p>
                    {isEditing ? (
                        <input
                            type="text"
                            value={school_target}
                            onChange={(e) => setSchool_target(e.target.value)}
                            className="opacity-60 bg-transparent border-b border-gray-400 focus:outline-none"
                        />
                    ) : (
                        <p className="opacity-60">{school_target}</p>
                    )}
                    <p className="text-base-dark font-semibold">Dirección:</p>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="opacity-60 bg-transparent border-b border-gray-400 focus:outline-none"
                                placeholder="Ciudad"
                            />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="opacity-60 bg-transparent border-b border-gray-400 focus:outline-none"
                                placeholder="Dirección"
                            />
                        </>
                    ) : (
                        <>
                            <p className="opacity-60">{city}</p>
                            <p className="opacity-60">{address}</p>
                        </>
                    )}
                </div>
            </div>
            {isModalOpen && <AvatarSelector avatars={avatars} onSelect={(avatar) => { setImage_url(avatar); setIsModalOpen(false); }} onClose={() => setIsModalOpen(false)} />}
            <NavBarMovile/>
        </div>
     );
}

export default ProfilePage
;