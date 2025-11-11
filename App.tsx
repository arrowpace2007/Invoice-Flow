
import React from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { InvoicesView } from './components/InvoicesView';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Cursor } from './components/ui/Cursor';
import { AppProvider } from './context/AppContext';
import { InvoiceDetailView } from './components/InvoiceDetailView';
import { InvoiceForm } from './components/InvoiceForm';
import { ClientsView } from './components/ClientsView';
import { SettingsView } from './components/SettingsView';

export type Page = 'dashboard' | 'invoices' | 'clients' | 'expenses' | 'settings';

export type AppView = 
  | { type: 'landing' }
  | { type: 'login' }
  | { type: 'app', page: Page, detailId?: string | null, action?: 'new' | 'edit' | null, filter?: Record<string, any> };

const App: React.FC = () => {
  const [view, setView] = React.useState<AppView>({ type: 'landing' });

  const renderAppContent = () => {
    if (view.type !== 'app') return null;

    if(view.action === 'new' && view.page === 'invoices') {
      return <InvoiceForm setView={setView} />;
    }
    if(view.action === 'edit' && view.page === 'invoices' && view.detailId) {
        return <InvoiceForm setView={setView} existingInvoiceId={view.detailId} />;
    }
    if (view.detailId && view.page === 'invoices') {
      return <InvoiceDetailView invoiceId={view.detailId} setView={setView} />;
    }

    switch (view.page) {
      case 'dashboard':
        return <DashboardView setView={setView} />;
      case 'invoices':
        return <InvoicesView setView={setView} clientFilter={view.filter?.clientId} />;
      case 'clients':
        return <ClientsView setView={setView} />;
      case 'settings':
        return <SettingsView />;
      case 'expenses':
          return <div className="p-8"><h1 className="text-3xl font-serif text-brand-text-primary">Expenses</h1><p className="text-brand-text-secondary mt-2">Expense tracking coming soon.</p></div>;
      default:
        return <DashboardView setView={setView} />;
    }
  };
  
  let viewContent;

  if (view.type === 'landing') {
    viewContent = <LandingPage setView={setView} />;
  } else if (view.type === 'login') {
    viewContent = <LoginPage setView={setView} />;
  } else {
    viewContent = (
      <div className="flex min-h-screen font-sans text-brand-text-primary relative overflow-x-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-background via-orange-50 to-amber-100/50 animate-background-pan" style={{ backgroundSize: '200% 200%' }}></div>
        <div className="absolute -top-1/2 -left-1/4 w-[1500px] h-[1500px] bg-radial-gradient from-brand-peach/20 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-[1500px] h-[1500px] bg-radial-gradient from-brand-orange/10 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none animate-float"></div>

        <Sidebar view={view} setView={setView} />
        <main className="flex-1 lg:ml-64 lg:pt-0 pt-16 z-10">
          {renderAppContent()}
        </main>
      </div>
    );
  }

  return (
    <AppProvider>
      <Cursor />
      {viewContent}
    </AppProvider>
  );
};

export default App;
