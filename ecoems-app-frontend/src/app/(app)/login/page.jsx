'use client'

import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState, Suspense } from "react";
import { signInWithEmail, signInWithGoogle } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const safeRedirect = redirectTo?.startsWith('/') ? redirectTo : '/home';

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const email = e.target.txt_email.value;
        const password = e.target.txt_password.value;

        const { error: signInError } = await signInWithEmail(email, password);

        if (signInError) {
            setError(signInError);
            setLoading(false);
        } else {
            router.push(safeRedirect);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        const { error } = await signInWithGoogle(`${window.location.origin}/home`);
        if (error) setError(error);
    };

    return ( 
        <div className="flex sm:flex-col min-h-screen justify-center items-center p-4 
         md:items-end
        md:bg-[url('/backgrounds/login-bg-long.png')] md:bg-cover md:bg-center 
        md:pr-10 lg:pr-15 xl:pr-21">
            <form onSubmit={handleEmailSignIn} className="flex flex-col gap-7.5 items-center justify-center">
                <div className="bg-base rounded-box-standard p-10 text-standard  max-w-[344px] w-full 
                md:bg-transparent
                xl:max-w-[500px] xl:w-[500px]
                [&_label]:font-semibold [&_label]:pl-3 
                [&_input]:bg-base-soft [&_input]:rounded-[10px] [&_input]:p-2.5 [&_input]:w-full
                ">
                    <h1 className="text-2xl font-semibold text-center mb-3">Inicia sesión</h1>
                    
                    {/* Mensaje de error */}
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                    <div className="flex flex-col gap-3">
                        <div>
                            <input
                            type="email"
                            placeholder="Ingresa tu email"
                            id="txt_email"
                            required
                            ></input>
                        </div>
                        <div className="relative">
                             <input
                            type={showPassword ? "text" : "password"}
                             placeholder="Ingresa tu contraseña"
                             id="txt_password"
                             className="pr-14"
                             required
                             ></input>
                            <button
                                type="button"
                                aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                                aria-pressed={showPassword}
                                onClick={() => setShowPassword((value) => !value)}
                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-base text-base-dark/80 ring-1 ring-base-dark/10 transition-colors hover:cursor-pointer hover:text-base-dark"
                            >
                                {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                            </button>
                         </div> 
                    </div>
                    {/*Línea de separacion*/}
                    <div className="flex items-center w-full">
                        <hr className="border-t border-base-dark  border-2 my-6 w-2/4" />
                        <span className="mx-4 text-base-dark">ó</span>
                        <hr className="border-t border-base-dark  border-2 my-6 w-2/4" />
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* Agregamos el evento onClick aquí */}
                        <div 
                            onClick={handleGoogleSignIn}
                            className="bg-base-soft rounded-2xl p-2.5 flex items-center justify-center gap-3 hover:cursor-pointer hover:opacity-70 transition-opacity"
                        >
                            <FaGoogle size={20}/>
                            <p>Continuar con Google</p>
                        </div>
                    </div>
                    
                </div> 
                <button 
                    className="bg-base-dark text-white text-lg font-semibold rounded-[23px] p-1.5 pl-4.5 pr-4.5 hover:cursor-pointer disabled:opacity-50" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Iniciando..." : "Iniciar sesión"}
                </button>
                <div className="flex gap-0.5">
                   <p className="text-text-bottom-soft lg:text-base-dark">
                        ¿Aún no te has registrado? 
                    <Link href="/signup" className="pl-1.5 hover:cursor-pointer underline hover:text-gray-500">
                        Regístrate
                    </Link>
                </p> 
                </div>
            </form>
        </div>
    );
}

export default function SignIn() {
    return (
        <Suspense fallback={null}>
            <SignInForm />
        </Suspense>
    );
}
