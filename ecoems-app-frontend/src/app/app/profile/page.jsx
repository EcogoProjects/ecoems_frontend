"use client"
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import { MdModeEdit } from "react-icons/md";
import { LuCreditCard } from "react-icons/lu";
import { AiTwotoneIdcard } from "react-icons/ai";
import AvatarSelector from "@/components/profilepage/AvatarSelector";
import { useState } from "react";
import Image from "next/image";

function ProfilePage() {
    
    const [username, setUsername] = useState("Nombre de Usuario");
    const email = "ejemplo@gmail.com"
    const [phone_number, setPhone_number] = useState("+1234567890");
    const plan_start = "04/26";
    const plan_end = "07/26"

    // Estados para edición del bloque principal
    const [isEditingMain, setIsEditingMain] = useState(false);
    const [tempUsername, setTempUsername] = useState(username);
    const [tempPhone, setTempPhone] = useState(phone_number);

    // Estados para edición del bloque "Acerca de mi"
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [school, setSchool] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [tempSchool, setTempSchool] = useState(school);
    const [tempCity, setTempCity] = useState(city);
    const [tempAddress, setTempAddress] = useState(address);

    //Edición de avatar
    const avatars = ["/assets/ecogo_avatar_01.png","/assets/ecogo_avatar_02.png","/assets/ecogo_avatar_03.png","/assets/ecogo_avatar_04.png"]
    const [image_url, setImage_url] = useState("/assets/ecogo_avatar_04.png");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para guardar cambios del bloque principal
    const handleSaveMainEdits = () => {
        setUsername(tempUsername);
        setPhone_number(tempPhone);
        setIsEditingMain(false);
    };

    // Función para cancelar edición del bloque principal
    const handleCancelMainEdits = () => {
        setTempUsername(username);
        setTempPhone(phone_number);
        setIsEditingMain(false);
    };

    // Función para guardar cambios del bloque "Acerca de mi"
    const handleSaveAboutEdits = () => {
        setSchool(tempSchool);
        setCity(tempCity);
        setAddress(tempAddress);
        setIsEditingAbout(false);
    };

    // Función para cancelar edición del bloque "Acerca de mi"
    const handleCancelAboutEdits = () => {
        setTempSchool(school);
        setTempCity(city);
        setTempAddress(address);
        setIsEditingAbout(false);
    };
    return ( 
        <div className="flex flex-col min-h-screen justify-center items-center">
            <NavBarDesktop/>
            <div className="flex flex-col w-4/5 md:w-3/5 gap-4 md:gap-6 items-center">
                <div className="flex flex-col md:flex-row md:justify-between bg-base-hard shadow-lg p-4 rounded-box-standard  w-full">
                    <div className="flex items-center gap-5 ">
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
                        
                        {!isEditingMain ? (
                            <div className="flex flex-col items-start h-full">
                                <p className="text-xl font-black">{username}</p>
                                <p>{email}</p>
                                <p>{phone_number}</p>
                                <p className="underline cursor-pointer font-semibold" onClick={() => {
                                    setTempUsername(username);
                                    setTempPhone(phone_number);
                                    setIsEditingMain(true);
                                }}>Editar</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-start md:h-max-[100px] gap-3 md:gap-1.5 w-full [&_input]:md:p-0">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="edit_username" className="font-semibold text-sm">Usuario:</label>
                                    <input 
                                        type="text" 
                                        id="edit_username"
                                        value={tempUsername} 
                                        onChange={(e) => setTempUsername(e.target.value)}
                                        className="border border-base-dark rounded px-2 py-1"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="edit_email" className="font-semibold text-sm">Email (No editable):</label>
                                    <input 
                                        type="email" 
                                        id="edit_email"
                                        value={email}
                                        disabled
                                        className="border border-base-dark rounded px-2 py-1 bg-base-dark/10 cursor-not-allowed"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="edit_phone" className="font-semibold text-sm">Teléfono:</label>
                                    <input 
                                        type="text" 
                                        id="edit_phone"
                                        value={tempPhone} 
                                        onChange={(e) => setTempPhone(e.target.value)}
                                        className="border border-base-dark rounded px-2 py-1"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={handleSaveMainEdits}
                                        className="bg-base-dark text-base-hard px-4 py-1 rounded font-semibold hover:opacity-80 transition"
                                    >
                                        Guardar
                                    </button>
                                    <button 
                                        onClick={handleCancelMainEdits}
                                        className="bg-base-dark/50 text-base-hard px-4 py-1 rounded font-semibold hover:opacity-80 transition"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                        
                </div>
                <div className="flex flex-col md:grid md:grid-cols-2 w-full gap-4 md:gap-6">
                    {/*Contenedor izquierdo */}
                    <div className="bg-base-soft flex flex-col justify-start rounded-box-standard shadow-lg p-10 pl-3.5 pr-3.5 w-full gap-1.5">
                        <div className=" w-full flex flex-col gap-2">
                            <div className="flex gap-1.5 items-center font-bold pl-2.5">
                                <LuCreditCard size={30} />
                                <h2 className="text-2xl">Mi suscripción</h2>
                            </div>
                            <div className="flex items-center justify-between bg-base rounded-2xl p-4">
                                <div className="flex flex-col w-full">
                                    <p className="text-lg font-semibold">Ecogo Pro</p>
                                    <p>Periodo: {plan_start} - {plan_end}</p>
                                </div>
                                <span className="bg-base-dark text-base p-1 rounded-full font-bold pr-2 pl-2 tracking-widest">Activo</span>
                            </div>
                        </div>
                    </div>
                    {/*Contendor derecha*/}
                    <div className="bg-base-soft flex flex-col justify-center items-start rounded-box-standard shadow-lg p-10 pl-3.5 pr-3.5 w-full gap-1.5">
                        <div className="flex justify-between w-full items-end pr-4">
                            <div className="flex gap-1.5 items-center font-bold pl-2.5">
                                <AiTwotoneIdcard size={30} />
                                <h2 className="text-2xl">Acerca de mi</h2>
                            </div>
                            <p 
                                className="underline cursor-pointer font-semibold hover:opacity-70 transition"
                                onClick={() => {
                                    setTempSchool(school);
                                    setTempCity(city);
                                    setTempAddress(address);
                                    setIsEditingAbout(true);
                                }}
                            >
                                Editar
                            </p>
                        </div>
                        <div className="flex flex-col bg-base rounded-2xl p-4 w-full gap-1 [&_input]:w-full">
                            {!isEditingAbout ? (
                                <>
                                    <div className="flex flex-col items-start">
                                        <label className="font-semibold text-sm">Escuela a la que quiero entrar:</label>
                                        <p className="py-1">{school || "No especificado"}</p>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label className="font-semibold text-sm">Mi ciudad:</label>
                                        <p className="py-1">{city || "No especificado"}</p>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label className="font-semibold text-sm">Aquí es donde vivo:</label>
                                        <p className="py-1">{address || "No especificado"}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="txt_school" className="font-semibold text-sm">Escuela a la que quiero entrar:</label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa la escuela a la que quieres entrar"
                                            id="txt_school"
                                            value={tempSchool}
                                            onChange={(e) => setTempSchool(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="txt_city" className="font-semibold text-sm">Mi ciudad:</label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa la ciudad donde vives"
                                            id="txt_city"
                                            value={tempCity}
                                            onChange={(e) => setTempCity(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="txt_address" className="font-semibold text-sm">Aquí es donde vivo:</label>
                                        <input
                                            type="text"
                                            placeholder="Ingresa tu dirección"
                                            id="txt_address"
                                            value={tempAddress}
                                            onChange={(e) => setTempAddress(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button 
                                            onClick={handleSaveAboutEdits}
                                            className="bg-base-dark text-base-hard px-4 py-1 rounded font-semibold hover:opacity-80 transition"
                                        >
                                            Guardar
                                        </button>
                                        <button 
                                            onClick={handleCancelAboutEdits}
                                            className="bg-base-dark/50 text-base-hard px-4 py-1 rounded font-semibold hover:opacity-80 transition"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <AvatarSelector avatars={avatars} onSelect={(avatar) => { setImage_url(avatar); setIsModalOpen(false); }} onClose={() => setIsModalOpen(false)} />}
            <NavBarMovile/>
        </div>
     );
}

export default ProfilePage
;