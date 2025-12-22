import React, { useState, useEffect } from 'react';
import {
    Phone, Mail, MapPin, Calendar, Globe, Linkedin,
    Share2, UserPlus, Briefcase, Activity, ChevronRight,
    Instagram, Facebook, Youtube, X, LayoutGrid, CheckCircle2
} from 'lucide-react';

const BusinessCard = ({ employee, company }) => {
    const [showShare, setShowShare] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!employee) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const handleSaveContact = () => {
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${employee.full_name}
ORG:${company.name}
TITLE:${employee.position}
TEL;TYPE=CELL:${employee.phone}
EMAIL:${employee.email}
URL:${company.website}
ADR:;;${company.address.replace(/,/g, ';')};;;;
END:VCARD`;
        const blob = new Blob([vCard], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${employee.slug || 'contact'}.vcf`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans perspective-1000">

            {/* Main Card Container with Glassmorphism */}
            <div className={`
        relative w-full max-w-[400px] bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50
        transition-all duration-1000 transform
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}>

                {/* Decorative Background Blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* --- Header Section --- */}
                <div className="relative h-64">
                    {/* Hero Image */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/hero.png"
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                    </div>

                    {/* Logo */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-white/95 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 shadow-lg animate-float">
                            <img src="/images/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
                        </div>
                    </div>

                    {/* Profile Picture (Overlapping Header) */}
                    <div className={`absolute -bottom-14 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 delay-300 ${mounted ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                        <div className="relative group">
                            {/* Gradient Ring & Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 via-orange-400 to-yellow-400 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition duration-700"></div>

                            <div className="relative p-1.5 bg-white rounded-full shadow-2xl">
                                <img
                                    src={employee.photo_url}
                                    alt={employee.full_name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-inner bg-gray-100"
                                    style={{ objectPosition: 'top center' }}
                                />
                                <div className="absolute bottom-1 right-1 bg-orange-600 text-white p-1.5 rounded-full border-4 border-white shadow-lg animate-scale-in">
                                    <CheckCircle2 size={16} strokeWidth={3} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Profile Info --- */}
                <div className="pt-16 pb-6 px-6 text-center relative z-10">
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight leading-tight animate-fade-in">
                        {employee.full_name}
                    </h1>
                    <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mt-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        {employee.position}
                    </p>

                    {/* Main Action Buttons */}
                    <div className="flex items-center gap-3 mt-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <button
                            onClick={handleSaveContact}
                            className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-xl shadow-gray-200 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                        >
                            <UserPlus size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                            <span>Ajouter Contact</span>
                        </button>
                        <button
                            onClick={() => setShowShare(!showShare)}
                            className="w-14 h-[46px] flex items-center justify-center bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-orange-100 border border-orange-100"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* --- Content Area --- */}
                <div className="bg-white relative px-6 py-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-50 transform translate-y-2">

                    {/* Contact List */}
                    <div className="space-y-4 mb-8">
                        <ContactRow
                            icon={<Phone size={18} />}
                            label="Téléphone"
                            value={employee.phone}
                            href={`tel:${employee.phone}`}
                            delay="300ms"
                        />
                        <ContactRow
                            icon={<Mail size={18} />}
                            label="Email"
                            value={employee.email}
                            href={`mailto:${employee.email}`}
                            delay="400ms"
                        />
                        <div className="group flex items-start p-4 bg-[#0f172a] rounded-2xl hover:bg-gray-800 shadow-md transition-all border border-gray-800 hover:border-orange-500/30 animate-slide-up" style={{ animationDelay: '500ms' }}>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange-500 shadow-inner mr-4 shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <MapPin size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Adresse</p>
                                <p className="text-sm font-semibold text-white leading-snug group-hover:text-orange-400 transition-colors">
                                    {company.formatted_address?.line1}, {company.formatted_address?.line2}
                                </p>
                                <a href={company.maps_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-500 mt-2 hover:underline hover:text-orange-400">
                                    Voir sur la carte <ChevronRight size={12} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] mb-4 pl-2">Liens Rapides</h3>
                    <div className="space-y-3 mb-8">
                        <ActionCard icon={<Calendar size={18} />} title="Rendez-vous" subtitle="Réserver un créneau" href={company.calendly} color="text-teal-600" bg="bg-teal-50" delay="600ms" />
                        <ActionCard icon={<Globe size={18} />} title="Site Internet" subtitle="Visiter powertech.com" href={company.website} color="text-indigo-600" bg="bg-indigo-50" delay="700ms" />
                        <ActionCard icon={<Linkedin size={18} />} title="LinkedIn" subtitle="Voir le profil complet" href={employee.linkedin_personal} color="text-blue-600" bg="bg-blue-50" delay="800ms" />
                    </div>

                    {/* Services Image */}
                    <div className="mb-8 animate-slide-up" style={{ animationDelay: '900ms' }}>
                        <div className="flex items-center justify-between mb-3 px-2">
                            <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">Expertise</h3>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200 border border-gray-100 group">
                            <img src="/images/services.png" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Nos Services" />
                        </div>
                    </div>

                    {/* Marketing Banners */}
                    <div className="space-y-4 mb-8 animate-slide-up" style={{ animationDelay: '950ms' }}>
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                            <img src="/images/innovation_banner.png" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Innovation" />
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                            <img src="/images/quote_banner.png" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Vision" />
                        </div>
                    </div>

                    {/* Company Menu */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <MenuTile icon={<Briefcase size={20} />} label="Fournisseurs" href={company.suppliers_url} delay="1000ms" />
                        <MenuTile icon={<LayoutGrid size={20} />} label="Projets" href={company.projects_url} delay="1100ms" />
                        <MenuTile icon={<Activity size={20} />} label="QHSE" href={company.qhse_url} delay="1200ms" />
                        <MenuTile icon={<UserPlus size={20} />} label="Carrières" href={company.careers_url} delay="1300ms" />
                    </div>

                    {/* Footer Socials */}
                    <div className="flex justify-center gap-4 pt-4 border-t border-gray-100 animate-slide-up" style={{ animationDelay: '1400ms' }}>
                        {[
                            { icon: <Instagram size={18} />, href: company.socials.instagram },
                            { icon: <Linkedin size={18} />, href: company.socials.linkedin },
                            { icon: <X size={18} />, href: company.socials.x },
                            { icon: <Facebook size={18} />, href: company.socials.facebook },
                            { icon: <Youtube size={18} />, href: company.socials.youtube },
                        ].map((social, i) => (
                            <a key={i} href={social.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-[10px] font-semibold text-gray-300">POWERED BY SAM CORPORATE</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

const ContactRow = ({ icon, label, value, href, delay }) => (
    <a
        href={href}
        className="group flex items-center p-4 bg-[#0f172a] rounded-2xl hover:bg-gray-800 shadow-md transition-all border border-gray-800 hover:border-orange-500/30 animate-slide-up"
        style={{ animationDelay: delay }}
    >
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange-500 shadow-inner mr-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-white truncate group-hover:text-orange-400 transition-colors">{value}</p>
        </div>
        <div className="text-gray-500 group-hover:text-orange-500 transition-colors">
            <ChevronRight size={16} />
        </div>
    </a>
);

const ActionCard = ({ icon, title, subtitle, href, color, bg, delay }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center p-4 rounded-2xl bg-[#0f172a] hover:bg-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all group animate-slide-up shadow-md"
        style={{ animationDelay: delay }}
    >
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange-500 shadow-inner mr-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{title}</h4>
            <p className="text-xs text-gray-400 group-hover:text-gray-300">{subtitle}</p>
        </div>
        <ChevronRight size={16} className="text-gray-500 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
    </a>
)

const MenuTile = ({ icon, label, href, delay }) => (
    <a
        href={href}
        className="flex flex-col items-center justify-center py-6 px-2 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 hover:shadow-lg transition-all duration-300 group animate-slide-up"
        style={{ animationDelay: delay }}
    >
        <div className="text-gray-400 group-hover:text-orange-500 group-hover:-translate-y-1 transition-all duration-300 mb-2">
            {icon}
        </div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-orange-700 transition-colors">{label}</span>
    </a>
)

export default BusinessCard;
