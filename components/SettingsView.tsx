
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { useAppContext } from '../context/AppContext';
import { Settings } from '../types';

export const SettingsView: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [settings, setSettings] = useState<Settings>(state.settings);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
        alert('Settings saved!');
    };

    return (
        <div className="p-4 sm:p-8 pt-20 lg:pt-8">
            <header className="mb-8">
                <h1 className="text-4xl font-serif text-brand-text-primary">Settings</h1>
                <p className="text-brand-text-secondary mt-1">Manage your business and invoice details.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-brand-text-secondary mb-1">Your Name</label>
                                <input type="text" name="userName" value={settings.userName} onChange={handleChange} className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text-secondary mb-1">Your Email</label>
                                <input type="email" name="userEmail" value={settings.userEmail} onChange={handleChange} className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Company Name</label>
                            <input type="text" name="companyName" value={settings.companyName} onChange={handleChange} className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Company Address</label>
                            <input type="text" name="companyAddress" value={settings.companyAddress} onChange={handleChange} className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-1">Company GST Number</label>
                            <input type="text" name="companyGst" value={settings.companyGst} onChange={handleChange} className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition" />
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button type="submit">Save Settings</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
