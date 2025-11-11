
import React from 'react';
import { Invoice, InvoiceStatus } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { MoreHorizontalIcon, PlusIcon } from './icons';
import { useAppContext } from '../context/AppContext';
import { AppView } from '../App';
import { formatCurrency } from './utils';

const StatCard: React.FC<{ title: string; amount: string; color: string } & React.HTMLAttributes<HTMLDivElement>> = ({ title, amount, color, className, ...props }) => (
  <Card className={className} {...props}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-brand-text-secondary">{title}</CardTitle>
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-brand-text-primary">{amount}</div>
    </CardContent>
  </Card>
);

const InvoiceRow: React.FC<{ invoice: Invoice; onView: () => void }> = ({ invoice, onView }) => {
  return (
    <tr className="border-b border-white/10 hover:bg-white/5 cursor-pointer" onClick={onView}>
        <td className="p-4 font-medium text-brand-text-primary">{invoice.invoiceNumber}</td>
        <td className="p-4 text-brand-text-secondary">{invoice.client.name}</td>
        <td className="p-4 text-brand-text-secondary">{formatCurrency(invoice.total)}</td>
        <td className="p-4 text-brand-text-secondary">{new Date(invoice.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
        <td className="p-4"><Badge status={invoice.status}>{invoice.status}</Badge></td>
        <td className="p-4 text-right">
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontalIcon className="h-4 w-4 text-brand-text-secondary" />
            </Button>
        </td>
    </tr>
  );
};

interface DashboardViewProps {
    setView: (view: AppView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setView }) => {
  const { state } = useAppContext();
  const { invoices } = state;

  const outstanding = invoices
    .filter(inv => inv.status === InvoiceStatus.Pending || inv.status === InvoiceStatus.Overdue)
    .reduce((sum, inv) => sum + inv.total, 0);

  const overdue = invoices
    .filter(inv => inv.status === InvoiceStatus.Overdue)
    .reduce((sum, inv) => sum + inv.total, 0);

  const paidThisMonth = invoices
    .filter(inv => {
        const issueDate = new Date(inv.issueDate);
        const today = new Date();
        return inv.status === InvoiceStatus.Paid && 
               issueDate.getMonth() === today.getMonth() &&
               issueDate.getFullYear() === today.getFullYear();
    })
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="p-4 sm:p-8 pt-20 lg:pt-8">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif text-brand-text-primary">Dashboard</h1>
          <p className="text-brand-text-secondary mt-1">Here's your financial overview.</p>
        </div>
        <Button onClick={() => setView({ type: 'app', page: 'invoices', action: 'new' })}>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
            title="Total Outstanding" 
            amount={formatCurrency(outstanding)} 
            color="bg-status-pending"
            className="opacity-0 animate-glass-reveal"
            style={{ animationDelay: '100ms' }}
        />
        <StatCard 
            title="Overdue Amount" 
            amount={formatCurrency(overdue)} 
            color="bg-status-overdue"
            className="opacity-0 animate-glass-reveal"
            style={{ animationDelay: '200ms' }}
        />
        <StatCard 
            title="Paid This Month" 
            amount={formatCurrency(paidThisMonth)} 
            color="bg-status-paid"
            className="opacity-0 animate-glass-reveal"
            style={{ animationDelay: '300ms' }}
        />
        <StatCard 
            title="Total Invoices" 
            amount={invoices.length.toString()} 
            color="bg-blue-400"
            className="opacity-0 animate-glass-reveal"
            style={{ animationDelay: '400ms' }}
        />
      </section>

      <section>
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-serif">Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-white/10">
                            <tr className="text-left text-brand-text-secondary font-medium">
                                <th className="p-4">Invoice #</th>
                                <th className="p-4">Client</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Due Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.slice(0, 5).map(invoice => (
                                <InvoiceRow key={invoice.id} invoice={invoice} onView={() => setView({ type: 'app', page: 'invoices', detailId: invoice.id })} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
      </section>
    </div>
  );
};
