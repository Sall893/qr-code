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
        name: "PowerTech Engineering Services",
        address: "Immeuble Rassoul, Cite Thianar Ndoye Rond point Sipres, ZAC Mbao BP 20000 Rufisque, Dakar SÉNÉGAL",
        logo_url: "https://ui-avatars.com/api/?name=P+E&background=0f172a&color=3b82f6&size=128&bold=true&length=2", // Placeholder Logo
        maps_link: "https://maps.google.com/?q=PowerTech+Engineering+Services+Dakar",
        website: "https://power-techservices.com",
        calendly: "https://calendly.com",
        linkedin: "https://linkedin.com/company/powertech",

        formatted_address: {
            line1: "Immeuble Rassoul, Cite Thianar Ndoye",
            line2: "Rond point Sipres, ZAC Mbao",
            line3: "BP 20000 Rufisque, Dakar SÉNÉGAL"
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
        // Splash Screen Timer
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        const fetchEmployee = async () => {
            try {
                let empData;
                try {
                    // Backend fetch
                    const response = await axios.get(`http://localhost:5000/api/employees/${slug}`);
                    empData = response.data;
                } catch (e) {
                    console.warn("Backend fetch failed, using fallback");
                }

                // Fallback Data
                if ((!empData || !empData.full_name) && slug === 'fama-diaw') {
                    empData = {
                        full_name: 'FAMA DIAW',
                        position: 'Executive Assistant et procurement coordinateur',
                        phone: '+221 78 659 02 95',
                        email: 'fama.diaw@power-techservices.com',
                        // Using real uploaded photo
                        photo_url: '/images/fama_profile.jpg',
                        linkedin_personal: 'https://linkedin.com/in/fama-diaw'
                    };
                } else if ((!empData || !empData.full_name) && slug === 'souleymane-sall') {
                    empData = {
                        full_name: 'SOULEYMANE SALL',
                        position: 'Developpeur',
                        phone: '+221 77 755 68 99',
                        email: 'souleymane.sall@power-techservices.com',
                        // Specific photo
                        photo_url: '/images/souleymane_profile.png',
                        linkedin_personal: 'https://linkedin.com/'
                    };
                }

                if (empData) {
                    // FORCE LOCAL IMAGE OVERRIDE to ensure they display
                    if (slug === 'fama-diaw') {
                        empData.photo_url = '/images/fama_profile_v2.png';
                    }
                    if (slug === 'souleymane-sall') {
                        empData.photo_url = '/images/souleymane_profile.png';
                    }
                    setEmployee(empData);
                } else {
                    setError("Employee Not Found");
                }

            } catch (err) {
                setError("Error loading profile");
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
