'use client'

import { useState, useEffect, useRef, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import avatarsData from '@/lib/data/avatars.json';
import { useEstadosMunicipios } from '@/hooks/useEstadosMunicipios';
import { api, patchUserMe, getUserBasicInfo } from '@/lib/api';
import { useUserStore } from '@/store/userStore';
import { setOnboardingCookie } from '@/utils/onboardingCookie';

const BTN_PRIMARY = "inline-flex items-center justify-center gap-2.5 text-[14.5px] font-medium px-6 py-[13px] rounded-full border-[1.5px] border-transparent bg-base-dark text-base-soft transition-all duration-150 hover:-translate-y-px hover:bg-[#5a3a1f] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer";
const BTN_SECONDARY = "inline-flex items-center justify-center gap-2.5 text-[14.5px] font-medium px-6 py-[13px] rounded-full border-[1.5px] border-base-dark bg-transparent text-base-dark transition-all duration-150 hover:bg-base-dark hover:text-base-soft cursor-pointer";

// ─── Stepper ─────────────────────────────────────────────────────────────────

function Stepper({ step }) {
  const labels = ["Bienvenida", "Avatar", "Tus datos"];
  return (
    <div className="flex items-center gap-1.5 mb-9">
      {labels.map((label, i) => {
        const idx = i + 1;
        const isDone = idx < step;
        const isActive = idx === step;
        const isHighlighted = isDone || isActive;
        return (
          <Fragment key={i}>
            <div className={`flex items-center gap-2.5 text-[13px] font-medium text-base-dark ${isHighlighted ? 'opacity-100' : 'opacity-45'}`}>
              <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0 border-[1.5px] ${isHighlighted ? 'bg-base-dark border-base-dark text-base-soft' : 'bg-base border-base-hard text-base-dark'} ${isActive ? 'shadow-[0_0_0_4px_rgba(71,46,24,0.12)]' : ''}`}>
                {isDone ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12 L10 17 L19 7" stroke="#FFF9E4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span>{idx}</span>
                )}
              </div>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < labels.length - 1 && (
              <div className={`flex-1 h-[1.5px] mx-1 rounded-[1px] ${isDone ? 'bg-base-dark opacity-100' : 'bg-base-hard opacity-35'}`} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

// ─── Step 1: Bienvenida ───────────────────────────────────────────────────────

function StepWelcome({ name, onNext }) {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-start gap-4 mb-6">
        <div className="w-24 h-24 rounded-full bg-base flex items-center justify-center overflow-hidden border-[1.5px] border-base-dark/10 shadow-[0_12px_28px_-10px_rgba(71,46,24,0.18)]">
          <img src="/assets/logo.png" alt="" className="w-[78%] h-[78%] object-contain" />
        </div>
      </div>

      <h1 className="text-[clamp(28px,3.6vw,38px)] font-semibold tracking-tight leading-[1.05] mb-3 text-balance">
        Hola, <span className="text-base-hard">{name}</span>
      </h1>
      <p className="text-[15.5px] leading-[1.55] mb-7 opacity-[0.78] max-w-[520px] text-pretty">
        Para dar inicio a tu experiencia en Ecogo, necesitamos que registres
        algunos datos. Solo tomará un par de minutos.
      </p>

      <ul className="list-none p-0 mb-8 flex flex-col gap-2.5">
        {[
          "Elige una imagen de perfil",
          "Completa tus datos personales",
          "Listo para empezar",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3 text-[14.5px] text-base-dark">
            <span className="w-[22px] h-[22px] rounded-full bg-base flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 12 L10 17 L19 7" stroke="#472E18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="flex justify-end gap-3 mt-2 pt-6 border-t border-base-dark/[8%]">
        <button className={BTN_PRIMARY} onClick={onNext}>
          Comenzar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12 H 19 M 13 6 L 19 12 L 13 18" stroke="#FFF9E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Avatar ───────────────────────────────────────────────────────────

const PER_PAGE = 3;

function StepAvatar({ avatar, setAvatar, onNext, onBack }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(AVATARS.length / PER_PAGE);
  const visible = AVATARS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="animate-fade-in">
      <h1 className="text-[clamp(28px,3.6vw,38px)] font-semibold tracking-tight leading-[1.05] mb-3 text-balance">
        Elige tu avatar
      </h1>
      <p className="text-[15.5px] leading-[1.55] mb-7 opacity-[0.78] max-w-[520px]">
        Escoge una imagen que te represente. Podrás cambiarla en cualquier momento.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          className={`flex-shrink-0 w-9 h-9 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-150 ${page === 0
            ? 'border-base-dark/20 opacity-30 cursor-not-allowed'
            : 'border-base-dark hover:bg-base cursor-pointer'
            }`}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          aria-label="Avatares anteriores"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 6 L9 12 L15 18" stroke="#472E18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex flex-1 justify-center gap-6">
          {visible.map((a) => (
            <button
              key={a.id}
              type="button"
              className="relative bg-transparent border-none p-1 cursor-pointer rounded-full transition-transform duration-150 hover:-translate-y-0.5"
              onClick={() => setAvatar(a.id)}
              aria-pressed={avatar === a.id}
            >
              <span
                className={`block w-[88px] h-[88px] rounded-full border-2 transition-all duration-150 overflow-hidden ${avatar === a.id
                  ? 'border-base-dark shadow-[0_0_0_3px_var(--base-soft-color),0_0_0_5px_var(--base-dark-color),0_8px_18px_rgba(71,46,24,0.2)]'
                  : 'border-transparent'
                  }`}
              >
                <img src={a.avatar_url} alt={a.name} className="w-full h-full object-cover" />
              </span>
              {avatar === a.id && (
                <span
                  className="absolute bottom-0 right-0 w-[22px] h-[22px] rounded-full bg-base-dark flex items-center justify-center border-2 border-base-soft"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12 L10 17 L19 7" stroke="#FFF9E4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`flex-shrink-0 w-9 h-9 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-150 ${page === totalPages - 1
            ? 'border-base-dark/20 opacity-30 cursor-not-allowed'
            : 'border-base-dark hover:bg-base cursor-pointer'
            }`}
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          aria-label="Siguientes avatares"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 6 L15 12 L9 18" stroke="#472E18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            aria-label={`Página ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${i === page ? 'w-5 bg-base-dark' : 'w-2 bg-base-dark/30 hover:bg-base-dark/50'
              }`}
          />
        ))}
      </div>

      <p className="text-[13px] opacity-65 mb-[22px]">
        {avatar ? "¡Buena elección! Puedes continuar." : "Selecciona un avatar para continuar."}
      </p>

      <div className="flex justify-end gap-3 mt-2 pt-6 border-t border-base-dark/[8%] max-sm:flex-col-reverse">
        <button className={BTN_SECONDARY} onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12 H 5 M 11 6 L 5 12 L 11 18" stroke="#472E18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Atrás
        </button>
        <button className={BTN_PRIMARY} onClick={onNext} disabled={!avatar}>
          Siguiente
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12 H 19 M 13 6 L 19 12 L 13 18" stroke="#FFF9E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Selector de Escuelas con búsqueda ─────────────────────────────────────────────────────

function Select({ label, value, onChange, options, placeholder, disabled, searchable }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  const normalizeText = (text) =>
    text
      ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      : "";

  const filteredOptions = searchQuery
    ? options.filter((opt) =>
      normalizeText(opt).includes(normalizeText(searchQuery))
    )
    : options;

  const Trigger = open && searchable ? 'div' : 'button';

  return (
    <div className={`flex flex-col gap-1.5 relative ${disabled ? 'opacity-55' : ''}`} ref={ref}>
      <label className="text-[13px] font-medium text-base-dark tracking-[0.01em]">{label}</label>
      <Trigger
        type={Trigger === 'button' ? 'button' : undefined}
        className={`flex items-center justify-between gap-2 w-full border-[1.5px] rounded-[12px] px-3.5 py-3 text-[14.5px] text-base-dark text-left transition-all duration-150 ${open
          ? 'border-base-dark bg-base-soft'
          : `border-transparent bg-base-extra-light ${!disabled ? 'hover:bg-base' : ''}`
          } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={Trigger === 'button' ? (() => !disabled && setOpen((v) => !v)) : undefined}
        disabled={Trigger === 'button' ? disabled : undefined}
      >
        {open && searchable ? (
          <input
            type="text"
            className="flex-1 bg-transparent border-none text-[14.5px] text-base-dark outline-none min-w-0 p-0 m-0 placeholder:text-base-dark/40"
            placeholder={value || placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <span className={`flex-1 whitespace-nowrap overflow-hidden text-ellipsis ${!value ? 'opacity-50' : ''}`}>
            {value || placeholder}
          </span>
        )}
        <svg
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          onClick={Trigger === 'div' ? (e) => { e.stopPropagation(); setOpen(false); } : undefined}
        >
          <path d="M6 9 L12 15 L18 9" stroke="#472E18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Trigger>
      {open && (
        <div
          className="absolute top-[calc(100%+6px)] left-0 right-0 bg-base-soft border border-base-dark/15 rounded-[12px] p-1.5 max-h-60 overflow-y-auto z-50 shadow-[0_12px_32px_-8px_rgba(71,46,24,0.25)]"
          role="listbox"
        >
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-[14px] text-base-dark opacity-60 text-center">
              {searchQuery ? "No se encontraron similiudes" : "Sin opciones disponibles"}
            </div>
          ) : (
            filteredOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`flex items-center justify-between w-full border-none px-3 py-2.5 rounded-lg text-[14px] text-base-dark cursor-pointer text-left transition-colors ${opt === value ? 'bg-base font-medium' : 'bg-transparent hover:bg-base'
                  }`}
                onClick={() => { onChange(opt); setOpen(false); }}
                role="option"
                aria-selected={opt === value}
              >
                {opt}
                {opt === value && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12 L10 17 L19 7" stroke="#472E18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Step 3: Formulario ───────────────────────────────────────────────────────

function StepForm({ form, setForm, schools, schoolsLoading, submitLoading, submitError, onBack, onSubmit }) {
  const { estados, municipios } = useEstadosMunicipios(form.estado);
  const schoolOptions = schools.map((s) => s.name);

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setEstado(estado) {
    setForm((f) => ({ ...f, estado, municipio: "" }));
  }

  function handlePhone(e) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = digits;
    if (digits.length > 6) {
      formatted = `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
    } else if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)} ${digits.slice(2)}`;
    }
    setField("telefono", formatted);
  }

  const phoneDigits = form.telefono.replace(/\D/g, "");
  const phoneError = phoneDigits.length > 0 && phoneDigits.length !== 10;
  const phoneValid = phoneDigits.length === 0 || phoneDigits.length === 10;
  const isValid = form.estado && form.municipio && form.genero && form.escuela && phoneValid;

  return (
    <div className="animate-fade-in">
      <h1 className="text-[clamp(28px,3.6vw,38px)] font-semibold tracking-tight leading-[1.05] mb-3 text-balance">
        Cuéntanos sobre ti
      </h1>
      <p className="text-[15.5px] leading-[1.55] mb-7 opacity-[0.78] max-w-[520px] text-pretty">
        Esta información nos ayuda a personalizar tu experiencia y conectarte
        con tu comunidad.
      </p>

      <div className="grid grid-cols-2 gap-[18px] mb-7 max-sm:grid-cols-1">
        <Select
          label="Estado"
          value={form.estado}
          onChange={setEstado}
          options={estados}
          placeholder="Selecciona tu estado"
        />
        <Select
          label="Delegación o municipio"
          value={form.municipio}
          onChange={(v) => setField("municipio", v)}
          options={municipios}
          placeholder={form.estado ? "Selecciona tu municipio" : "Primero elige un estado"}
          disabled={!form.estado}
        />
        <Select
          label="Género"
          value={form.genero}
          onChange={(v) => setField("genero", v)}
          options={["Masculino", "Femenino", "Otro"]}
          placeholder="Selecciona tu género"
        />

        <div className="flex flex-col gap-1.5 relative">
          <label className="text-[13px] font-medium text-base-dark tracking-[0.01em]">
            Teléfono{" "}
            <span className="font-normal opacity-55 text-[12.5px]">(opcional)</span>
          </label>
          <div className={`flex items-stretch bg-base-extra-light border-[1.5px] rounded-[12px] overflow-hidden transition-colors duration-150 focus-within:border-base-dark focus-within:bg-base-soft ${phoneError ? 'border-[#B25533]' : 'border-transparent'}`}>
            <span className="flex items-center gap-2 px-3.5 py-3 bg-base text-[14px] font-medium text-base-dark border-r border-base-dark/10 flex-shrink-0">
              <span aria-hidden="true">🇲🇽</span>
              +52
            </span>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="55 1234 5678"
              value={form.telefono}
              onChange={handlePhone}
              className="flex-1 border-none bg-transparent px-3.5 py-3 text-[14.5px] text-base-dark outline-none min-w-0 placeholder:text-base-dark/40"
            />
          </div>
          <p className={`h-11 overflow-hidden text-[12px] text-[#B25533] mt-0.5 transition-opacity ${phoneError ? 'opacity-100' : 'opacity-0 select-none'}`}>
            Ingresa los 10 dígitos completos.
          </p>
        </div>

        <div className="col-span-full">
          <Select
            label="Escuela a la que quiero ingresar"
            value={form.escuela}
            onChange={(v) => setField("escuela", v)}
            options={schoolOptions}
            placeholder={schoolsLoading ? "Cargando escuelas…" : "Selecciona tu escuela"}
            disabled={schoolsLoading}
            searchable={true}
          />
        </div>
      </div>

      <p className={`h-9 overflow-hidden text-[13px] text-[#B25533] text-center transition-opacity ${submitError ? 'opacity-100' : 'opacity-0 select-none'}`}>
        {submitError ?? ' '}
      </p>

      <div className="flex justify-end gap-3 pt-6 border-t border-base-dark/[8%] max-sm:flex-col-reverse">
        <button className={BTN_SECONDARY} onClick={onBack} disabled={submitLoading}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12 H 5 M 11 6 L 5 12 L 11 18" stroke="#472E18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Atrás
        </button>
        <button className={BTN_PRIMARY} onClick={onSubmit} disabled={!isValid || submitLoading}>
          {submitLoading ? 'Guardando...' : 'Finalizar registro'}
          {!submitLoading && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12 L10 17 L19 7" stroke="#FFF9E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Completado ───────────────────────────────────────────────────────

function StepDone({ avatar, name }) {
  const router = useRouter();
  const av = AVATARS.find((a) => a.id === avatar);

  return (
    <div className="animate-fade-in text-center py-4">
      <div className="relative inline-block mx-auto mb-7">
        <span className="flex w-[110px] h-[110px] rounded-full overflow-hidden border-[1.5px] border-base-dark shadow-[0_12px_28px_-10px_rgba(71,46,24,0.18)]">
          {av && <img src={av.avatar_url} alt={av.name} className="w-full h-full object-cover" />}
        </span>
        <span className="absolute -right-1.5 -bottom-1.5 w-10 h-10 rounded-full bg-base-dark border-[3px] border-base-soft flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12 L10 17 L19 7" stroke="#FFF9E4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <h1 className="text-[clamp(28px,3.6vw,38px)] font-semibold tracking-tight leading-[1.05] mb-3 text-balance">
        ¡Bienvenido/a, <span className="text-base-hard">{name}</span>!
      </h1>
      <p className="text-[15.5px] leading-[1.55] mb-7 opacity-[0.78] mx-auto max-w-[520px] text-pretty">
        Tu perfil está listo. Ya puedes explorar todas las herramientas y
        recursos que hemos preparado para ti.
      </p>

      <div className="flex justify-center gap-3 pt-4">
        <button className={BTN_PRIMARY} onClick={() => router.push('/home')}>
          Ir al home
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12 H 19 M 13 6 L 19 12 L 13 18" stroke="#FFF9E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const AVATARS = avatarsData.avatars;

export default function InitialRegistration() {
  const name = useUserStore((s) => s.name);
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [form, setForm] = useState({
    estado: "",
    municipio: "",
    genero: "",
    telefono: "",
    escuela: "",
  });
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    api.get('/schools').then(({ data }) => {
      if (data) setSchools(data);
    }).finally(() => setSchoolsLoading(false));
  }, []);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    setSubmitError(null);

    const av = AVATARS.find((a) => a.id === avatar);
    const school = schools.find((s) => s.name === form.escuela);
    const phone = form.telefono.replace(/\D/g, '') || undefined;

    const { error } = await patchUserMe({
      avatar_url: av?.avatar_url ?? null,
      state: form.estado,
      town: form.municipio,
      target_school_id: school?.school_id ?? null,
      gender: form.genero,
      ...(phone && { phone }),
      onboarding_completed: true,
    });

    if (error) {
      setSubmitError('No se pudo guardar tu información. Inténtalo de nuevo.');
      setSubmitLoading(false);
    } else {
      setOnboardingCookie();
      setStep(4);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 relative overflow-hidden bg-base-extra-light text-base-dark">
      {/* Decorativos botánicos */}
      <svg className="absolute pointer-events-none z-0 -top-10 -left-10 opacity-40" width="280" height="280" viewBox="0 0 280 280" fill="none" aria-hidden="true">
        <path d="M40 240 Q 60 160, 120 110 Q 170 75, 220 50" stroke="#472E18" strokeWidth="1.2" fill="none" opacity="0.5" />
        <ellipse cx="80" cy="190" rx="18" ry="9" fill="#CDAD75" transform="rotate(-30 80 190)" opacity="0.6" />
        <ellipse cx="135" cy="135" rx="20" ry="10" fill="#472E18" transform="rotate(35 135 135)" opacity="0.4" />
        <ellipse cx="195" cy="80" rx="15" ry="7" fill="#CDAD75" transform="rotate(-15 195 80)" opacity="0.7" />
      </svg>
      <svg className="absolute pointer-events-none z-0 -bottom-[60px] -right-[60px] opacity-[0.32] rotate-180" width="320" height="320" viewBox="0 0 320 320" fill="none" aria-hidden="true">
        <path d="M40 280 Q 90 200, 160 150 Q 220 110, 280 70" stroke="#472E18" strokeWidth="1.2" fill="none" opacity="0.4" />
        <ellipse cx="100" cy="210" rx="22" ry="11" fill="#CDAD75" transform="rotate(-25 100 210)" opacity="0.55" />
        <ellipse cx="180" cy="140" rx="18" ry="9" fill="#472E18" transform="rotate(40 180 140)" opacity="0.35" />
      </svg>

      <header className="w-full max-w-[720px] mx-auto mb-6 flex justify-center items-center relative z-[2]">
        <span className="text-[18px] font-semibold tracking-[0.14em] uppercase opacity-85">Registro</span>
      </header>

      <main className="flex-1 flex items-start justify-center relative z-[2] py-2 pb-8">
        <div className="w-full max-w-[720px] bg-base-soft rounded-3xl p-9 px-11 border border-base-dark/10 shadow-[0_24px_50px_-20px_rgba(71,46,24,0.25)] max-sm:p-6 max-sm:px-5">
          {step <= 3 && <Stepper step={step} />}
          {step === 1 && <StepWelcome name={name} onNext={() => setStep(2)} />}
          {step === 2 && (
            <StepAvatar
              avatar={avatar}
              setAvatar={setAvatar}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepForm
              form={form}
              setForm={setForm}
              schools={schools}
              schoolsLoading={schoolsLoading}
              submitLoading={submitLoading}
              submitError={submitError}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
            />
          )}
          {step === 4 && <StepDone avatar={avatar} name={name} />}
        </div>
      </main>
    </div>
  );
}
