'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/app/components/ui/button';
import Card from '@/app/components/ui/card';
import CardContent from '@/app/components/ui/card-content';

type Dealer = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: number;
};

export default function DealersPage() {
    const [dealers, setDealers] = useState<Dealer[]>([]);

    useEffect(() => {
        const fetchDealers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/dealer');
                if (!response.ok) throw new Error('Error al obtener repartidores');
                const data = await response.json();
                setDealers(data);
            } catch (error) {
                console.error('Error al cargar los repartidores:', error);
            }
        };

        fetchDealers();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">Repartidores</h1>

            <Button className="ml-auto mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Añadir Repartidor
            </Button>

            <Card className="overflow-hidden rounded-2xl border-2 border-blue-400 shadow-md">
                <CardContent className="p-6 bg-gray-50 rounded-2xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 font-semibold">#ID</th>
                                <th className="px-4 py-2 font-semibold">Nombre</th>
                                <th className="px-4 py-2 font-semibold">Correo</th>
                                <th className="px-4 py-2 font-semibold">Teléfono</th>
                                <th className="px-4 py-2 font-semibold">Estado</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dealers.map((dealer) => (
                                <tr key={dealer.id} className="bg-white border-b-2 last:border-b-0">
                                    <td className="px-4 py-2">{dealer.id}</td>
                                    <td className="px-4 py-2">{dealer.name}</td>
                                    <td className="px-4 py-2">{dealer.email}</td>
                                    <td className="px-4 py-2">{dealer.phone ?? 'N/A'}</td>
                                    <td className="px-4 py-2">
                                        {dealer.status === 1 ? 'Activo' : 'Inactivo'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                                            Ver más
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}
