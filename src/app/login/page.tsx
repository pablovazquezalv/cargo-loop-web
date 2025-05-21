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
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoveryMessage, setRecoveryMessage] = useState('');

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

    const handlePasswordRecovery = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/manager/forgetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: recoveryEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setRecoveryMessage('Se ha enviado un correo de recuperación.');
            } else {
                console.error('Recovery error:', data);
                setRecoveryMessage(data.message || 'No se pudo enviar el correo.');
            }
        } catch (error) {
            console.error('Recovery error:', error);
            setRecoveryMessage('Ocurrió un error al enviar el correo.');
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
                    type="button"
                    onClick={handleLogin}
                    className="w-full py-3 bg-blue-800 text-white rounded hover:bg-blue-900 transition-all"
                >
                    Iniciar sesión
                </button>

                <button
                    onClick={() => {
                        setShowModal(true);
                        setRecoveryEmail('');
                        setRecoveryMessage('');
                    }}
                    className="block w-full text-center text-blue-700 mt-4 hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </div>

            {/* Modal de recuperación */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-lg font-semibold mb-4">Recuperar contraseña</h2>
                <p className="mb-4 text-sm text-gray-700">
                    Ingresa tu correo y te enviaremos instrucciones para recuperar tu contraseña.
                </p>
                <input
                    type="email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="Tu correo"
                    className="w-full mb-4 p-2 border rounded"
                />
                {recoveryMessage && <p className="text-sm text-green-600 mb-2">{recoveryMessage}</p>}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handlePasswordRecovery}
                        className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
                    >
                        Enviar
                    </button>
                </div>
            </Modal>
        </div>
    );
}
