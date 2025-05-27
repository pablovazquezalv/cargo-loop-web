'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
export default function CreateCompany() {

    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        business_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        website: '',
        description: '',
        profile_picture: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, files } = e.target as HTMLInputElement;
        if (files) {
            setFormData({ ...formData, [id]: files[0] });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            const value = formData[key as keyof typeof formData];
            if (value !== null) {
                form.append(key, value);
            }
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/manager/createCompany', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: form,
            });
            

         

            const result = await response.json();
            
            if(response.status !== 200) {
                throw new Error(result.message || 'Error al crear la empresa');
            }
            console.log('Empresa creada:', result);
            alert('Empresa creada exitosamente');
            // Aquí podrías redirigir al dashboard o mostrar un mensaje de éxito
            router.push('/manager/dashboard'); // Descomentar si se usa useRouter
            // Aquí podrías redirigir o mostrar un mensaje

        } catch (error) {
            console.error('Error en el envío:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <img src="/Carga-loop-icon.png" alt="Logo" className="h-24 mb-6" />
            <h1 className="text-3xl font-bold text-blue-800 mb-10">Crear Empresa</h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md"
                encType="multipart/form-data"
            >
                {[
                    { id: 'name', label: 'Nombre de la Empresa', type: 'text', required: true },
                    { id: 'business_name', label: 'Razón Social', type: 'text' },
                    { id: 'email', label: 'Email', type: 'email', required: true },
                    { id: 'phone', label: 'Teléfono', type: 'text' },
                    { id: 'address', label: 'Dirección', type: 'text' },
                    { id: 'city', label: 'Ciudad', type: 'text' },
                    { id: 'state', label: 'Estado', type: 'text' },
                    { id: 'country', label: 'País', type: 'text' },
                    { id: 'postal_code', label: 'Código Postal', type: 'text' },
                    { id: 'website', label: 'Sitio Web', type: 'url' },
                ].map(field => (
                    <label key={field.id} className="block mb-4">
                        <span className="text-gray-700">{field.label}</span>
                        <input
                            type={field.type}
                            id={field.id}
                            value={(formData as any)[field.id]}
                            onChange={handleChange}
                            required={field.required || false}
                            className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </label>
                ))}

                <label className="block mb-4">
                    <span className="text-gray-700">Imagen de Perfil</span>
                    <input
                        type="file"
                        id="profile_picture"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full mt-2 p-2 border rounded text-sm text-gray-700"
                    />
                </label>

                <label className="block mb-6">
                    <span className="text-gray-700">Descripción</span>
                    <textarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                    ></textarea>
                </label>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-800 text-white rounded hover:bg-blue-900 transition-all"
                >
                    Crear Empresa
                </button>
            </form>
        </div>
    );
}
