import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Config/contexts/context";
import { API_URL } from "../../Config/api";

export const HomeNavbar = () => {
    const { user } = useContext(Context);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            window.location.href = '/';
        } catch (err) {
            console.error(err);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-transparent absolute top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between relative p-4">

                <div className="flex-shrink-0">
                    <Link to="/" className="text-white text-2xl font-bold hidden md:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-3d">
                            <path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2" />
                            <path d="m15.194 13.707 3.814 1.86-1.86 3.814" />
                            <path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4" />
                        </svg>
                        <span className="ml-3 text-lg text-white">EduShare</span>
                    </Link>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-8">
                        <Link to="/updates" className="text-white hover:text-gray-300">
                            Notícias
                        </Link>
                        <Link to="/form" className="text-white hover:text-gray-300">
                            Fórum
                        </Link>
                        <Link to="/contacts" className="text-white hover:text-gray-300">
                            Contactos
                        </Link>
                    </div>
                </div>

                {user.isAuth ? (
                    <div className="space-x-4">
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={toggleDropdown} aria-expanded={isDropdownOpen} className="bg-gray-400 font-bold text-white cursor-pointer image-fit zoom-in intro-x block h-8 w-8 scale-110 overflow-hidden rounded-full shadow-lg" >
                                {user?.profile?.photo && user?.profile?.photo ? (<img src={`${API_URL}/${user?.profile?.photo}`} alt="Img" className="h-8 w-8 rouded-full" />) : (<div classNspaname="rounded-full-black">{user.profile.name?.slice(0, 1).toUpperCase()}</div>)}
                            </button>
                            <div
                                className={`absolute right-0 mt-2 w-56 rounded-md border border-gray-100 shadow-lg bg-white p-2 transform transition-all duration-300 ease-in-out 
                                    ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                            >
                                <div className="ml-3 p-2">
                                    <div className="font-medium">{user.profile.name}</div>
                                    <div>{user.profile.email}</div>
                                </div>
                                <div className="h-px my-2 bg-black/[0.08]"></div>
                                <Link to="/user-profile" className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    <span className="ml-2">Profile</span>
                                </Link>
                                <Link to="/update-profile" className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                                    <span className="ml-2">Definições da conta</span>
                                </Link>
                                <Link to="/chat" className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                                    <span className="ml-2">Conversa</span>
                                </Link>
                                <div className="h-px my-2 bg-white/[0.08]"></div>
                                <Link className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item" onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                                    <span className="ml-2">Sair</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link to="/sign-in" className="text-white hover:text-gray-300">
                            Entrar
                        </Link>
                        <Link to="/sign-up" className="border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer text-white bg-dark border-dark w-24 truncate">
                            Registo
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}