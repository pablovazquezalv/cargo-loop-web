// ModalInvitation.tsx
import { useState } from 'react';
import Button from './ui/button';

export default function ModalInvitation({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInvite = async () => {
    setLoading(true);
    setMessage('');
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/api/manager/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Invitación enviada exitosamente');
        setEmail('');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error al enviar la invitación');
      }
    } catch (error) {
      setMessage('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600/50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Invitar a transportista</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico del transportista..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {message && <p className="mb-2 text-sm text-gray-700">{message}</p>}
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} className="bg-gray-400 text-white">Cancelar</Button>
          <Button onClick={handleInvite} className="bg-blue-700 text-white" disabled={loading}>
            {loading ? 'Enviando...' : 'Invitar'}
          </Button>
        </div>
      </div>
    </div>
  );
}
