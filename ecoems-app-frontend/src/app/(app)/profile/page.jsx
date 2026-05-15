"use client"
import NavBarDesktop from "@/components/NavBarDesktop";
import NavBarMovile from "@/components/NavBarMovile";
import MarginTop from "@/components/MarginTop";
import MarginBottom from "@/components/MarginBottom";
import AvatarSelector from "@/components/profilepage/AvatarSelector";
import { MdModeEdit } from "react-icons/md";
import { LuCreditCard, LuUser, LuMapPin, LuSchool, LuClipboardList, LuLock } from "react-icons/lu";
import { AiTwotoneIdcard } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEstadosMunicipios } from "@/hooks/useEstadosMunicipios";
import { useProfile } from "@/hooks/useProfile";
import { useUpdateAvatar } from "@/hooks/useUpdateAvatar";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
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
    const { isAvatarLoading, patchAvatar } = useUpdateAvatar();
    const { patchProfile, isProfileLoading } = useUpdateProfile();

    const [isEditingMain, setIsEditingMain] = useState(false);
    const [form, setForm] = useState({
        name:      profileData?.name      ?? '',
        last_name: profileData?.last_name ?? '',
        phone:     profileData?.phone     ?? '',
        gender:    profileData?.gender    ?? '',
        state:     profileData?.state     ?? '',
        town:      profileData?.town      ?? '',
    });
    const [saveError, setSaveError] = useState(null);

    const { estados, municipios } = useEstadosMunicipios(form.state);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const validateForm = () => {
        if (!form.name.trim())      return 'El nombre es obligatorio.';
        if (!form.last_name.trim()) return 'Los apellidos son obligatorios.';
        if (!form.phone.trim())     return 'El teléfono es obligatorio.';
        if (!form.gender)           return 'El género es obligatorio.';
        if (!form.state)            return 'El estado es obligatorio.';
        if (!form.town)             return 'La delegación / municipio es obligatoria.';
        return null;
    };

    const handleSave = async () => {
        if (!hasChanges) return;
        const validationError = validateForm();
        if (validationError) { setSaveError(validationError); return; }
        setSaveError(null);
        const { error } = await patchProfile(changed);
        if (error) { setSaveError(error); return; }
        setIsEditingMain(false);
    };

    const handleCancelMainEdits = () => {
        setForm({
            name:      profileData?.name      ?? '',
            last_name: profileData?.last_name ?? '',
            phone:     profileData?.phone     ?? '',
            gender:    profileData?.gender    ?? '',
            state:     profileData?.state     ?? '',
            town:      profileData?.town      ?? '',
        });
        setSaveError(null);
        setIsEditingMain(false);
    };

    const changed = Object.fromEntries(
        Object.entries(form).filter(([key, value]) => value !== profileData?.[key])
    );
    const hasChanges = Object.keys(changed).length > 0;

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
                                <Image src={profileData?.avatar_url || AVATARS[0]?.avatar_url} alt="Avatar de perfil" width={112} height={112} className="object-cover w-full h-full" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <MdModeEdit className="text-white text-2xl" />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-[22px] font-semibold tracking-tight mb-1">{profileData?.name} {profileData?.last_name}</h2>
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
                                <CardEditBtn onClick={() => { setForm({ name: profileData?.name ?? '', last_name: profileData?.last_name ?? '', phone: profileData?.phone ?? '', gender: profileData?.gender ?? '', state: profileData?.state ?? '', town: profileData?.town ?? '' }); setIsEditingMain(true); }}>
                                    <MdModeEdit size={13} />
                                    Editar
                                </CardEditBtn>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FieldRow label="Nombre(s)" value={isEditingMain ? form.name : profileData?.name} editing={isEditingMain} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value.slice(0, 100) }))} />
                                <FieldRow label="Apellidos" value={isEditingMain ? form.last_name : profileData?.last_name} editing={isEditingMain} onChange={(e) => setForm(prev => ({ ...prev, last_name: e.target.value.slice(0, 100) }))} />
                                <FieldRow label="Teléfono" value={isEditingMain ? form.phone : profileData?.phone} editing={isEditingMain} onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))} type="tel" />
                                <FieldRow label="Género" value={isEditingMain ? form.gender : profileData?.gender} editing={isEditingMain} onChange={(e) => setForm(prev => ({ ...prev, gender: e.target.value }))} selectOptions={["Masculino", "Femenino", "Otro", "Prefiero no decir"]} />
                                <FieldRow label="Estado" value={isEditingMain ? form.state : profileData?.state} empty={!profileData?.state} editing={isEditingMain} onChange={(e) => setForm(prev => ({ ...prev, state: e.target.value, town: '' }))} selectOptions={estados} />
                                <FieldRow label="Delegación / Municipio" value={isEditingMain ? form.town : profileData?.town} empty={!profileData?.town} editing={isEditingMain} onChange={(e) => setForm(prev => ({ ...prev, town: e.target.value }))} selectOptions={municipios} disabled={isEditingMain && !form.state} />
                            </div>
                            {isEditingMain && (
                                <div className="flex flex-col gap-2">
                                    <p className={`h-11 overflow-hidden text-sm transition-opacity text-red-600 ${saveError ? 'opacity-100' : 'opacity-0 select-none'}`}>
                                        {saveError ?? ' '}
                                    </p>
                                    <div className="flex gap-2">
                                        <button onClick={handleSave} disabled={!hasChanges || isProfileLoading} className="bg-base-dark text-base-soft px-5 py-2 rounded-full text-[13px] font-semibold hover:opacity-80 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
                                            {isProfileLoading ? 'Guardando...' : 'Guardar'}
                                        </button>
                                        <button onClick={handleCancelMainEdits} className="bg-base-dark/20 text-base-dark px-5 py-2 rounded-full text-[13px] font-semibold hover:opacity-70 transition cursor-pointer">Cancelar</button>
                                    </div>
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
                    onSelect={async (avatarUrl) => {
                        const { error } = await patchAvatar(avatarUrl);
                        if (!error) setIsModalOpen(false);
                    }}
                    onClose={() => setIsModalOpen(false)}
                    isSaving={isAvatarLoading}
                />
            )}
            <MarginBottom />
            <NavBarMovile />
        </div>
    );
}

export default ProfilePage;
