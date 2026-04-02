function SigIn() {
    return ( 
        <div className="flex flex-col min-h-screen justify-center items-center p-4">
            <div className="bg-base rounded-[18px] p-10 text-standard w-full max-w-[384px] shadow-lg
            [&_label]:font-semibold [&_label]:pl-3 
            [&_input]:bg-base-soft [&_input]:rounded-[10px] [&_input]:p-2.5 [&_input]:w-full
            ">
                <h1 className="text-2xl font-semibold text-center py-10">Regístrate</h1>
                <form className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="txt_email">Email:</label>
                        <input
                        type="email"
                        placeholder="Ingresa tu email"
                        id="txt_email"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="txt_name">Tú nombre:</label>
                        <input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        id="txt_name"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="txt_password">Contraseña:</label>
                        <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        id="txt_password"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="txt_password_confirm">Confirmar contraseña:</label>
                        <input
                        type="password"
                        placeholder="Confirma tu contraseña"
                        id="txt_password_confirm"
                        ></input>

                    </div>
                
                
                </form>
            </div> 
        </div>
    );
}

export default SigIn;