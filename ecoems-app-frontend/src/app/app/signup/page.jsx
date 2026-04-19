'use client'

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Asegúrate de tener este archivo creado
import { useRouter } from "next/navigation";

function SignUp() {
    const router = useRouter();
    const supabase = createClient();

    // Estados para controlar la UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Extraemos los datos del formulario usando los IDs o nombres
        const email = e.target.txt_email.value;
        const name = e.target.txt_name.value;
        const lastname = e.target.txt_lastname.value;
        const password = e.target.txt_password.value;
        const passwordConfirm = e.target.txt_password_confirm.value;

        // Validación simple
        if (password !== passwordConfirm) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        // Registro en Supabase
        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name,
                    last_name: lastname,
                }
            }
        });

        if (authError) {
            setError(authError.message);
        } else {
            alert("¡Revisa tu correo para confirmar tu cuenta!");
            router.push("/app/login");
        }

        setLoading(false);
    };

    return ( 
        <div className="flex sm:flex-col min-h-screen justify-center items-center p-4 
        lg:items-end
        lg:bg-[url('/backgrounds/login-bg-long.png')] lg:bg-cover lg:bg-center 
        lg:pr-15 xl:pr-25">
            {/* Agregamos el onSubmit aquí */}
            <form onSubmit={handleSignUp} className="flex flex-col gap-7.5 items-center">
                <div className="bg-base rounded-box-standard p-10 text-standard  max-w-[344px] w-full 
                lg:bg-transparent
                xl:max-w-[500px]
                [&_label]:font-semibold [&_label]:pl-3 
                [&_input]:bg-base-soft [&_input]:rounded-[10px] [&_input]:p-2.5 [&_input]:w-full
                ">
                    <h1 className="text-2xl font-semibold text-center ">Regístrate</h1>
                    
                    {/* Mostrar errores si existen */}
                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                    <div className="flex flex-col gap-3 mt-4">
                        <div>
                            <label htmlFor="txt_email">Email:</label>
                            <input
                                type="email"
                                placeholder="Ingresa tu email"
                                id="txt_email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="txt_name">Tú nombre:</label>
                            <input
                                type="text"
                                placeholder="Ingresa tu nombre/s"
                                id="txt_name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="txt_lastname">Tús apellidos:</label>
                            <input
                                type="text"
                                placeholder="Ingresa tus apellidos"
                                id="txt_lastname"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="txt_password">Contraseña:</label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                id="txt_password"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="txt_password_confirm">Confirmar contraseña:</label>
                            <input
                                type="password"
                                placeholder="Confirma tu contraseña"
                                id="txt_password_confirm"
                                required
                            />
                        </div>
                    </div>
                </div> 

                <button 
                    className="bg-base-dark text-white text-lg font-semibold rounded-[23px] p-1.5 pl-4.5 pr-4.5 hover:cursor-pointer disabled:opacity-50" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registrando..." : "Registrarse"}
                </button>

                <div className="flex gap-0.5">
                   <p className="text-text-bottom-soft lg:text-base-dark">
                        ¿Ya tienes una cuenta? 
                        <Link href="/app/login" className="pl-1.5 hover:cursor-pointer underline hover:text-gray-500">
                            Inicia sesión
                        </Link>
                    </p> 
                </div>
            </form>
        </div>
    );
}

export default SignUp;