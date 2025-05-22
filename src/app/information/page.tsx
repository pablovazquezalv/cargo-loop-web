'use client'

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';

export default function CodigoAutenticacion() {
    const router = useRouter();
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto focus next input
            if (value && index < code.length - 1) {
                const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleSubmit = async () => {
        const fullCode = code.join('');

        if (fullCode.length !== 4) {
            setError('Debes ingresar los 4 dígitos del código');
            setSuccess('');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/manager/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: fullCode }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Código verificado correctamente');
                setError('');
                setTimeout(() => router.push('/login'), 1500);
            } else {
                setError(data.message || 'Código inválido');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al conectar con el servidor');
            setSuccess('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">Código de Autenticación</h1>
            <img src="/Carga-loop-icon.png" alt="Logo" className="h-24 mb-6" />

            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center mb-6">Ingresa el código enviado a tu correo</h2>

                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

                <div className="flex justify-center gap-4 mb-6">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                            className="w-12 h-12 text-center border rounded-md text-2xl focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    ))}
                </div>

                <p className="text-gray-700 text-sm mb-4 text-center">
                    ¿No te llegó el correo? <span className="text-blue-800 cursor-pointer font-medium">Reenviar</span>
                </p>

                <button 
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-3 bg-blue-800 text-white rounded hover:bg-blue-900 transition-all"
                >
                    Verificar código
                </button>
            </div>
        </div>
    );
}
