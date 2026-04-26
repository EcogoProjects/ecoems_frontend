'use client'

import Link from "next/link";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { signUp } from "@/lib/api";
import { useRouter } from "next/navigation";

function SignUp() {
    const router = useRouter();

    // Estados para controlar la UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);

    const isValidPassword = (password) => {
        return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
    };

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

        if (!isValidPassword(password)) {
            setShowPasswordAlert(true);
            setError("La contraseña debe tener minimo 8 caracteres, una mayuscula y un numero");
            setLoading(false);
            return;
        }

        if (password !== passwordConfirm) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        const { error: authError } = await signUp({ email, password, name, lastName: lastname });

        if (authError) {
            setError(authError);
        } else {
            router.push("/app/email-confirmation");
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

                    <p className={`text-red-500 text-sm text-center mt-2 min-h-[1.25rem] transition-opacity ${error ? 'opacity-100' : 'opacity-0 select-none'}`}>
                        {error ?? ' '}
                    </p>

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
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña"
                                    id="txt_password"
                                    minLength={8}
                                    className="pr-14"
                                    onChange={(e) => {
                                        setPasswordValue(e.target.value);
                                        setShowPasswordAlert(false);
                                    }}
                                    onBlur={(e) => setShowPasswordAlert(!isValidPassword(e.target.value))}
                                    required
                                />
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
                            <p className={`mt-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                                showPasswordAlert
                                    ? 'bg-red-100 text-red-700'
                                    : 'text-text-bottom-soft'
                            }`}>
                                Mínimo 8 caracteres, una mayúscula y un número.
                            </p>
                        </div>
                        <div>
                            <label htmlFor="txt_password_confirm">Confirmar contraseña:</label>
                            <div className="relative">
                                <input
                                    type={showPasswordConfirm ? "text" : "password"}
                                    placeholder="Confirma tu contraseña"
                                    id="txt_password_confirm"
                                    className="pr-14"
                                    required
                                />
                                <button
                                    type="button"
                                    aria-label={showPasswordConfirm ? "Ocultar contrasena" : "Mostrar contrasena"}
                                    aria-pressed={showPasswordConfirm}
                                    onClick={() => setShowPasswordConfirm((value) => !value)}
                                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-base text-base-dark/80 ring-1 ring-base-dark/10 transition-colors hover:cursor-pointer hover:text-base-dark"
                                >
                                    {showPasswordConfirm ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                                </button>
                            </div>
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

                {/* <div className="flex gap-0.5">
                    <p className="text-text-bottom-soft lg:text-base-dark">
                        ¿Ya tienes una cuenta?
                        <Link href="/app/login" className="pl-1.5 hover:cursor-pointer underline hover:text-gray-500">
                            Inicia sesión
                        </Link>
                    </p>
                </div> */}
            </form>
        </div>
    );
}

export default SignUp;
