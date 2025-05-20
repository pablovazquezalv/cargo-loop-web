'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {
        // Validación básica
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/manager/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellido, email, telefono, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Cuenta creada exitosamente');
                setError('');
                setTimeout(() => router.push('/information'), 1500);
            } else {
                setError(data.message || 'Error al crear la cuenta');
                setSuccess('');
            }
        } catch (error) {
             console.error('Error:', error);
            setError('Error al conectar con el servidor');
            setSuccess('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-blue-800 mb-10">Crear cuenta</h1>
            <img src="/Carga-loop-icon.png" alt="Logo" className="h-24 mb-6 " />

            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-10 text-center">Carga loop</h1>

                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Nombre</span>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Proporciona tu nombre"
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Apellido</span>
                    <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Proporciona tu apellido"
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Correo electrónico</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Proporciona tu correo"
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Teléfono</span>
                    <input
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Proporciona tu teléfono"
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Contraseña</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Proporciona tu contraseña"
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </label>

                <label className="block mb-6">
                    <span className="text-gray-700 font-semibold">Confirmar Contraseña</span>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirma tu contraseña"
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </label>

                <button 
                    type='button'
                    onClick={handleRegister}
                    className="w-full py-3 bg-blue-800 text-white rounded hover:bg-blue-900 transition-all"
                >
                    Crear cuenta
                </button>
            </div>
        </div>
    );
}
