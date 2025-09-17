import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-800">n8n Clone</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/workflow/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Create Workflow
        </button>
        <span className="text-sm text-gray-600">Signed in as {user?.email}</span>
        <button
          onClick={signOut}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}