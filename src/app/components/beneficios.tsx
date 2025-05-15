//components//Beneficios.tsx


export default function Beneficios() {
    return (
        <section className="min-h-screen px-6 py-12 md:px-24 md:py-20 bg-white">
                 <h3 className="text-2xl md:text-4xl font-bold text-blue-800 mb-6">Planea tu siguiente envio!</h3>

                 <h2 className="text-3xl font-bold text-blue-800 mb-4">Beneficios</h2>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="p-6 bg-gray-100 rounded shadow-md">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Ahorra tiempo</h3>
                    <p className="text-gray-800">
                        Conecta con transportistas disponibles en tiempo real.
                    </p>
                </div>

                <div className="p-6 bg-gray-100 rounded shadow-md">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Seguridad</h3>
                    <p className="text-gray-800">
                        Genera conexiones dentro de una comunidad cerrada y segura.
                    </p>
                </div>

                <div className="p-6 bg-gray-100 rounded shadow-md">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Inteligencia Artificial</h3>
                    <p className="text-gray-800">
                        Optimiza tus envíos con nuestra tecnología avanzada.
                    </p>
                </div>
                <div className="p-6 bg-gray-100 rounded shadow-md">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Comunidad</h3>
                    <p className="text-gray-800">
                        Forma parte de una comunidad de profesionales del transporte.
                    </p>
                    
                </div>
                <div className="p-6 bg-gray-100 rounded shadow-md">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Soporte 24/7</h3>
                    <p className="text-gray-800">
                        Estamos aquí para ayudarte en cualquier momento.
                    </p>
                </div>
                <div className="p-6 bg-gray-100 rounded shadow-md">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Flexibilidad</h3>
                    <p className="text-gray-800">
                        Adapta tus envíos a tus necesidades específicas.
                    </p>
                </div>
                </div>

        </section>
    );
}