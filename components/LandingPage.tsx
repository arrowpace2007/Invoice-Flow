import React, { useState, useEffect, useRef } from 'react';
// Fix: The 'View' type is not exported from App.tsx. The correct type is 'AppView'.
import { AppView } from '../App';
import { Button, LiquidButton } from './ui/Button';
import { ArrowRightIcon, ShieldCheckIcon, TrendingUpIcon, UsersIcon, ZapIcon, StarIcon, QuoteIcon } from './icons';
import { Card } from './ui/Card';

type LandingPageProps = {
  // Fix: Use the correct 'AppView' type for the setView prop.
  setView: (view: AppView) => void;
};

const Header: React.FC<LandingPageProps> = ({ setView }) => (
    <header className="sticky top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 bg-brand-background/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
             <div className="flex items-center">
                <div className="w-8 h-8 bg-brand-orange rounded-full mr-2"></div>
                <span className="font-serif text-2xl font-semibold text-brand-text-primary">InvoiceFlow</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-brand-text-secondary font-medium">
                <a href="#features" className="hover:text-brand-text-primary transition-colors">Features</a>
                <a href="#howitworks" className="hover:text-brand-text-primary transition-colors">How it Works</a>
                <a href="#testimonials" className="hover:text-brand-text-primary transition-colors">Testimonials</a>
            </nav>
            <div className="flex items-center gap-2">
                {/* Fix: Update setView call to pass an object that matches the AppView type. */}
                <Button variant="ghost" onClick={() => setView({ type: 'login' })}>Log In</Button>
                {/* Fix: Update setView call to pass an object that matches the AppView type. */}
                <Button onClick={() => setView({ type: 'app', page: 'dashboard' })} className="rounded-full shadow-lg shadow-brand-orange/30 hover:shadow-xl transition-shadow">Sign Up Free</Button>
            </div>
        </div>
    </header>
);

const Hero: React.FC<LandingPageProps> = ({ setView }) => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
    <section className="relative text-center py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden h-[120vh]">
        <div 
            className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] max-w-4xl max-h-4xl bg-radial-gradient from-brand-orange/20 to-transparent rounded-full blur-3xl opacity-60 animate-gentle-drift" 
            style={{ 
                background: 'radial-gradient(circle, rgba(255,93,36,0.2) 0%, rgba(249,248,246,0) 70%)',
                transform: `translateY(${offsetY * 0.6}px)`,
                animationDuration: '15s'
            }}>
        </div>
        <div 
            className="absolute bottom-[-30%] right-[-20%] w-[70vw] h-[70vw] max-w-3xl max-h-3xl bg-radial-gradient from-brand-peach/30 to-transparent rounded-full blur-3xl opacity-70 animate-gentle-drift" 
            style={{ 
                background: 'radial-gradient(circle, rgba(255,220,201,0.3) 0%, rgba(249,248,246,0) 70%)',
                transform: `translateY(${offsetY * 0.4}px)`,
                animationDuration: '18s',
                animationDelay: '3s'
            }}>
        </div>
         <div 
            className="absolute bottom-[5%] left-[5%] w-[40vw] h-[40vw] max-w-xl max-h-xl bg-radial-gradient from-amber-200/20 to-transparent rounded-full blur-3xl opacity-50 animate-gentle-drift" 
            style={{ 
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(249,248,246,0) 70%)',
                transform: `translateY(${offsetY * 0.5}px)`,
                animationDuration: '20s',
                 animationDelay: '1s'
            }}>
        </div>
        
        <div className="relative container mx-auto px-4 z-10" style={{ transform: `translateY(${offsetY * 0.25}px)` }}>
            <h1 className="font-serif text-5xl sm:text-7xl font-extrabold text-brand-text-primary leading-tight tracking-tight animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                Invoicing made simple.
                <br />
                Get paid faster.
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto text-brand-text-secondary animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                The ultimate tool for Indian freelancers. Create professional GST-compliant invoices in seconds, track payments, and automate reminders.
            </p>
            <div className="mt-10 flex justify-center items-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                {/* Fix: Update setView call to pass an object that matches the AppView type. */}
                <LiquidButton onClick={() => setView({ type: 'app', page: 'dashboard' })} size="xl">
                    Get Started for Free <ArrowRightIcon className="w-5 h-5 ml-2" />
                </LiquidButton>
            </div>
        </div>
        <div className="relative w-full max-w-4xl mt-20 animate-fadeInUp" style={{ animationDelay: '0.7s', transform: `translateY(${offsetY * 0.1}px)` }}>
            <div className="absolute -inset-2 bg-gradient-to-br from-brand-orange/50 to-brand-peach/50 rounded-3xl blur-xl opacity-40 animate-float" style={{ animationDelay: '0.2s' }}></div>
             <Card className="p-2 sm:p-4 bg-white/30">
                <div className="h-4 bg-gray-200/50 rounded-t-lg flex items-center px-2 gap-1.5">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                </div>
                <img src="https://i.imgur.com/uR1f5cF.png" alt="InvoiceFlow App Screenshot" className="rounded-b-lg"/>
            </Card>
        </div>
    </section>
    )
};

