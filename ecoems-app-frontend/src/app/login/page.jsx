import Link from "next/link";
import { FaGoogle,FaFacebook } from "react-icons/fa";
function SigIn() {
    return ( 
        <div className="flex flex-col min-h-screen justify-center items-center p-4">
            <form action="" className="flex flex-col gap-7.5 items-center justify-center">
                <div className="bg-base rounded-box-standard p-10 text-standard  w-[344px]  shadow-lg
                [&_label]:font-semibold [&_label]:pl-3 
                [&_input]:bg-base-soft [&_input]:rounded-[10px] [&_input]:p-2.5 [&_input]:w-full
                ">
                    <h1 className="text-2xl font-semibold text-center mb-3">Inicia sesión</h1>
                    <div className="flex flex-col gap-3">
                        <div>
                            <input
                            type="email"
                            placeholder="Ingresa tu email"
                            id="txt_email"
                            required
                            ></input>
                        </div>
                        <div>
                            <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            id="txt_password"
                            required
                            ></input>
                        </div> 
                    </div>
                    {/*Línea de separacion*/}
                    <div className="flex items-center w-full">
                        <hr className="border-t border-base-dark  border-2 my-6 w-2/4" />
                        <span className="mx-4 text-base-dark">ó</span>
                        <hr className="border-t border-base-dark  border-2 my-6 w-2/4" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="bg-base-soft rounded-2xl p-2.5 flex items-center justify-center gap-3 hover:cursor-pointer hover:opacity-70">
                            <FaGoogle size={20}/>
                            <p>Continuar con Google</p>
                        </div>
                        <div className="bg-base-soft rounded-2xl p-2.5 flex items-center justify-center gap-3 hover:cursor-pointer hover:opacity-70">
                            <FaFacebook size={20}/>
                            <p>Continuar con Facebook</p>
                        </div>
                    </div>
                    
                </div> 
                <button className="bg-base-dark text-white text-lg font-semibold rounded-[23px] p-1.5 pl-4.5 pr-4.5 hover:cursor-pointer" 
                type="submit">
                    Iniciar sesión
                </button>
                <div className="flex gap-0.5">
                   <p className="text-text-bottom-soft ">
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

export default SigIn;