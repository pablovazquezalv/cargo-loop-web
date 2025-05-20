// components/QuienesSomos.tsx

import Image from "next/image";

export default function QuienesSomos() {
  return (
    <section className="min-h-screen px-6 py-12 md:px-24 md:py-20 bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Text Block */}
        <div className="space-y-10">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Visión</h2>
            <p className="text-gray-800 mb-4">
            Impulsar una red justa y eficiente que profesionalice a los transportistas y facilite a las empresas mover su carga con seguridad, puntualidad y transparencia
            </p>
            
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Misión</h2>
            <p className="text-gray-800">
            Transformar la logística de carga en México, impulsando la eficiencia, la transparencia y la confianza entre quienes necesitan mover mercancías y quienes pueden hacerlo.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/logistics-person.jpg" // Cambia por tu imagen
            alt="Trabajador logístico"
            width={500}
            height={350}
            className="rounded shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
