import React, { useState, useEffect } from 'react';
import {
    Phone, Mail, MapPin, Calendar, Globe, Linkedin,
    Share2, UserPlus, Briefcase, Activity, ChevronRight,
    Instagram, Facebook, LayoutGrid, CheckCircle2,
    MessageSquare, QrCode, Plus, Save
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

    // Prepare Whatsapp Link
    const whatsappLink = `https://wa.me/${employee.phone?.replace(/[^0-9]/g, '')}`;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans perspective-1000 bg-gray-50/50">

            {/* Main Card Container with Glassmorphism */}
            <div className={`
        relative w-full max-w-[400px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50
        transition-all duration-1000 transform
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}>

                {/* --- Header Section --- */}
                <div className="relative h-64">
                    {/* Hero Image */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/hero.png"
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
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
                    <p className="text-orange-600 font-bold text-xs uppercase tracking-widest mt-2 mb-1 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        {employee.position}
                    </p>
                    {employee.segment && (
                        <p className="text-gray-500 font-medium text-[10px] uppercase tracking-wider mb-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
                            {employee.segment}
                        </p>
                    )}
                    {!employee.segment && <div className="mb-6"></div>}

                    {/* --- NEW ICON ROW (Added per request) --- */}
                    <div className="flex justify-center gap-4 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        {/* Phone */}
                        <a href={`tel:${employee.phone}`} className="flex items-center justify-center w-12 h-12 bg-[#ea580c] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-orange-500/50 transition-all duration-300">
                            <Phone size={20} fill="currentColor" strokeWidth={1} />
                        </a>

                        {/* Email */}
                        <a href={`mailto:${employee.email}`} className="flex items-center justify-center w-12 h-12 bg-[#ea580c] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-orange-500/50 transition-all duration-300">
                            <Mail size={20} fill="currentColor" strokeWidth={1} />
                        </a>

                        {/* SMS */}
                        <a href={`sms:${employee.phone}`} className="flex items-center justify-center w-12 h-12 bg-[#ea580c] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-orange-500/50 transition-all duration-300">
                            <MessageSquare size={20} fill="currentColor" strokeWidth={1} />
                        </a>

                        {/* WhatsApp */}
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-[#ea580c] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-orange-500/50 transition-all duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        </a>
                    </div>


                    {/* --- NEW DARK CONTACTS CARD (Matches Photo) --- */}
                    <div className="bg-[#1c1c1c] rounded-3xl p-6 text-left mx-2 shadow-2xl animate-slide-up" style={{ animationDelay: '300ms' }}>
                        {/* ... (existing contact content) ... */}
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6 relative">
                            <div className="w-10 h-10 bg-[#ea580c] rounded-lg flex items-center justify-center shrink-0">
                                <img src="/images/logo.png" alt="Logo" className="w-6 h-6 object-contain brightness-0 invert" />
                            </div>
                            <h2 className="text-[#ea580c] text-xl font-medium tracking-wide">Contacts</h2>
                            {/* Dashed Line */}
                            <div className="absolute -bottom-3 left-0 right-0 border-b border-dashed border-gray-600"></div>
                        </div>

                        <div className="space-y-6 mt-8">
                            {/* Mobile SN */}
                            <div>
                                <p className="text-[#ea580c] text-lg font-serif">Mobile SN</p>
                                <a href={`tel:${employee.phone}`} className="text-gray-200 text-sm font-light mt-1 block hover:text-white transition-colors">
                                    {employee.phone}
                                </a>
                            </div>

                            {/* Email */}
                            <div>
                                <p className="text-[#ea580c] text-lg font-serif">Email</p>
                                <a href={`mailto:${employee.email}`} className="text-gray-200 text-sm font-light mt-1 block break-all hover:text-white transition-colors">
                                    {employee.email}
                                </a>
                            </div>

                            {/* Adresse */}
                            <div>
                                <p className="text-[#ea580c] text-lg font-serif">Adresse</p>
                                <p className="text-gray-200 text-sm font-light mt-1 leading-relaxed">
                                    {company.formatted_address?.line1}, {company.formatted_address?.line2}<br />
                                    {company.formatted_address?.line3}
                                </p>
                            </div>

                            {/* Map Button */}
                            <a
                                href={company.maps_link}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full bg-[#ea580c] text-white py-3 rounded-full text-center text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 mt-4"
                            >
                                <MapPin size={16} fill="currentColor" strokeWidth={0} />
                                <span>Cliquer pour suivre le maps</span>
                            </a>
                        </div>
                    </div>


                    {/* --- NEW WHITE CARD (Logo + Photo) --- */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl mx-2 mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
                        {/* White Header with Logo */}
                        <div className="bg-white p-6 flex justify-center border-b border-gray-100">
                            <img src="/images/logo.png" alt="PowerTech Logo" className="h-12 object-contain" />
                        </div>

                        {/* Large Portrait Photo */}
                        <div className="bg-gray-50 flex justify-center pt-8 pb-0 overflow-hidden">
                            <img
                                src={employee.photo_url}
                                alt={employee.full_name}
                                className="w-[60%] h-auto object-cover object-top mask-image-gradient-b drop-shadow-xl transform translate-y-2"
                            />
                        </div>
                    </div>

                    {/* --- NEW SCHEDULE MEETING CARD --- */}
                    <div className="bg-[#1c1c1c] rounded-3xl p-6 text-center mx-2 mt-8 shadow-2xl animate-slide-up" style={{ animationDelay: '500ms' }}>
                        <h2 className="text-[#ea580c] text-2xl font-serif tracking-wide mb-2">Schedule Meeting</h2>
                        <p className="text-white text-sm font-light leading-relaxed mb-6 px-4">
                            Schedule a meeting to discuss potential opportunities for collaboration
                        </p>

                        {/* Dashed Line */}
                        <div className="border-b border-dashed border-gray-600 mb-6"></div>

                        <div className="space-y-4">
                            <a
                                href={company.calendly}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full bg-[#ea580c] text-white py-3 rounded-full text-base font-medium hover:bg-orange-600 transition-colors shadow-lg"
                            >
                                Book on Calendly
                            </a>
                            <button
                                onClick={handleSaveContact}
                                className="block w-full bg-[#ea580c] text-white py-3 rounded-full text-base font-medium hover:bg-orange-600 transition-colors shadow-lg"
                            >
                                Add to Calendar
                            </button>
                        </div>
                    </div>

                    {/* --- NEW TEAM CARD (Logo + Generated Image) --- */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl mx-2 mt-8 animate-slide-up" style={{ animationDelay: '600ms' }}>
                        {/* White Header with Logo */}
                        <div className="bg-white p-6 flex justify-center border-b border-gray-100">
                            <img src="/images/logo.png" alt="PowerTech Logo" className="h-12 object-contain" />
                        </div>

                        {/* Team Image */}
                        <div className="bg-gray-50 flex justify-center pt-0 overflow-hidden">
                            <img
                                src="/images/teams_working.png"
                                alt="PowerTech Team"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* --- Content Area --- */}
                <div className="bg-white relative px-6 py-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-50 transform translate-y-2">

                    {/* Quick Links */}
                    <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em] mb-4 pl-2">Liens Rapides</h3>
                    <div className="space-y-3 mb-8">
                        <ActionCard icon={<Calendar size={18} />} title="Rendez-vous" subtitle="Réserver un créneau" href={company.calendly} color="text-teal-600" bg="bg-teal-50" delay="400ms" />
                        <ActionCard icon={<Globe size={18} />} title="Site Internet" subtitle="Visiter powertech.com" href={company.website} color="text-indigo-600" bg="bg-indigo-50" delay="500ms" />
                        <ActionCard icon={<Linkedin size={18} />} title="LinkedIn" subtitle="Voir le profil complet" href={company.linkedin} color="text-blue-600" bg="bg-blue-50" delay="600ms" />
                        <ActionCard icon={<LayoutGrid size={18} />} title="Intranet" subtitle="Accès sécurisé" href="https://powertech-intranet-pro.vercel.app" color="text-orange-600" bg="bg-orange-50" delay="700ms" />
                    </div>

                    {/* --- QUI SOMMES-NOUS --- */}
                    <div className="bg-[#1c1c1c] rounded-3xl p-6 text-center mb-8 shadow-2xl animate-slide-up" style={{ animationDelay: '450ms' }}>
                        <h2 className="text-[#ea580c] text-xl font-serif tracking-widest uppercase mb-4">QUI SOMMES-NOUS ?</h2>
                        <div className="space-y-4">
                            <p className="text-gray-300 text-sm font-light leading-relaxed">
                                Cree en 2024 <span className="text-white font-medium">POWERTECH ENGINEERING GROUP</span> est une entreprise qui mène ses activités dans le domaine de l’exploitation et de la maintenance des centrales électriques (thermique et renouvelable), des tests, inspections et contrôle technique des équipements industriels, de la fournitures des équipements industriels et des pièces de rechange, de la maintenance des équipements maritimes, de la gestion des projets d’énergie et construction (EPC), de la consultance et de la formation pratique.
                            </p>
                            <p className="text-gray-300 text-sm font-light leading-relaxed border-t border-gray-700/50 pt-4">
                                Elle intervient dans les secteurs de l’énergie, de la mine, de l’industrie de la marine et du pétrole et gaz.
                            </p>
                        </div>
                    </div>

                    {/* Services Image */}
                    <div className="mb-8 animate-slide-up" style={{ animationDelay: '700ms' }}>
                        <div className="flex items-center justify-between mb-3 px-2">
                            <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">Expertise</h3>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200 border border-gray-100 group">
                            <img src="/images/services.png" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Nos Services" />
                        </div>
                    </div>

                    {/* Marketing Banners (Replaced Video) */}
                    <div className="grid grid-cols-2 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '750ms' }}>
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group aspect-square">
                            <img src="/images/6.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Project 1" />
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group aspect-square">
                            <img src="/images/7.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Project 2" />
                        </div>
                    </div>

                    {/* Marketing Banners */}
                    <div className="space-y-4 mb-8 animate-slide-up" style={{ animationDelay: '800ms' }}>
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
                    {/* --- NEW FOOTER CARDS --- */}
                    <div className="mt-12 space-y-4 pb-12 animate-slide-up" style={{ animationDelay: '1500ms' }}>
                        {/* Copyright Orange Card */}
                        <div className="bg-[#ea580c] rounded-[2.5rem] p-6 text-center shadow-xl">
                            <p className="text-white text-sm font-serif leading-tight tracking-wide">
                                © 2025 POWERTECH ENGINEERING GROUP All Rights Reserved powered by powertech
                            </p>
                        </div>

                        {/* SDG & Partner Logo Black Card */}
                        <div className="bg-[#1c1c1c] rounded-[2.5rem] p-4 flex items-center justify-between shadow-xl">
                            <div className="w-20 h-20 shrink-0">
                                <img src="/images/sdg_wheel.png" alt="SDGs" className="w-full h-full object-contain" />
                            </div>
                            <div className="bg-white p-3 rounded-2xl ml-4 flex-1 flex justify-center items-center h-16">
                                <img src="/images/logo.png" alt="Powertech Logo" className="h-full object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Footer Socials (Moved) */}
                    <div className="flex justify-center gap-4 pt-4 border-t border-gray-100 animate-slide-up" style={{ animationDelay: '1600ms' }}>
                        {[
                            { icon: <Instagram size={18} />, href: company.socials.instagram },
                            { icon: <Linkedin size={18} />, href: company.socials.linkedin },
                            { icon: <Facebook size={18} />, href: company.socials.facebook },
                        ].map((social, i) => (
                            <a key={i} href={social.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-[8px] font-black text-gray-200 uppercase tracking-widest">Innovation • Excellence • Integrity</p>
                    </div>

                </div>
            </div>

            {/* --- Fixed Bottom Dock --- */}
            <div className="fixed bottom-0 left-0 right-0 p-4 z-50 flex justify-center pointer-events-none">
                <div className="w-full max-w-[400px] flex justify-between items-end gap-3 pointer-events-auto">
                    {/* Left: QR & Share (small ones) */}
                    <div className="flex gap-3 pb-0">
                        <button className="w-12 h-12 bg-[#ea580c] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-900/20 hover:bg-orange-600 active:scale-95 transition-all">
                            {/* Placeholder QR Link */}
                            <QrCode size={22} />
                        </button>
                        <button onClick={() => setShowShare(!showShare)} className="w-12 h-12 bg-[#ea580c] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-900/20 hover:bg-orange-600 active:scale-95 transition-all">
                            <Share2 size={22} />
                        </button>
                    </div>

                    {/* Right: Add Contact (Large Pill) */}
                    <button onClick={handleSaveContact} className="bg-[#ea580c] h-11 rounded-[2rem] pl-5 pr-1.5 shadow-xl shadow-orange-900/20 flex items-center gap-3 text-white hover:bg-orange-600 active:scale-95 transition-all">
                        <span className="font-bold text-[10px] uppercase tracking-wider">Ajouter Contact</span>
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#ea580c]">
                            <Plus size={18} strokeWidth={3} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Share Sheet Modal (Simple) */}
            {showShare && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowShare(false)}>
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Partager le profil</h3>
                        <div className="grid grid-cols-4 gap-4">
                            <button onClick={async () => {
                                if (navigator.share) {
                                    await navigator.share({
                                        title: employee.full_name,
                                        text: `Découvrez le profil de ${employee.full_name}`,
                                        url: window.location.href
                                    });
                                }
                            }} className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Share2 size={20} /></div>
                                <span className="text-xs">System</span>
                            </button>
                            <button onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert("Lien copié !");
                            }} className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center"><Briefcase size={20} /></div>
                                <span className="text-xs">Copier</span>
                            </button>
                        </div>
                        <button onClick={() => setShowShare(false)} className="mt-6 w-full py-3 bg-gray-100 rounded-xl font-bold text-gray-600">Fermer</button>
                    </div>
                </div>
            )}

        </div>
    );
};

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
);

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
);

export default BusinessCard;
