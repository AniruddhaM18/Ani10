
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiKey, FiCopy, FiActivity } from 'react-icons/fi'; // Optional: for icons

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Workflows', path: '/', icon: <FiPlay /> },
    { label: 'Credentials', path: '/credentials', icon: <FiKey /> }, // ✅ PATH HERE
    { label: 'Templates', path: '/templates', icon: <FiCopy /> },
    { label: 'Executions', path: '/executions', icon: <FiActivity /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Workflows</h2>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <button
                onClick={() => navigate(item.path)}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition flex items-center"
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}