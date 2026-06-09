import PlansTable from "./PlansTable";

export default function CTABanner() {
    const ecogoEndDate = "18 / 12 / 2026";
    return (
        <section className="pt-0 pb-16 w-full flex">
            <div className="w-full  mx-auto p-4 py-10 text-center bg-[#3D281F] text-[#FFF9E4] flex flex-col gap-2 items-center justify-center ">
                <span className="bg-[#CDAD75] text-[#3D281F] uppercase font-semibold text-sm py-2 px-4 rounded-full">
                    Únete a Ecogo
                </span>
                <h2 className="text-4xl font-bold mb-4">¿Listo para comenzar?</h2>
                <p className="text-lg text-white/70  mb-6">
                    Únete a la comunidad ECOGO y prepárate para tu examen con nuestros planes disponibles.
                </p>
                <PlansTable />
                <p className="text-sm text-white/70  mt-6">
                    Fin de periodo actual: <strong className="text-white">{ecogoEndDate}</strong>
                </p>
            </div>
        </section>
    );
}