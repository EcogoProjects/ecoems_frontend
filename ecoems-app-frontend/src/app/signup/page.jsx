import Link from "next/link";
function SignUp() {
    return ( 
        <div className="flex flex-col min-h-screen justify-center items-center p-4">
            <form action="" className="flex flex-col gap-7.5 items-center">
                <div className="bg-base rounded-box-standard p-10 text-standard  w-[344px]  shadow-lg
                [&_label]:font-semibold [&_label]:pl-3 
                [&_input]:bg-base-soft [&_input]:rounded-[10px] [&_input]:p-2.5 [&_input]:w-full
                ">
                    <h1 className="text-2xl font-semibold text-center ">Regístrate</h1>
                    <div className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="txt_email">Email:</label>
                            <input
                            type="email"
                            placeholder="Ingresa tu email"
                            id="txt_email"
                            required
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="txt_name">Tú nombre:</label>
                            <input
                            type="text"
                            placeholder="Ingresa tu nombre"
                            id="txt_name"
                            required
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="txt_password">Contraseña:</label>
                            <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            id="txt_password"
                            required
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="txt_password_confirm">Confirmar contraseña:</label>
                            <input
                            type="password"
                            placeholder="Confirma tu contraseña"
                            id="txt_password_confirm"
                            required
                            ></input>

                        </div>
                    </div>
                </div> 
                <button className="bg-base-dark text-white text-lg font-semibold rounded-[23px] p-1.5 pl-4.5 pr-4.5 hover:cursor-pointer" 
                type="submit">
                    Registrarse
                </button>
                <div className="flex gap-0.5">
                   <p className="text-text-bottom-soft ">
                        ¿Ya tienes una cuenta? 
                    <Link href="/login" className="pl-1.5 hover:cursor-pointer underline hover:text-gray-500">
                        Inicia sesión
                    </Link>
                </p> 
                </div>
                
                
            </form>
            
        </div>
    );
}

export default SignUp;