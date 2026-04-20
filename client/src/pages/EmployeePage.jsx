import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BusinessCard from '../components/BusinessCard';

const EmployeePage = () => {
    const { slug } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSplash, setShowSplash] = useState(true);

    // Full Company Data with Images and Logo
    const companyData = {
        name: "PowerTech Engineering Group",
        address: "Cité Tawfekh, Villa 102, sortie 9, Autoroute à péage",
        logo_url: "https://ui-avatars.com/api/?name=P+E&background=0f172a&color=3b82f6&size=128&bold=true&length=2", // Placeholder Logo
        maps_link: "https://maps.google.com/?q=PowerTech+Engineering+Services+Dakar",
        website: "https://power-techservices.com",
        calendly: "https://calendly.com",
        linkedin: "https://linkedin.com/company/powertech",

        formatted_address: {
            line1: "Cité Tawfekh",
            line2: "Villa 102, sortie 9",
            line3: "Autoroute à péage"
        },

        // Industry Images (Embedded SVGs to guarantee display without internet/external blocking)
        images: [
            // OIL & GAS
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23ea580c'/%3E%3Ctext x='400' y='300' font-family='sans-serif' font-weight='bold' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3EOIL %26 GAS%3C/text%3E%3Cpath d='M200 450 L300 450 L300 250 L400 250 L400 450 L600 450' stroke='white' stroke-width='10' fill='none' opacity='0.5'/%3E%3C/svg%3E",

            // MINE
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%231e293b'/%3E%3Ctext x='400' y='300' font-family='sans-serif' font-weight='bold' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3EMINE%3C/text%3E%3Cpath d='M200 400 L400 200 L600 400' stroke='white' stroke-width='10' fill='none' opacity='0.5'/%3E%3C/svg%3E",

            // INDUSTRIE
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%231d4ed8'/%3E%3Ctext x='400' y='300' font-family='sans-serif' font-weight='bold' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3EINDUSTRIE%3C/text%3E%3Crect x='200' y='250' width='100' height='200' fill='white' opacity='0.3'/%3E%3Crect x='350' y='150' width='100' height='300' fill='white' opacity='0.3'/%3E%3C/svg%3E",

            // ÉNERGIE
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23ca8a04'/%3E%3Ctext x='400' y='300' font-family='sans-serif' font-weight='bold' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3EÉNERGIE%3C/text%3E%3Cpath d='M400 100 L450 300 L350 300 L400 500' stroke='white' stroke-width='10' fill='none'/%3E%3C/svg%3E"
        ],

        suppliers_url: "https://power-techservices.com/fournisseurs/",
        qhse_url: "https://power-techservices.com/qshe/",
        careers_url: "https://power-techservices.com/carriere/",
        projects_url: "https://power-techservices.com/projets/",

        socials: {
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com",
            x: "https://x.com",
            facebook: "https://facebook.com",
            youtube: "https://youtube.com"
        }
    };

    useEffect(() => {
        // Splash Screen Timer (Set to 2s as requested)
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);

        const fetchEmployee = async () => {
            // 1. Initial Local Data (Instant display)
            let localData = null;
            if (slug === 'fama-diaw') {
                localData = {
                    full_name: 'FAMA DIAW',
                    position: 'Responsable Achat et Logistique',
                    phone: '+221 78 659 02 95',
                    email: 'fama.diaw@power-techservices.com',
                    photo_url: '/images/fama.jpeg',
                    linkedin_personal: 'https://linkedin.com/in/fama-diaw'
                };
            } else if (slug === 'souleymane-sall') {
                localData = {
                    full_name: 'SOULEYMANE SALL',
                    position: 'Developpeur',
                    phone: '+221 77 755 68 99',
                    email: 'souleymane.sall@power-techservices.com',
                    photo_url: '/images/souleymane_profile.png',
                    linkedin_personal: 'https://linkedin.com/'
                };
            } else if (slug === 'powertech-digital-cards') {
                localData = {
                    full_name: 'PowerTech',
                    position: 'Digital Cards',
                    phone: '',
                    email: 'contact@power-techservices.com',
                    photo_url: '/images/logo.png',
                    linkedin_personal: 'https://linkedin.com/company/powertech'
                };
            } else if (slug === 'mame-ngone-sy') {
                localData = {
                    full_name: 'MAME NGONÉ SY',
                    position: 'Technical Sales Engineer',
                    phone: '+221 76 624 89 75',
                    email: 'sales2@power-techservices.com',
                    photo_url: '/images/Ngoné.jpeg',
                    linkedin_personal: 'https://linkedin.com/'
                };
            } else if (slug === 'oulimata-cissokho') {
                localData = {
                    full_name: 'OULIMATA CISSOKHO',
                    position: 'Technical Sales Engineer',
                    phone: '+221 76 624 89 85',
                    email: 'sales3@power-techservices.com',
                    photo_url: '/images/oulimata.jpeg',
                    linkedin_personal: 'https://linkedin.com/'
                };
            } else if (slug === 'yara-coulibaly') {
                localData = {
                    full_name: 'YARA GORGUI COULIBALY KADAM',
                    position: 'Gestionnaire de stock et logisticien',
                    phone: '+221 77 628 88 75',
                    email: 'yara.coulibaly@power-techservices.com',
                    photo_url: '/images/gorgui.jpeg',
                    linkedin_personal: 'https://linkedin.com/'
                };
            } else if (slug === 'rabyatou-diallo') {
                localData = {
                    full_name: 'RABYATOU DIALLO',
                    position: 'Responsable Ressources Humaines',
                    phone: '+221 76 622 35 09',
                    email: 'rabyatou.diallo@power-techservices.com',
                    photo_url: '/images/rabyatou.jpg',
                    linkedin_personal: 'https://linkedin.com/'
                };
            }

            if (localData) {
                setEmployee(localData);
                setLoading(false);
            }

            // 2. Background Backend Sync
            try {
                const response = await axios.get(`https://qr-code-a0un.onrender.com/api/employees/${slug}`);
                if (response.data && response.data.full_name) {
                    const empData = response.data;
                    // Keep local photo override if needed
                    if (slug === 'fama-diaw') empData.photo_url = '/images/fama.jpeg';
                    if (slug === 'souleymane-sall') empData.photo_url = '/images/souleymane_profile.png';
                    if (slug === 'powertech-digital-cards') empData.photo_url = '/images/logo.png';
                    if (slug === 'mame-ngone-sy') empData.photo_url = '/images/Ngoné.jpeg';
                    if (slug === 'oulimata-cissokho') empData.photo_url = '/images/oulimata.jpeg';
                    if (slug === 'yara-coulibaly') empData.photo_url = '/images/gorgui.jpeg';
                    if (slug === 'rabyatou-diallo') empData.photo_url = '/images/rabyatou.jpg';

                    setEmployee(empData);
                }
            } catch (e) {
                console.warn("Backend fetch failed/timed out, using local data.");
                if (!localData) setError("Error loading profile");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
        return () => clearTimeout(timer);
    }, [slug]);

    if (showSplash) {
        return (
            <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center animate-fade-in">
                <div className="w-32 animate-bounce">
                    <img src="/images/logo.png" alt="PowerTech Logo" className="w-full object-contain" />
                </div>
                <div className="mt-8 flex gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-3 h-3 bg-blue-900 rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-300"></div>
                </div>
            </div>
        );
    }

    if (loading) return <div className="h-screen flex items-center justify-center text-blue-900 font-bold tracking-widest animate-pulse">POWERTECH...</div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;

    return <BusinessCard employee={employee} company={companyData} />;
};

export default EmployeePage;
