import raccoonLogo from "@/assets/raccoon-logo.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-2">
        <img src={raccoonLogo} alt="ECOGO" width={32} height={32} className="rounded-full" />
        <span className="font-bold text-lg text-foreground">ECOGO</span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
        <a href="#" className="hover:opacity-70 transition-opacity">Inicio</a>
        <a href="#" className="hover:opacity-70 transition-opacity">¿Cómo Funciona?</a>
        <a href="#" className="hover:opacity-70 transition-opacity">Blog</a>
      </div>
      <button className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
        Probar Gratis
      </button>
    </nav>
  );
};

export default Navbar;
