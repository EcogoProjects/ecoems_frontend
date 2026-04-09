"use client"
import Image from "next/image";

export default function ImageModal({ imageUrl, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl rounded-[18px] bg-base-hard-alt p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl font-bold text-base-dark hover:opacity-80"
          aria-label="Cerrar imagen ampliada"
        >
          ×
        </button>
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[18px]">
          <Image
            src={imageUrl}
            alt="Imagen ampliada"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 700px"
          />
        </div>
      </div>
    </div>
  );
}
