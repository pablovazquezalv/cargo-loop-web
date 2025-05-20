'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../components/modal';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/manager/loginWithMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                router.push('/manager/dashboard');
            } else {
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Error al conectar con el servidor');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <img src="/Carga-loop-icon.png" alt="Logo" className="h-24 mb-6" />
            <h1 className="text-3xl font-bold text-blue-800 mb-10">Carga loop</h1>

            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-10 text-center">Iniciar sesión</h1>

                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                <label className="block mb-4">
                    <span className="text-gray-700">Correo electrónico</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Proporciona tu correo"
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </label>

                <label className="block mb-6">
                    <span className="text-gray-700">Contraseña</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Proporciona tu contraseña"
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </label>

                <button
                    type='button'
                    onClick={handleLogin}
                    className="w-full py-3 bg-blue-800 text-white rounded hover:bg-blue-900 transition-all"
                >
                    Iniciar sesión
                </button>

                <button
                    onClick={() => setShowModal(true)}
                    className="block w-full text-center text-blue-700 mt-4 hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </div>

            {/* Modal para recuperación */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-lg font-semibold mb-4">Recuperar contraseña</h2>
                <p className="mb-4 text-sm text-gray-700">
                    Por favor contacta a soporte o ingresa tu correo para recibir instrucciones.
                </p>
                <input
                    type="email"
                    placeholder="Tu correo"
                    className="w-full mb-4 p-2 border rounded"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => alert('Simulando envío de correo')}
                        className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
                    >
                        Enviar
                    </button>
                </div>
            </Modal>
        </div>
    );
}
