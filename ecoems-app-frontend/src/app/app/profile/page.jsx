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
    const username = "Nombre de Usuario";
    const email = "ejemplo@gmail.com";
    const phone_number = "+1234567890";
    const school_target = 'Preparatoria Oficial 9';
    const address = 'Col. Lorem. Calle Ipsum'
    const city = 'Ciudad de México';
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
                        <p className="text-lg font-black text-base-dark">{username}</p>
                        <p className="opacity-60">{email}</p>
                        <p className="opacity-60">{phone_number}</p>
                        <div className="">
                            <p className="underline cursor-pointer">Editar</p>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 flex flex-col pt-2">
                    <p className="text-base-dark font-semibold">Escuela a la que quiero entrar:</p>
                    <p className="opacity-60">{school_target}</p>
                    <p className="text-base-dark font-semibold">Dirección:</p>
                    <p className="opacity-60">{city}</p>
                    <p className="opacity-60">{address}</p>
                </div>
            </div>
            {isModalOpen && <AvatarSelector avatars={avatars} onSelect={(avatar) => { setImage_url(avatar); setIsModalOpen(false); }} onClose={() => setIsModalOpen(false)} />}
            <NavBarMovile/>
        </div>
     );
}

export default ProfilePage
;