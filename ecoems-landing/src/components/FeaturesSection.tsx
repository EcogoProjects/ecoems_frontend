import raccoonsTrio from "@/assets/raccoons-trio.png";

const FeaturesSection = () => {
  return (
    <section className="mt-16 bg-features py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-accent-foreground mb-8">
          Features<br />Inteligentes
        </h2>
        <div className="flex justify-center">
          <img
            src={raccoonsTrio}
            alt="Mapaches ECOGO"
            width={500}
            height={250}
            loading="lazy"
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
