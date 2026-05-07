"use client"
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import MarginTop from "@/components/MarginTop";
import MarginBottom from "@/components/MarginBottom";
import AvatarSelector from "@/components/profilepage/AvatarSelector";
import { MdModeEdit } from "react-icons/md";
import { LuCreditCard, LuUser, LuMapPin, LuSchool, LuClipboardList, LuLock } from "react-icons/lu";
import { AiTwotoneIdcard } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEstadosMunicipios } from "@/hooks/useEstadosMunicipios";
import { useProfile } from "@/hooks/useProfile";
import avatarsData from "@/lib/data/avatars.json";

const AVATARS = avatarsData.avatars;

function FieldRow({ label, value, empty = false, editing = false, onChange, type = "text", disabled = false, selectOptions }) {
    return (
        <div className={`flex flex-col gap-1.5 p-3.5 bg-base rounded-xl border border-base-hard/40${empty && !editing ? " opacity-60" : ""}${disabled ? " opacity-50" : ""}`}>
            <span className="text-[11.5px] font-medium tracking-[0.05em] uppercase text-base-dark/60">{label}</span>
            {editing && !disabled ? (
                selectOptions ? (
                    <select value={value} onChange={onChange} className="text-[15px] font-medium bg-transparent border-none outline-none w-full cursor-pointer text-base-dark">
                        {!value && <option value="" disabled>Selecciona una opción</option>}
                        {selectOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                ) : (
                    <input type={type} value={value} onChange={onChange} className="text-[15px] font-medium bg-transparent border-none outline-none w-full placeholder:opacity-40 text-base-dark" />
                )
            ) : (
                <span className={`text-[15px] font-medium break-words text-base-dark${empty && !editing ? " italic font-normal opacity-50" : ""}`}>
                    {value || "No especificado"}
                </span>
            )}
        </div>
    );
}

function CardEditBtn({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1.5 text-[13px] font-medium border border-base-dark/20 px-3.5 py-1.5 rounded-full hover:bg-base-dark hover:text-base-soft hover:border-base-dark transition-all cursor-pointer"
        >
            {children}
        </button>
    );
}

function InfoField({ label, value, icon, badge }) {
    const isBadgeField = badge !== null && badge !== undefined;
    const isEmpty = !value && !isBadgeField;
    return (
        <div className="flex items-start gap-3.5 p-4 bg-base rounded-xl border border-base-hard/40">
            <span className="w-8 h-8 rounded-lg bg-base-hard/25 flex items-center justify-center flex-shrink-0 mt-0.5 text-base-dark">
                {icon}
            </span>
            <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-base-dark/55">{label}</span>
                {isBadgeField ? (
                    <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1 rounded-full w-fit mt-0.5 ${badge ? 'bg-base-dark text-base-soft' : 'bg-base-dark/15 text-base-dark/70'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${badge ? 'bg-base-soft' : 'bg-base-dark/50'}`} />
                        {badge ? 'Sí' : 'No'}
                    </span>
                ) : (
                    <span className={`text-[14.5px] font-medium text-base-dark break-words leading-snug ${isEmpty ? 'italic font-normal opacity-50' : ''}`}>
                        {value || "No especificado"}
                    </span>
                )}
            </div>
        </div>
    );
}

function ProfileSkeleton() {
    const s = "bg-base-hard/20 rounded-lg animate-pulse";
    return (
        <div className="flex flex-col min-h-screen text-base-dark">
            <NavBarDesktop />
            <MarginTop />
            <main className="max-w-[1180px] mx-auto w-full px-8 py-8 pb-16">
                <div className="mb-6">
                    <div className={`h-9 w-44 mb-2 ${s}`} />
                    <div className={`h-4 w-64 ${s}`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="bg-base-hard rounded-[20px] p-8 pb-7">
                        <div className="flex items-center gap-6">
                            <div className={`w-28 h-28 rounded-full flex-shrink-0 ${s}`} />
                            <div className="flex flex-col gap-3 flex-1">
                                <div className={`h-6 w-40 ${s}`} />
                                <div className={`h-4 w-52 ${s}`} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-base-soft to-base rounded-[20px] p-7 border border-base-dark/[0.08]">
                        <div className={`h-5 w-36 mb-6 ${s}`} />
                        <div className="flex flex-col items-center gap-3">
                            <div className={`h-8 w-28 ${s}`} />
                            <div className={`h-4 w-44 ${s}`} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="bg-base-soft rounded-[20px] p-7 border border-base-dark/[0.08]">
                        <div className={`h-5 w-40 mb-5 ${s}`} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className={`h-[62px] rounded-xl ${s}`} />
                            ))}
                        </div>
                    </div>
                    <div className="bg-base-soft rounded-[20px] p-7 border border-base-dark/[0.08]">
                        <div className={`h-5 w-44 mb-5 ${s}`} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className={`h-[70px] rounded-xl ${s}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <MarginBottom />
            <NavBarMovile />
        </div>
    );
}

function ProfilePage() {
    const { data: profileData, isLoading } = useProfile();

    // synced arranca true si el caché ya existía al montar (sin lag, sin fetch)
    const synced = useRef(profileData !== null);

    // Estado editable — lazy init desde caché si existe, vacío si es primer fetch
    const [username, setUsername] = useState(() => profileData?.name ?? "");
    const [lastName, setLastName] = useState(() => profileData?.last_name ?? "");
    const [gender, setGender] = useState(() => profileData?.gender ?? "");
    const [phone_number, setPhone_number] = useState(() => profileData?.phone ?? "");
    const [estado, setEstado] = useState(() => profileData?.state ?? "");
    const [municipio, setMunicipio] = useState(() => profileData?.town ?? "");
    const [image_url, setImage_url] = useState(() => profileData?.avatar_url || AVATARS[0]?.avatar_url || "");

    // Sincroniza estado editable cuando llegan los datos por primera vez (sin caché)
    useEffect(() => {
        if (synced.current || !profileData) return;
        synced.current = true;
        setUsername(profileData.name);
        setLastName(profileData.last_name);
        setPhone_number(profileData.phone);
        setGender(profileData.gender);
        setEstado(profileData.state);
        setMunicipio(profileData.town);
        if (profileData.avatar_url) setImage_url(profileData.avatar_url);
    }, [profileData]);

    const [isEditingMain, setIsEditingMain] = useState(false);
    const [tempUsername, setTempUsername] = useState("");
    const [tempLastName, setTempLastName] = useState("");
    const [tempPhone, setTempPhone] = useState("");
    const [tempGender, setTempGender] = useState("");
    const [tempEstado, setTempEstado] = useState("");
    const [tempMunicipio, setTempMunicipio] = useState("");

    const { estados, municipios } = useEstadosMunicipios(tempEstado);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveMainEdits = () => {
        setUsername(tempUsername);
        setLastName(tempLastName);
        setPhone_number(tempPhone);
        setGender(tempGender);
        setEstado(tempEstado);
        setMunicipio(tempMunicipio);
        setIsEditingMain(false);
    };

    const handleCancelMainEdits = () => {
        setTempUsername(username);
        setTempLastName(lastName);
        setTempPhone(phone_number);
        setTempGender(gender);
        setTempEstado(estado);
        setTempMunicipio(municipio);
        setIsEditingMain(false);
    };

    if (isLoading) return <ProfileSkeleton />;

    return (
        <div className="flex flex-col min-h-screen text-base-dark">
            <NavBarDesktop />
            <MarginTop />

            <main className="max-w-[1180px] mx-auto w-full px-8 py-8 pb-16">
                {/* Page head */}
                <div className="mb-6">
                    <h1 className="text-[clamp(26px,3vw,34px)] font-semibold tracking-tight mb-1.5">Mi perfil</h1>
                    <p className="text-[14.5px] opacity-70">Administra tu información personal y revisa tu actividad.</p>
                </div>

                {/* Top grid: hero + subscription */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                    {/* Profile hero card */}
                    <div className="bg-base-hard rounded-[20px] p-8 pt-8 pb-7 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-base-soft/[0.18] pointer-events-none" />
                        <div className="absolute -bottom-12 -left-8 w-28 h-28 rounded-full bg-base-dark/[0.08] pointer-events-none" />

                        <div className="relative z-10 flex items-center gap-6">
                            <div
                                className="relative w-28 h-28 flex-shrink-0 rounded-full border-3 border-base-soft shadow-[0_10px_24px_rgba(71,46,24,0.25)] overflow-hidden cursor-pointer group"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Image src={image_url} alt="Avatar de perfil" width={112} height={112} className="object-cover w-full h-full" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <MdModeEdit className="text-white text-2xl" />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-[22px] font-semibold tracking-tight mb-1">{username} {lastName}</h2>
                                <p className="text-[14px] opacity-75">{profileData?.email ?? ""}</p>
                            </div>
                        </div>

                    </div>

                    {/* Subscription card */}
                    <div className="bg-gradient-to-br from-base-soft to-base rounded-[20px] p-7 relative overflow-hidden border border-base-dark/[0.08] shadow-[0_12px_28px_-10px_rgba(71,46,24,0.18)]">
                        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-base-hard/40 pointer-events-none z-0" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2.5 text-[16px] font-semibold">
                                    <span className="w-8 h-8 rounded-[10px] bg-base flex items-center justify-center flex-shrink-0">
                                        <LuCreditCard size={16} />
                                    </span>
                                    Mi suscripción
                                </div>
                                {profileData?.active_plan?.plan_type === 'Ecogo Pro' ? (
                                    <span className="text-[13px] font-medium text-base-dark/50 px-3.5 py-1.5">Activo</span>
                                ) : (
                                    <Link href="/plans">
                                        <CardEditBtn>Mejorar plan</CardEditBtn>
                                    </Link>
                                )}
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="flex flex-col gap-1 items-center text-center">
                                    <span className="text-[28px] font-semibold tracking-tight">
                                        {profileData?.active_plan?.plan_type ?? "Sin plan"}
                                    </span>
                                    <span className="text-[13.5px] opacity-70">
                                        {profileData?.plan_start && profileData?.plan_end
                                            ? `Período: ${profileData.plan_start} — ${profileData.plan_end}`
                                            : "Sin período activo"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stack: Datos personales + Acerca de mi */}
                <div className="flex flex-col gap-5">

                    {/* Datos personales */}
                    <div className="bg-base-soft rounded-[20px] p-7 border border-base-dark/[0.08] shadow-[0_12px_28px_-10px_rgba(71,46,24,0.18)]">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2.5 text-[16px] font-semibold">
                                <span className="w-8 h-8 rounded-[10px] bg-base flex items-center justify-center flex-shrink-0">
                                    <LuUser size={16} />
                                </span>
                                Datos personales
                            </div>
                            {!isEditingMain && (
                                <CardEditBtn onClick={() => { setTempUsername(username); setTempLastName(lastName); setTempPhone(phone_number); setTempGender(gender); setTempEstado(estado); setTempMunicipio(municipio); setIsEditingMain(true); }}>
                                    <MdModeEdit size={13} />
                                    Editar
                                </CardEditBtn>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FieldRow label="Nombre(s)" value={isEditingMain ? tempUsername : username} editing={isEditingMain} onChange={(e) => setTempUsername(e.target.value)} />
                                <FieldRow label="Apellidos" value={isEditingMain ? tempLastName : lastName} editing={isEditingMain} onChange={(e) => setTempLastName(e.target.value)} />
                                <FieldRow label="Teléfono" value={isEditingMain ? tempPhone : phone_number} editing={isEditingMain} onChange={(e) => setTempPhone(e.target.value)} type="tel" />
                                <FieldRow label="Género" value={isEditingMain ? tempGender : gender} editing={isEditingMain} onChange={(e) => setTempGender(e.target.value)} selectOptions={["Masculino", "Femenino", "Otro", "Prefiero no decir"]} />
                                <FieldRow label="Estado" value={isEditingMain ? tempEstado : estado} empty={!estado} editing={isEditingMain} onChange={(e) => { setTempEstado(e.target.value); setTempMunicipio(""); }} selectOptions={estados} />
                                <FieldRow label="Delegación / Municipio" value={isEditingMain ? tempMunicipio : municipio} empty={!municipio} editing={isEditingMain} onChange={(e) => setTempMunicipio(e.target.value)} selectOptions={municipios} disabled={isEditingMain && !tempEstado} />
                            </div>
                            {isEditingMain && (
                                <div className="flex gap-2">
                                    <button onClick={handleSaveMainEdits} className="bg-base-dark text-base-soft px-5 py-2 rounded-full text-[13px] font-semibold hover:opacity-80 transition cursor-pointer">Guardar</button>
                                    <button onClick={handleCancelMainEdits} className="bg-base-dark/20 text-base-dark px-5 py-2 rounded-full text-[13px] font-semibold hover:opacity-70 transition cursor-pointer">Cancelar</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Escuela objetivo */}
                    <div className="bg-base-soft rounded-[20px] p-7 border border-base-dark/[0.08] shadow-[0_12px_28px_-10px_rgba(71,46,24,0.18)]">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2.5 text-[16px] font-semibold">
                                <span className="w-8 h-8 rounded-[10px] bg-base flex items-center justify-center flex-shrink-0">
                                    <AiTwotoneIdcard size={16} />
                                </span>
                                Mi escuela objetivo
                            </div>
                            <span className="flex items-center gap-1.5 text-[12px] text-base-dark/50 font-medium select-none">
                                <LuLock size={12} />
                                Solo lectura
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoField label="Nombre" value={profileData?.target_school?.name ?? null} icon={<LuUser size={15} />} />
                            <InfoField label="Institución" value={profileData?.target_school?.institution_type ?? null} icon={<LuSchool size={15} />} />
                            <InfoField label="¿Requiere examen?" badge={profileData?.target_school?.requires_exam ?? null} icon={<LuClipboardList size={15} />} />
                            <InfoField label="Ubicación" value={profileData?.target_school?.address ?? null} icon={<LuMapPin size={15} />} />
                        </div>

                        <p className="text-[12px] text-base-dark/45 mt-5 leading-relaxed">
                            Esta información proviene de tu cuenta y no puede modificarse desde aquí.
                        </p>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <AvatarSelector
                    avatars={AVATARS}
                    onSelect={(avatarUrl) => { setImage_url(avatarUrl); setIsModalOpen(false); }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <MarginBottom />
            <NavBarMovile />
        </div>
    );
}

export default ProfilePage;