const TrustedBy = () => (
    <section className="py-12">
        <div className="container mx-auto px-4">
            <h3 className="text-center text-sm font-semibold tracking-wider text-brand-text-secondary uppercase">
                Trusted by freelancers at
            </h3>
            <div className="mt-6 flex justify-center items-center gap-8 sm:gap-12 grayscale opacity-60">
                <img src="https://logo.clearbit.com/google.com" alt="Google" className="h-6" />
                <img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" className="h-6" />
                <img src="https://logo.clearbit.com/spotify.com" alt="Spotify" className="h-6" />
                <img src="https://logo.clearbit.com/airbnb.com" alt="Airbnb" className="h-5" />
                <img src="https://logo.clearbit.com/swiggy.com" alt="Swiggy" className="h-8 hidden sm:block" />
            </div>
        </div>
    </section>
);


const Features = () => {
    const featureList = [
        { icon: <ZapIcon />, title: "Effortless Invoicing", description: "Create and send beautiful, professional invoices in under a minute." },
        { icon: <UsersIcon />, title: "Client Management", description: "Keep all your client information organized and accessible in one place." },
        { icon: <ShieldCheckIcon />, title: "GST Compliant", description: "Generate invoices that are fully compliant with Indian GST regulations." },
        { icon: <TrendingUpIcon />, title: "Track Performance", description: "Get insights into your income, outstanding payments, and business health." },
    ];
    return (
        <section id="features" className="py-20 sm:py-28">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto">
                     <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary">A treasure trove of features</h2>
                     <p className="mt-4 text-lg text-brand-text-secondary">Everything you need to streamline your freelance business and stay on top of your finances.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featureList.map((feature, i) => (
                        <Card key={feature.title} className="group p-8 transition-all duration-300 hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: `${0.2 * i}s`}}>
                            <div className="relative z-10">
                                <div className="bg-brand-peach p-3 rounded-lg inline-block text-brand-orange group-hover:scale-110 transition-transform duration-300">
                                    {React.cloneElement(feature.icon, { className: 'w-8 h-8' })}
                                </div>
                                <h3 className="text-xl font-semibold text-brand-text-primary mt-4">{feature.title}</h3>
                                <p className="text-brand-text-secondary mt-2">{feature.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HowItWorks = () => (
    <section id="howitworks" className="py-20 sm:py-28 bg-white/5">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary">Get started in 3 simple steps</h2>
                <p className="mt-4 text-lg text-brand-text-secondary">Focus on your work, we'll handle the paperwork.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-8">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-brand-peach text-brand-orange rounded-full font-serif text-2xl font-bold">1</div>
                    <h3 className="text-xl font-semibold text-brand-text-primary mt-6">Add Your Client</h3>
                    <p className="text-brand-text-secondary mt-2">Quickly add your client's details, including their GST number for compliance.</p>
                </div>
                <div className="p-8">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-brand-peach text-brand-orange rounded-full font-serif text-2xl font-bold">2</div>
                    <h3 className="text-xl font-semibold text-brand-text-primary mt-6">Create an Invoice</h3>
                    <p className="text-brand-text-secondary mt-2">List your services or products, set quantities and rates, and let us handle the tax calculations.</p>
                </div>
                <div className="p-8">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-brand-peach text-brand-orange rounded-full font-serif text-2xl font-bold">3</div>
                    <h3 className="text-xl font-semibold text-brand-text-primary mt-6">Send & Get Paid</h3>
                    <p className="text-brand-text-secondary mt-2">Send the professional invoice directly via email and track its status until you're paid.</p>
                </div>
            </div>
        </div>
    </section>
);

const Testimonials = () => {
    const testimonials = [
        {
            quote: "InvoiceFlow has been a game-changer for my freelance design business. What used to take 15 minutes now takes 2. It's beautiful and just works.",
            author: "Priya Sharma",
            title: "Graphic Designer, Mumbai",
            avatar: "https://i.pravatar.cc/150?u=t1",
            rating: 5,
        },
        {
            quote: "As a developer, I appreciate clean, efficient tools. InvoiceFlow is exactly that. GST compliance is now a breeze. Highly recommended!",
            author: "Rohan Kapoor",
            title: "Web Developer, Bengaluru",
            avatar: "https://i.pravatar.cc/150?u=t2",
            rating: 5,
        },
        {
            quote: "I used to dread invoicing. Now, I actually look forward to it. The payment tracking and reminders save me so much follow-up time.",
            author: "Aisha Khan",
            title: "Content Writer, Delhi",
            avatar: "https://i.pravatar.cc/150?u=t3",
            rating: 4,
        }
    ];
    return (
        <section id="testimonials" className="py-20 sm:py-28 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-radial-gradient from-brand-peach/30 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
            <div className="container mx-auto px-4 relative">
                 <div className="text-center max-w-2xl mx-auto animate-fadeInUp">
                    <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-text-primary">Loved by freelancers across India</h2>
                    <p className="mt-4 text-lg text-brand-text-secondary">Don't just take our word for it. Here's what they have to say.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {testimonials.map((testimonial, i) => (
                        <Card key={i} className={`p-8 flex flex-col animate-fadeInUp transition-transform duration-300 ${i === 1 ? 'md:scale-105' : 'md:hover:scale-105'}`} style={{ animationDelay: `${0.2 * i + 0.3}s`}}>
                            <div className="flex items-center" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                    <StarIcon
                                        key={starIndex}
                                        className={`w-5 h-5 ${starIndex < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <blockquote className="mt-4 text-brand-text-secondary flex-grow italic">
                              <p>"{testimonial.quote}"</p>
                            </blockquote>
                            <footer className="mt-6 flex items-center">
                                <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full" />
                                <div className="ml-4">
                                    <cite className="font-semibold text-brand-text-primary not-italic">{testimonial.author}</cite>
                                    <p className="text-sm text-brand-text-secondary">{testimonial.title}</p>
                                </div>
                            </footer>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}


const CallToAction: React.FC<LandingPageProps> = ({ setView }) => (
    <section className="bg-gradient-to-br from-brand-orange to-orange-500 text-white py-20 sm:py-28">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold">Stop chasing payments. Start getting paid.</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">Join hundreds of freelancers in India who trust InvoiceFlow to manage their business.</p>
            {/* Fix: Update setView call to pass an object that matches the AppView type. */}
            <Button onClick={() => setView({ type: 'app', page: 'dashboard' })} size="lg" className="mt-8 rounded-full bg-white text-brand-orange hover:bg-gray-100 px-8 py-4 shadow-2xl hover:scale-105 transition-transform">
                Create Your First Invoice - It's Free!
            </Button>
        </div>
    </section>
);


const Footer = () => (
    <footer className="py-16 text-brand-text-secondary bg-brand-background/50">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center">
                        <div className="w-7 h-7 bg-brand-orange rounded-full mr-2"></div>
                        <span className="font-serif text-xl font-semibold text-brand-text-primary">InvoiceFlow</span>
                    </div>
                    <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} InvoiceFlow. All rights reserved.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-brand-text-primary">Product</h4>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#features" className="hover:text-brand-orange">Features</a></li>
                        <li><a href="#" className="hover:text-brand-orange">Pricing</a></li>
                        <li><a href="#testimonials" className="hover:text-brand-orange">Testimonials</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-brand-text-primary">Company</h4>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#" className="hover:text-brand-orange">About Us</a></li>
                        <li><a href="#" className="hover:text-brand-orange">Contact</a></li>
                        <li><a href="#" className="hover:text-brand-orange">Careers</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-brand-text-primary">Legal</h4>
                    <ul className="mt-4 space-y-2 text-sm">
                        <li><a href="#" className="hover:text-brand-orange">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-brand-orange">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
);

export const LandingPage: React.FC<LandingPageProps> = ({ setView }) => {
    return (
        <div className="font-sans text-brand-text-primary bg-transparent overflow-x-hidden">
            <Header setView={setView} />
            <main>
                <Hero setView={setView} />
                <TrustedBy />
                <Features />
                <HowItWorks />
                <Testimonials />
                <CallToAction setView={setView} />
            </main>
            <Footer />
        </div>
    );
};
