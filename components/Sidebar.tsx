
import React, { useState } from 'react';
import { AppView } from '../App';
import { DocumentIcon, HomeIcon, ReceiptIcon, SettingsIcon, UsersIcon } from './icons';
import { useAppContext } from '../context/AppContext';

interface SidebarProps {
  view: AppView;
  setView: (view: AppView) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-left transition-all duration-200 rounded-lg ${
        isActive
          ? 'bg-white/10 text-brand-text-primary shadow-inner'
          : 'text-brand-text-secondary hover:bg-white/5'
      }`}
    >
      <span className="w-6 h-6 mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ view, setView }) => {
    const { state } = useAppContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
        { id: 'invoices', label: 'Invoices', icon: <DocumentIcon /> },
        { id: 'clients', label: 'Clients', icon: <UsersIcon /> },
        { id: 'expenses', label: 'Expenses', icon: <ReceiptIcon /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ];
    
    const sidebarContent = (
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center mb-10">
          <div className="w-8 h-8 bg-brand-orange rounded-full mr-2"></div>
          <span className="font-serif text-2xl font-semibold text-brand-text-primary">InvoiceFlow</span>
        </div>
        <nav className="flex flex-col space-y-2">
          {navItems.map(item => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={view.type === 'app' && view.page === item.id}
              onClick={() => {
                setView({ type: 'app', page: item.id as any });
                setIsMobileMenuOpen(false);
              }}
            />
          ))}
        </nav>
        <div className="mt-auto">
          <div className="flex items-center p-2 rounded-lg hover:bg-white/5 cursor-pointer">
            <img src="https://i.pravatar.cc/150?u=user" alt="User" className="w-10 h-10 rounded-full" />
            <div className="ml-3">
              <p className="font-semibold text-brand-text-primary">{state.settings.userName}</p>
              <p className="text-sm text-brand-text-secondary">{state.settings.userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-brand-background/80 backdrop-blur-xl z-40 border-b border-white/10 h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
            <div className="w-7 h-7 bg-brand-orange rounded-full mr-2"></div>
            <span className="font-serif text-xl font-semibold text-brand-text-primary">InvoiceFlow</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 z-30 w-64 h-screen hidden lg:block bg-brand-background/80 backdrop-blur-2xl border-r border-white/10">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
       <div className={`fixed top-0 left-0 z-50 w-64 h-screen bg-brand-background/80 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
       </div>
       {isMobileMenuOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </>
  );
};
