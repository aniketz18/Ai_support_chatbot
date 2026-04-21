import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ScriptGeneratorPage from './pages/ScriptGeneratorPage';
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col font-sans bg-slate-50">
    <Navbar />
    <main className="flex-grow flex flex-col">{children}</main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><SignupPage /></PublicLayout>} />
        
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/embed" element={<DashboardLayout><ScriptGeneratorPage /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
