// components/ui/modal.tsx
export default function ModalInvitation({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
    return (
<div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50">
<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">&times;</button>
                {children}
            </div>
        </div>
    );
}
