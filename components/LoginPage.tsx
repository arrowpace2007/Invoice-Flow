import React from 'react';
// Fix: The 'View' type is not exported from App.tsx. The correct type is 'AppView'.
import { AppView } from '../App';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { GithubIcon, GoogleIcon } from './icons';

type LoginPageProps = {
  // Fix: Use the correct 'AppView' type for the setView prop.
  setView: (view: AppView) => void;
};

export const LoginPage: React.FC<LoginPageProps> = ({ setView }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden animate-background-pan" style={{ backgroundSize: '200% 200%' }}>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-background via-orange-50 to-amber-100/50"></div>
        <div className="absolute inset-0 w-full h-full bg-radial-gradient from-brand-peach/40 to-transparent blur-3xl opacity-80" style={{ background: 'radial-gradient(circle at center, rgba(255,220,201,0.4) 0%, rgba(249,248,246,0) 60%)' }}></div>
        <div className="relative z-10 w-full max-w-md">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-10 h-10 bg-brand-orange rounded-full mr-3"></div>
                    <span className="font-serif text-3xl font-semibold text-brand-text-primary">InvoiceFlow</span>
                </div>
                <h1 className="text-2xl font-serif text-brand-text-primary">Welcome Back</h1>
                <p className="text-brand-text-secondary">Sign in to continue to your dashboard.</p>
            </div>

            <Card>
                <CardContent className="p-8">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brand-text-secondary mb-1">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition placeholder:text-gray-400/80"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium text-brand-text-secondary mb-1">Password</label>
                                <a href="#" className="text-sm text-brand-orange hover:underline">Forgot password?</a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 bg-black/10 backdrop-blur-sm border border-white/10 rounded-lg shadow-inner focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange outline-none transition placeholder:text-gray-400/80"
                            />
                        </div>
                        
                        {/* Fix: Update setView call to pass an object that matches the AppView type. */}
                        <Button type="button" onClick={() => setView({ type: 'app', page: 'dashboard' })} className="w-full !py-3 !text-base">
                            Sign In
                        </Button>
                    </form>

                     <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10"></span>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white/5 px-2 text-brand-text-secondary backdrop-blur-sm rounded-full">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 border-white/10">
                            <GoogleIcon className="w-5 h-5 mr-2" /> Google
                        </Button>
                         <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 border-white/10">
                            <GithubIcon className="w-5 h-5 mr-2" /> GitHub
                        </Button>
                    </div>

                </CardContent>
            </Card>
            <p className="mt-6 text-center text-sm text-brand-text-secondary">
                Don't have an account?{' '}
                {/* Fix: Update setView call to pass an object that matches the AppView type. */}
                <a href="#" onClick={(e) => { e.preventDefault(); setView({ type: 'landing' }); }} className="font-semibold text-brand-orange hover:underline">
                    Sign up for free
                </a>
            </p>
        </div>
    </div>
  );
};