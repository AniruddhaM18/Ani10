import { useState } from 'react';
import CredentialModal from '../../components/modals/CredentialModal';

export default function CredentialsPage() {
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState([
    { id: 1, name: 'Resend API', type: 'resend' },
    { id: 2, name: 'Telegram Bot', type: 'telegram' },
  ]);

  const addCredential = (cred: { name: string; type: string }) => {
    setCredentials([...credentials, { ...cred, id: credentials.length + 1 }]);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Credentials</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Credential
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {credentials.map((cred) => (
          <div key={cred.id} className="bg-white p-4 rounded shadow border">
            <h3 className="font-medium">{cred.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{cred.type}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <CredentialModal
          onClose={() => setShowModal(false)}
          onSave={addCredential}
        />
      )}
    </div>
  );
}