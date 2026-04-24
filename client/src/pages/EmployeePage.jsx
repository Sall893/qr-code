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
        maps_link: "https://www.google.com/maps/place/Station+Eydon+-+Zac+Mbao/@14.7421693,-17.2872302,390m/data=!3m1!1e3!4m14!1m7!3m6!1s0xec1a0003e8080b1:0x76ec1ca3168cd8ca!2sStation+Eydon+-+Zac+Mbao!8m2!3d14.7427737!4d-17.2886201!16s%2Fg%2F11c5btp0xj!3m5!1s0xec1a0003e8080b1:0x76ec1ca3168cd8ca!8m2!3d14.7427737!4d-17.2886201!16s%2Fg%2F11c5btp0xj?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D",
        website: "https://power-techservices.com",
        calendly: "https://calendly.com",
        linkedin: "https://www.linkedin.com/company/powertech-engineering-group/",

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
            instagram: "https://www.instagram.com/powertech975?igsh=NWFpcXgxdDJsOG41&utm_source=qr",
            linkedin: "https://www.linkedin.com/company/powertech-engineering-group/",
            facebook: "https://www.facebook.com/share/1SZMJ8mxgW/?mibextid=wwXIfr"
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
                    linkedin_personal: 'https://www.linkedin.com/in/fama-diaw-2650b6297/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Br2PFl4xZRV%2BSKNYeLWAwTA%3D%3D'
                };
            } else if (slug === 'souleymane-sall') {
                localData = {
                    full_name: 'SOULEYMANE SALL',
                    position: 'Developpeur',
                    phone: '+221 77 755 68 99',
                    email: 'souleymane.sall@power-techservices.com',
                    photo_url: '/images/souleymane_profile.png',
                    linkedin_personal: 'https://www.linkedin.com/in/souleymane-sall-b0312a298?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
                };
            } else if (slug === 'powertech-digital-cards') {
                localData = {
                    full_name: 'PowerTech',
                    position: 'Digital Cards',
                    phone: '',
                    email: 'contact@power-techservices.com',
                    photo_url: '/images/logo.png',
                    linkedin_personal: 'https://www.linkedin.com/company/powertech-engineering-group/'
                };
            } else if (slug === 'mame-ngone-sy') {
                localData = {
                    full_name: 'MAME NGONÉ SY',
                    position: 'Technical Sales Engineer',
                    phone: '+221 76 624 89 75',
                    email: 'sales2@power-techservices.com',
                    photo_url: '/images/ngone 2.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/mame-ngoné-sy-aaa9a91b7?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
                };
            } else if (slug === 'oulimata-cissokho') {
                localData = {
                    full_name: 'OULIMATA BA',
                    position: 'Technical Sales Engineer',
                    phone: '+221 76 624 89 85',
                    email: 'sales3@power-techservices.com',
                    photo_url: '/images/oulimata.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/ndeye-oulimata-ba-27927b8a/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BL5rdPmZWT0mwj58EpZJgCg%3D%3D'
                };
            } else if (slug === 'yara-coulibaly') {
                localData = {
                    full_name: 'YARA GORGUI COULIBALY KADAM',
                    position: 'Responsable de stock et logistique',
                    phone: '+221 77 628 88 75',
                    email: 'yara.coulibaly@power-techservices.com',
                    photo_url: '/images/gorgui.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/y-gorgui-coulibaly-kadam-60b025277?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
                };
            } else if (slug === 'rabyatou-diallo') {
                localData = {
                    full_name: 'RABYATOU DIALLO',
                    position: 'Responsable Ressources Humaines',
                    phone: '+221 76 622 35 09',
                    email: 'rabyatou.diallo@power-techservices.com',
                    photo_url: '/images/rabyatou.jpg',
                    linkedin_personal: 'https://www.linkedin.com/in/rabyatou-malado-diallo-870245218?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
                };
            } else if (slug === 'mariama-tine') {
                localData = {
                    full_name: 'MARIAMA TINE',
                    position: 'Secrétaire d\'administration',
                    phone: '+221 77 124 34 55',
                    email: 'mariama.tine@power-techservices.com',
                    photo_url: '/images/mariama.jpeg',
                    linkedin_personal: 'https://linkedin.com/'
                };
            } else if (slug === 'houleye-sy') {
                localData = {
                    full_name: 'HOULEYE SY',
                    position: 'Responsable Marketing & Communication Relations clients & RSE',
                    phone: '+221 76 624 90 04',
                    email: 'houleyesy@power-techservices.com',
                    photo_url: '/images/houleye.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/houleyesy?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
                };
            } else if (slug === 'oumy-mboup') {
                localData = {
                    full_name: 'OUMY MBOUP',
                    position: 'Sales & Tender Manager',
                    phone: '+221 78 822 85 85',
                    email: 'oumy.mboup@power-techservices.com',
                    photo_url: '/images/oumy.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/oumy-mboup'
                };
            } else if (slug === 'mame-diarra-sagne') {
                localData = {
                    full_name: 'MAME DIARRA SAGNE',
                    position: 'Comptable/Admin',
                    phone: '+221 76 622 21 84',
                    email: 'msagne@power-techservices.com',
                    photo_url: '/images/Mame diarra.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/mame-diarra-sagne-8a6486192?utm_source=share_via&utm_content=profile&utm_medium=member_android'
                };
            } else if (slug === 'ibrahima-sene') {
                localData = {
                    full_name: 'IBRAHIMA SENE',
                    position: 'Superviseur Planificateur des Travaux',
                    phone: '+221 76 622 24 16',
                    email: 'ibrahima.sene@power-techservices.com',
                    photo_url: '/images/ibrahima.PNG',
                    linkedin_personal: 'https://www.linkedin.com/in/ibrahima-sene-630737232'
                };
            } else if (slug === 'kine-gueye-sambe') {
                localData = {
                    full_name: 'KINÉ GUEYE SAMBE',
                    position: 'Stagiaire génie civil',
                    phone: '+221 77 238 51 64',
                    email: 'kine.sambe@power-techservices.com',
                    photo_url: '/images/sambe.png',
                    linkedin_personal: 'https://www.linkedin.com/in/kine-gueye-sambe?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
                };
            } else if (slug === 'ngone-thiam') {
                localData = {
                    full_name: 'NGONÉ THIAM',
                    position: 'Responsable qualité et suivi garantie',
                    phone: '+221 77 445 89 81',
                    email: 'ngone.thiam@power-techservices.com',
                    photo_url: '/images/ngone.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/ngone-thiam-7a334a337?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
                };
            } else if (slug === 'abdoul-aziz-fall') {
                localData = {
                    full_name: 'ABDOUL AZIZ FALL',
                    position: 'ingénieur technico-commercial et bureau d’etude',
                    segment: 'Mine, industrie, Oil & gas',
                    phone: '+221 76 624 89 91',
                    email: 'sales1@power-techservices.com',
                    photo_url: '/images/abdoul 2.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/abdoul-aziz-fall-663b31232?utm_source=share_via&utm_content=profile&utm_medium=member_android'
                };
            } else if (slug === 'anta-gaye') {
                localData = {
                    full_name: 'ANTA GAYE',
                    position: 'QSHE & Certification Coordinator',
                    phone: '+221 76 624 89 65',
                    email: 'anta.gaye@power-techservices.com',
                    photo_url: '/images/anta 2.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/anta-gaye/en'
                };
            } else if (slug === 'mademba-thiam') {
                localData = {
                    full_name: 'MADEMBA THIAM',
                    position: 'Chief Executive Officier Energy EPC Project Expert,PMP',
                    phone: '+221 77 643 20 30',
                    email: 'mademba.thiam@power-techservices.com',
                    photo_url: '/images/mademba.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/mademba-thiam-26355486?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
                };
            } else if (slug === 'papa-dethie-thiam') {
                localData = {
                    full_name: 'PAPA DETHIE THIAM',
                    position: 'Infographiste / designer',
                    phone: '+221 76 227 12 12',
                    email: 'dethie.thiam@power-techservices.com',
                    photo_url: '/images/dethie.jpeg',
                    linkedin_personal: 'https://www.linkedin.com/in/papa-dethie-thiam-267395211/'
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
                    if (slug === 'fama-diaw') {
                        empData.photo_url = '/images/fama.jpeg';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/fama-diaw-2650b6297/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3Br2PFl4xZRV%2BSKNYeLWAwTA%3D%3D';
                    }
                    if (slug === 'souleymane-sall') {
                        empData.photo_url = '/images/souleymane_profile.png';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/souleymane-sall-b0312a298?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
                    }
                    if (slug === 'powertech-digital-cards') {
                        empData.photo_url = '/images/logo.png';
                        empData.linkedin_personal = 'https://www.linkedin.com/company/powertech-engineering-group/';
                    }
                    if (slug === 'mame-ngone-sy') {
                        empData.photo_url = '/images/ngone 2.jpeg';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/mame-ngoné-sy-aaa9a91b7?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
                    }
                    if (slug === 'oulimata-cissokho') {
                        empData.photo_url = '/images/oulimata.jpeg';
                        empData.full_name = 'OULIMATA BA';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/ndeye-oulimata-ba-27927b8a/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BL5rdPmZWT0mwj58EpZJgCg%3D%3D';
                    }
                    if (slug === 'yara-coulibaly') {
                        empData.photo_url = '/images/gorgui.jpeg';
                        empData.position = 'Responsable de stock et logistique';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/y-gorgui-coulibaly-kadam-60b025277?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
                    }
                    if (slug === 'rabyatou-diallo') {
                        empData.photo_url = '/images/rabyatou.jpg';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/rabyatou-malado-diallo-870245218?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
                    }
                    if (slug === 'mariama-tine') empData.photo_url = '/images/mariama.jpeg';
                    if (slug === 'houleye-sy') {
                        empData.photo_url = '/images/houleye.jpeg';
                        empData.phone = '+221 76 624 90 04';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/houleyesy?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
                    }
                    if (slug === 'oumy-mboup') {
                        empData.photo_url = '/images/oumy.jpeg';
                        empData.phone = '+221 78 822 85 85';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/oumy-mboup';
                    }
                    if (slug === 'mame-diarra-sagne') {
                        empData.photo_url = '/images/Mame diarra.jpeg';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/mame-diarra-sagne-8a6486192?utm_source=share_via&utm_content=profile&utm_medium=member_android';
                    }
                    if (slug === 'ibrahima-sene') {
                        empData.photo_url = '/images/ibrahima.PNG';
                        empData.phone = '+221 76 622 24 16';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/ibrahima-sene-630737232';
                    }
                    if (slug === 'kine-gueye-sambe') {
                        empData.photo_url = '/images/sambe.png';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/kine-gueye-sambe?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
                    }
                    if (slug === 'ngone-thiam') {
                        empData.photo_url = '/images/ngone.jpeg';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/ngone-thiam-7a334a337?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
                    }
                    if (slug === 'abdoul-aziz-fall') {
                        empData.photo_url = '/images/abdoul 2.jpeg';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/abdoul-aziz-fall-663b31232?utm_source=share_via&utm_content=profile&utm_medium=member_android';
                    }
                    if (slug === 'anta-gaye') {
                        empData.photo_url = '/images/anta 2.jpeg';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/anta-gaye/en';
                    }
                    if (slug === 'mademba-thiam') {
                        empData.photo_url = '/images/mademba.jpeg';
                        empData.position = 'Chief Executive Officier Energy EPC Project Expert,PMP';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/mademba-thiam-26355486?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
                    }
                    if (slug === 'papa-dethie-thiam') {
                        empData.photo_url = '/images/dethie.jpeg';
                        empData.linkedin_personal = 'https://www.linkedin.com/in/papa-dethie-thiam-267395211/';
                    }

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
