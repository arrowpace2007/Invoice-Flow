
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { AppView } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { ArrowRightIcon, PlusIcon } from './icons';
import { Invoice, InvoiceItem, Client, InvoiceStatus } from '../types';
import { generateId, formatCurrency } from './utils';

interface InvoiceFormProps {
    setView: (view: AppView) => void;
    existingInvoiceId?: string;
}

const emptyInvoiceItem = (): InvoiceItem => ({ id: generateId('item'), description: '', quantity: 1, rate: 0 });

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ setView, existingInvoiceId }) => {
    const { state, dispatch } = useAppContext();
    const [invoice, setInvoice] = useState<Omit<Invoice, 'id' | 'subtotal' | 'gst' | 'total' | 'client' > & { clientId: string }>({
        invoiceNumber: `INV-${new Date().getFullYear()}-${String(state.invoices.length + 1).padStart(3, '0')}`,
        clientId: '',
        items: [emptyInvoiceItem()],
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: InvoiceStatus.Draft,
        notes: 'Thank you for your business. Payment is due within 15 days.',
    });

    useEffect(() => {
        if (existingInvoiceId) {
            const existing = state.invoices.find(inv => inv.id === existingInvoiceId);
            if (existing) {
                setInvoice({ ...existing, clientId: existing.client.id });
            }
        }
    }, [existingInvoiceId, state.invoices]);

    const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
    };

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const newItems = [...invoice.items];
        (newItems[index] as any)[field] = value;
        setInvoice({ ...invoice, items: newItems });
    };

    const addItem = () => setInvoice({ ...invoice, items: [...invoice.items, emptyInvoiceItem()] });
    const removeItem = (index: number) => setInvoice({ ...invoice, items: invoice.items.filter((_, i) => i !== index) });

    const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    const handleSubmit = (status: InvoiceStatus) => {
        if (!invoice.clientId) {
            alert('Please select a client.');
            return;
        }
        const client = state.clients.find(c => c.id === invoice.clientId);
        if (!client) {
            alert('Client not found.');
            return;
        }

        const finalInvoice: Invoice = {
            id: existingInvoiceId || generateId('inv'),
            ...invoice,
            client,
            subtotal,
            gst,
            total,
            status,
        };

        if (existingInvoiceId) {
            dispatch({ type: 'UPDATE_INVOICE', payload: finalInvoice });
        } else {
            dispatch({ type: 'ADD_INVOICE', payload: finalInvoice });
        }
        setView({ type: 'app', page: 'invoices', detailId: finalInvoice.id });
    };

    return (
        <div className="p-4 sm:p-8 pt-20 lg:pt-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <Button variant="ghost" onClick={() => setView({ type: 'app', page: 'invoices' })}>
                    <ArrowRightIcon className="w-4 h-4 mr-2 rotate-180" /> Back to Invoices
                </Button>
                <h1 className="text-4xl font-serif text-brand-text-primary mt-4">{existingInvoiceId ? 'Edit Invoice' : 'Create Invoice'}</h1>
            </header>
            
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Client & Dates</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Client</label>
                            <select name="clientId" value={invoice.clientId} onChange={handleInvoiceChange} required className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition">
                                <option value="" disabled>Select a client</option>
                                {state.clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Issue Date</label>
                            <input type="date" name="issueDate" value={invoice.issueDate} onChange={handleInvoiceChange} className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Due Date</label>
                            <input type="date" name="dueDate" value={invoice.dueDate} onChange={handleInvoiceChange} className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Items</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {invoice.items.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                                    <input type="text" placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="col-span-5 w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                                    <input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))} className="col-span-2 w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                                    <input type="number" placeholder="Rate" value={item.rate} onChange={e => handleItemChange(index, 'rate', Number(e.target.value))} className="col-span-2 w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                                    <span className="col-span-2 text-right font-medium">{formatCurrency(item.quantity * item.rate)}</span>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}><PlusIcon className="w-5 h-5 rotate-45" /></Button>
                                </div>
                            ))}
                        </div>
                        <Button type="button" variant="secondary" onClick={addItem} className="mt-4"><PlusIcon className="w-4 h-4 mr-2" /> Add Item</Button>
                    </CardContent>
                </Card>

                <div className="flex justify-between items-start">
                     <div className="w-1/2">
                        <label className="block text-sm font-medium text-brand-text-secondary mb-1">Notes</label>
                        <textarea name="notes" value={invoice.notes} onChange={handleInvoiceChange} rows={3} className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition"></textarea>
                    </div>
                    <div className="w-full max-w-xs space-y-2 text-sm text-right">
                        <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                        <div className="flex justify-between"><span>GST (18%)</span><span>{formatCurrency(gst)}</span></div>
                        <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-2 mt-2"><span>Total</span><span>{formatCurrency(total)}</span></div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="secondary" onClick={() => handleSubmit(InvoiceStatus.Draft)}>Save Draft</Button>
                    <Button type="button" onClick={() => handleSubmit(existingInvoiceId ? invoice.status : InvoiceStatus.Pending)}>
                        {existingInvoiceId ? 'Save Invoice' : 'Create & Send Invoice'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
