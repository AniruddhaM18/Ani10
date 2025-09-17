import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import DashboardLayout from './components/layout/DashboardLayout';
import { useAuth } from './contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import WorkflowEditor from './pages/Dashboard/WorkflowEditor';
import CredentialsPage from './pages/Dashboard/CredentialsPage'; 



// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<div className="p-6">Select or create a workflow</div>} />
            <Route path="workflow/:id" element={<WorkflowEditor />} />
            <Route path="workflow/new" element={<WorkflowEditor />} />
            <Route path="credentials" element={<CredentialsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}