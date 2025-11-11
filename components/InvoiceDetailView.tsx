
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { AppView } from '../App';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { ArrowRightIcon } from './icons';
import { InvoiceStatus } from '../types';
import { formatCurrency } from './utils';
import { cn } from './utils';

interface InvoiceDetailViewProps {
    invoiceId: string;
    setView: (view: AppView) => void;
}

export const InvoiceDetailView: React.FC<InvoiceDetailViewProps> = ({ invoiceId, setView }) => {
    const { state, dispatch } = useAppContext();
    const invoice = state.invoices.find(inv => inv.id === invoiceId);

    if (!invoice) {
        return <div className="p-8 text-center">Invoice not found.</div>;
    }

    const { template } = invoice;

    const handleMarkAsPaid = () => {
        dispatch({ type: 'UPDATE_INVOICE', payload: { ...invoice, status: InvoiceStatus.Paid } });
    }

    const renderContent = () => {
        return (
            <>
                {/* Header */}
                <div className={cn(
                    template === 'modern' ? 'bg-brand-orange text-white p-8 sm:p-12' : 'flex justify-between items-start mb-12',
                    template === 'minimalist' && 'border-b border-brand-border pb-8 mb-16'
                )}>
                    <div>
                        <div className="flex items-center mb-4">
                            {template !== 'modern' && <div className="w-10 h-10 bg-brand-orange rounded-full mr-3"></div>}
                            <span className={cn(
                                'font-serif',
                                template === 'classic' && 'text-3xl font-semibold text-brand-text-primary',
                                template === 'modern' && 'text-3xl font-semibold text-white',
                                template === 'minimalist' && 'text-2xl font-normal tracking-wider text-brand-text-primary'
                            )}>InvoiceFlow</span>
                        </div>
                        <p className={cn(template === 'modern' ? 'text-white/80' : 'text-brand-text-secondary')}>{state.settings.companyName}</p>
                        <p className={cn(template === 'modern' ? 'text-white/80' : 'text-brand-text-secondary')}>{state.settings.companyAddress}</p>
                        <p className={cn(template === 'modern' ? 'text-white/80' : 'text-brand-text-secondary')}>GSTIN: {state.settings.companyGst}</p>
                    </div>
                    <div className="text-right">
                        <h1 className={cn(
                            'font-bold uppercase tracking-widest',
                             template === 'classic' && 'text-4xl text-brand-text-primary',
                             template === 'modern' && 'text-4xl text-white/90',
                             template === 'minimalist' && 'text-2xl text-brand-text-secondary tracking-[0.3em]'
                        )}>Invoice</h1>
                        <p className={cn('mt-2', template === 'modern' ? 'text-white/80' : 'text-brand-text-secondary')}>{invoice.invoiceNumber}</p>
                        <div className="mt-4"><Badge status={invoice.status}>{invoice.status}</Badge></div>
                    </div>
                </div>

                <div className={cn(template === 'modern' && 'p-8 sm:p-12')}>
                    {/* Bill To & Dates */}
                    <div className={cn('grid grid-cols-2 gap-8 mb-12', template === 'minimalist' && 'mb-16')}>
                        <div>
                            <h2 className={cn(
                                'mb-2',
                                template === 'classic' && 'text-sm text-brand-text-secondary',
                                template === 'modern' && 'text-sm text-brand-orange font-semibold',
                                template === 'minimalist' && 'text-xs uppercase tracking-widest text-brand-text-secondary mb-3'
                            )}>Bill To:</h2>
                            <p className="font-semibold text-brand-text-primary">{invoice.client.name}</p>
                            <p className="text-brand-text-secondary">{invoice.client.address}</p>
                            <p className="text-brand-text-secondary">GSTIN: {invoice.client.gstNumber}</p>
                            <p className="text-brand-text-secondary">{invoice.client.email}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-brand-text-secondary"><span className="font-semibold text-brand-text-primary">Issue Date:</span> {new Date(invoice.issueDate).toLocaleDateString('en-GB')}</p>
                            <p className="text-brand-text-secondary"><span className="font-semibold text-brand-text-primary">Due Date:</span> {new Date(invoice.dueDate).toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className={cn(
                                template === 'classic' && 'bg-white/5',
                                template === 'modern' && 'bg-brand-peach text-brand-orange',
                                template === 'minimalist' && 'border-b-2 border-brand-text-primary text-brand-text-primary'
                            )}>
                                <tr className="text-left font-semibold">
                                    <th className={cn('p-3 rounded-l-lg', template === 'minimalist' && 'font-normal tracking-wider uppercase text-xs')}>Description</th>
                                    <th className={cn('p-3 text-center', template === 'minimalist' && 'font-normal tracking-wider uppercase text-xs')}>Quantity</th>
                                    <th className={cn('p-3 text-right', template === 'minimalist' && 'font-normal tracking-wider uppercase text-xs')}>Rate</th>
                                    <th className={cn('p-3 text-right rounded-r-lg', template === 'minimalist' && 'font-normal tracking-wider uppercase text-xs')}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map(item => (
                                    <tr key={item.id} className="border-b border-white/10">
                                        <td className="p-3 font-medium text-brand-text-primary">{item.description}</td>
                                        <td className="p-3 text-center text-brand-text-secondary">{item.quantity}</td>
                                        <td className="p-3 text-right text-brand-text-secondary">{formatCurrency(item.rate)}</td>
                                        <td className="p-3 text-right text-brand-text-primary font-medium">{formatCurrency(item.quantity * item.rate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end mt-8">
                        <div className={cn(
                            'w-full max-w-xs space-y-2 text-sm',
                             template === 'minimalist' && 'border-t-2 border-brand-text-primary pt-4'
                        )}>
                            <div className="flex justify-between">
                                <span className="text-brand-text-secondary">Subtotal:</span>
                                <span className="font-medium text-brand-text-primary">{formatCurrency(invoice.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-brand-text-secondary">GST (18%):</span>
                                <span className="font-medium text-brand-text-primary">{formatCurrency(invoice.gst)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-2 mt-2">
                                <span className="text-brand-text-primary">Total:</span>
                                <span className="text-brand-text-primary">{formatCurrency(invoice.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {invoice.notes && (
                        <div className="mt-12 border-t border-white/10 pt-6">
                            <h3 className="font-semibold text-brand-text-primary mb-2">Notes:</h3>
                            <p className="text-sm text-brand-text-secondary">{invoice.notes}</p>
                        </div>
                    )}
                </div>
            </>
        )
    }

    return (
        <div className="p-4 sm:p-8 pt-20 lg:pt-8 max-w-4xl mx-auto">
             <header className="flex justify-between items-center mb-8">
                <div>
                    <Button variant="ghost" onClick={() => setView({ type: 'app', page: 'invoices' })}>
                        <ArrowRightIcon className="w-4 h-4 mr-2 rotate-180" /> Back to Invoices
                    </Button>
                </div>
                <div className="flex gap-2">
                    {invoice.status !== InvoiceStatus.Paid && (
                         <Button variant="secondary" onClick={handleMarkAsPaid}>Mark as Paid</Button>
                    )}
                    <Button onClick={() => setView({ type: 'app', page: 'invoices', detailId: invoice.id, action: 'edit' })}>Edit Invoice</Button>
                </div>
            </header>

            <Card className={cn(
                'transition-all duration-300',
                template === 'modern' ? 'p-0 overflow-hidden' : 'p-8 sm:p-12',
                template === 'minimalist' && 'border-none shadow-none bg-transparent backdrop-blur-none'
            )}>
               {renderContent()}
            </Card>
        </div>
    );
};