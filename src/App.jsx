import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import SavingsGoals from './pages/SavingsGoals';
import SharedExpenses from './pages/SharedExpenses';
import Transactions from './pages/Transactions';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState('landing'); // 'landing', 'login', 'register', 'forgot'

  // Detect /reset-password URL (from Supabase recovery email link)
  if (window.location.pathname === '/reset-password' || window.location.hash.includes('type=recovery')) {
    return <ResetPassword onSwitchToLogin={() => { window.history.pushState({}, '', '/'); setView('login'); }} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'transactions': return <Transactions />;
      case 'budgets': return <Budgets />;
      case 'goals': return <SavingsGoals />;
      case 'shared': return <SharedExpenses />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  if (!user) {
    if (view === 'landing') {
      return <Landing onGetStarted={() => setView('register')} onLogin={() => setView('login')} />;
    }

    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center relative overflow-hidden p-6">
        {/* Decorative background elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

        <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
          {view === 'forgot' ? (
            <ForgotPassword onSwitchToLogin={() => setView('login')} />
          ) : view === 'login' ? (
            <Login onSwitchToRegister={() => setView('register')} onForgotPassword={() => setView('forgot')} />
          ) : (
            <Register onSwitchToLogin={() => setView('login')} />
          )}

          <button
            onClick={() => setView('landing')}
            className="mt-8 mx-auto block text-gray-500 hover:text-white transition-colors text-sm font-medium"
          >
            ← Back to Landing Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex relative overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 h-screen overflow-y-auto relative z-10 scrollbar-hide">
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
