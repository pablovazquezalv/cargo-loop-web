import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Aquí puedes validar las credenciales con tu base de datos
        if (email === 'admin@example.com' && password === '1234') {
            return NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
