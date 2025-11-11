
import React, { useState, useMemo } from 'react';
import { Invoice, InvoiceStatus } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { MoreHorizontalIcon, PlusIcon, SearchIcon, DocumentIcon } from './icons';
import { useAppContext } from '../context/AppContext';
import { AppView } from '../App';
import { formatCurrency } from './utils';

const statusFilters: InvoiceStatus[] = [InvoiceStatus.Paid, InvoiceStatus.Pending, InvoiceStatus.Overdue, InvoiceStatus.Draft];

const InvoiceRow: React.FC<{ invoice: Invoice; onView: () => void; }> = ({ invoice, onView }) => (
  <tr className="border-b border-white/10 hover:bg-white/5 cursor-pointer" onClick={onView}>
    <td className="p-4"><input type="checkbox" className="h-4 w-4 rounded border-gray-300/50 bg-transparent text-brand-orange focus:ring-brand-orange/50" onClick={e => e.stopPropagation()} /></td>
    <td className="p-4 font-medium text-brand-text-primary">{invoice.invoiceNumber}</td>
    <td className="p-4">
      <div className="flex items-center">
        <img src={invoice.client.avatarUrl} alt={invoice.client.name} className="w-8 h-8 rounded-full mr-3" />
        <span className="text-brand-text-secondary">{invoice.client.name}</span>
      </div>
    </td>
    <td className="p-4 text-brand-text-secondary">{new Date(invoice.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
    <td className="p-4 text-brand-text-secondary">{new Date(invoice.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
    <td className="p-4 text-right font-medium text-brand-text-primary">{formatCurrency(invoice.total)}</td>
    <td className="p-4"><Badge status={invoice.status}>{invoice.status}</Badge></td>
    <td className="p-4 text-right">
      <Button variant="ghost" size="icon" onClick={e => e.stopPropagation()}>
        <MoreHorizontalIcon className="h-4 w-4 text-brand-text-secondary" />
      </Button>
    </td>
  </tr>
);

interface InvoicesViewProps {
    setView: (view: AppView) => void;
    clientFilter?: string | null;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({ setView, clientFilter }) => {
  const { state } = useAppContext();
  const { invoices } = state;
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 8;

  const filteredInvoices = useMemo(() => {
    let filtered = invoices;
    if (clientFilter) {
        filtered = filtered.filter(inv => inv.client.id === clientFilter);
    }
    if (activeFilter !== 'All') {
        filtered = filtered.filter(inv => inv.status === activeFilter);
    }
    return filtered;
  }, [invoices, activeFilter, clientFilter]);

  
  const getStatusCount = (status: InvoiceStatus) => invoices.filter(inv => inv.status === status).length;

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 sm:p-8 pt-20 lg:pt-8">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-serif text-brand-text-primary">Invoices</h1>
          <p className="text-brand-text-secondary mt-1">Manage all your invoices in one place.</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="relative w-full max-w-xs">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400/80 pointer-events-none"/>
                <input type="text" placeholder="Search invoices..." className="w-full pl-11 pr-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition placeholder:text-gray-400/80" />
            </div>
            <Button onClick={() => setView({ type: 'app', page: 'invoices', action: 'new' })}>
              <PlusIcon className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
        </div>
      </header>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Button variant={activeFilter === 'All' ? 'secondary' : 'ghost'} onClick={() => setActiveFilter('All')}>
          All <span className="ml-2 bg-black/10 text-brand-text-secondary text-xs font-semibold px-2 py-0.5 rounded-full">{invoices.length}</span>
        </Button>
        {statusFilters.map(status => (
          <Button key={status} variant={activeFilter === status ? 'secondary' : 'ghost'} onClick={() => setActiveFilter(status)}>
            {status} <span className="ml-2 bg-black/10 text-brand-text-secondary text-xs font-semibold px-2 py-0.5 rounded-full">{getStatusCount(status)}</span>
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {currentInvoices.length > 0 ? (
                <table className="w-full text-sm">
                <thead className="border-b border-white/10">
                    <tr className="text-left text-brand-text-secondary font-medium">
                    <th className="p-4"><input type="checkbox" className="h-4 w-4 rounded border-gray-300/50 bg-transparent text-brand-orange focus:ring-brand-orange/50" /></th>
                    <th className="p-4">Invoice #</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Issue Date</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4 text-right">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {currentInvoices.map(invoice => (
                    <InvoiceRow key={invoice.id} invoice={invoice} onView={() => setView({ type: 'app', page: 'invoices', detailId: invoice.id })} />
                    ))}
                </tbody>
                </table>
            ) : (
                <div className="text-center py-20">
                    <div className="inline-block bg-brand-peach p-4 rounded-full">
                        <DocumentIcon className="w-8 h-8 text-brand-orange" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-brand-text-primary">No invoices found</h3>
                    <p className="mt-1 text-brand-text-secondary">Create your first invoice to get started.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
      {totalPages > 1 && (
       <div className="flex justify-between items-center mt-6 text-sm text-brand-text-secondary">
          <p>Showing {indexOfFirstInvoice + 1}-{Math.min(indexOfLastInvoice, filteredInvoices.length)} of {filteredInvoices.length} invoices</p>
          <div className="flex gap-1 items-center">
              <Button variant="outline" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <Button key={number} variant={currentPage === number ? 'secondary' : 'ghost'} size="icon" onClick={() => paginate(number)}>
                      {number}
                  </Button>
              ))}
              <Button variant="outline" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
          </div>
       </div>
      )}
    </div>
  );
};
