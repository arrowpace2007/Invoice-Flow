
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { PlusIcon, UsersIcon, DocumentIcon, MoreHorizontalIcon } from './icons';
import { useAppContext } from '../context/AppContext';
import { AppView } from '../App';
import { Dialog } from './ui/Dialog';
import { Client } from '../types';
import { generateId } from './utils';

interface ClientsViewProps {
    setView: (view: AppView) => void;
}

const ClientForm: React.FC<{ client?: Client; onSave: (client: Client) => void; onCancel: () => void; }> = ({ client, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Client>(client || { id: '', name: '', email: '', address: '', gstNumber: '', avatarUrl: `https://i.pravatar.cc/150?u=${generateId()}`});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition placeholder:text-gray-400/80" />
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition placeholder:text-gray-400/80" />
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition placeholder:text-gray-400/80" />
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-text-secondary mb-1">GST Number</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} required className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition placeholder:text-gray-400/80" />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                <Button type="submit">{client ? 'Save Changes' : 'Add Client'}</Button>
            </div>
        </form>
    )
}

const ClientCard: React.FC<{ client: Client; onEdit: () => void; onViewInvoices: () => void; }> = ({ client, onEdit, onViewInvoices }) => {
    const { state } = useAppContext();
    const clientInvoiceCount = state.invoices.filter(inv => inv.client.id === client.id).length;

    return (
        <Card className="flex flex-col">
            <CardContent className="p-6 flex-grow">
                <div className="flex items-center justify-between">
                    <img src={client.avatarUrl} alt={client.name} className="w-16 h-16 rounded-full" />
                     <Button variant="ghost" size="icon" onClick={onEdit}>
                        <MoreHorizontalIcon className="w-5 h-5" />
                     </Button>
                </div>
                <h3 className="text-xl font-semibold text-brand-text-primary mt-4">{client.name}</h3>
                <p className="text-brand-text-secondary">{client.email}</p>
            </CardContent>
            <div className="border-t border-white/10 p-4 flex justify-between items-center text-sm">
                 <div className="text-brand-text-secondary">
                    <span className="font-semibold text-white">{clientInvoiceCount}</span> Invoices
                 </div>
                 <Button variant="ghost" size="sm" onClick={onViewInvoices}>View Invoices</Button>
            </div>
        </Card>
    )
}


export const ClientsView: React.FC<ClientsViewProps> = ({ setView }) => {
    const { state, dispatch } = useAppContext();
    const { clients } = state;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);
    
    const handleOpenDialog = (client?: Client) => {
        setEditingClient(client);
        setIsDialogOpen(true);
    }
    
    const handleCloseDialog = () => {
        setEditingClient(undefined);
        setIsDialogOpen(false);
    }

    const handleSaveClient = (client: Client) => {
        if (editingClient) {
            dispatch({ type: 'UPDATE_CLIENT', payload: client });
        } else {
            dispatch({ type: 'ADD_CLIENT', payload: { ...client, id: generateId('c') } });
        }
        handleCloseDialog();
    }

    return (
        <div className="p-4 sm:p-8 pt-20 lg:pt-8">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                <div>
                <h1 className="text-4xl font-serif text-brand-text-primary">Clients</h1>
                <p className="text-brand-text-secondary mt-1">Manage all your clients in one place.</p>
                </div>
                <Button onClick={() => handleOpenDialog()}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Client
                </Button>
            </header>

            {clients.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {clients.map(client => (
                        <ClientCard 
                            key={client.id} 
                            client={client} 
                            onEdit={() => handleOpenDialog(client)} 
                            onViewInvoices={() => setView({ type: 'app', page: 'invoices', filter: { clientId: client.id } })}
                        />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl">
                    <div className="inline-block bg-brand-peach p-4 rounded-full">
                        <UsersIcon className="w-8 h-8 text-brand-orange" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-brand-text-primary">No clients found</h3>
                    <p className="mt-1 text-brand-text-secondary">Add your first client to get started.</p>
                </div>
            )}

            <Dialog 
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                title={editingClient ? "Edit Client" : "Add New Client"}
            >
                <ClientForm client={editingClient} onSave={handleSaveClient} onCancel={handleCloseDialog} />
            </Dialog>
        </div>
    );
};
