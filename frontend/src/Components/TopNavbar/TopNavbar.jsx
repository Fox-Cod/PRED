import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { logout } from "../../Config/api/userAPI";
import { Context } from "../../Config/contexts/context";
import { ToastContainer } from 'react-toastify';
import { API_URL } from "../../Config/api";

export const TopNav = observer(() => {
    const { user } = useContext(Context);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);

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

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setIsNotificationOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="rounded-[1.3rem] top-bar-boxed relative z-[51] bg-primary ">
                <ToastContainer />
                <div className="flex h-full items-center">
                    <Link to="/" className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-3d"><path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2" /><path d="m15.194 13.707 3.814 1.86-1.86 3.814" /><path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4" /></svg>
                        <span className="ml-3 text-lg text-white"> EduShare </span>
                    </Link>

                    <nav aria-label="breadcrumb" className="flex -intro-x mr-auto h-full border-white/[0.08] md:ml-10 md:border-l md:pl-10" >
                    </nav>

                    {user.isAuth ? (
                        <div className="space-x-4 flex items-center">
                            {/* <div className="relative  " ref={notificationRef}>

                                <div
                                    className="flex items-center justify-center cursor-pointer relative block text-white/70 outline-none before:absolute before:right-0 before:top-[-2px] before:h-[8px] before:w-[8px] before:rounded-full before:bg-danger"
                                    onClick={toggleNotification}
                                >
                                    <svg className="hover:stroke-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                                    </svg>
                                </div>


                                <div
                                    className={`absolute right-0 mt-2 w-[280px] sm:w-[350px] rounded-md border-transparent bg-white shadow-[0px_3px_10px_#00000017] p-5 transform transition-all duration-300 ease-in-out 
                                    ${isNotificationOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible pointer-events-none'}`}
                                >
                                    <div className="font-medium mb-5">Notifications</div>
                                    <div className="cursor-pointer relative flex items-center">
                                        <div className="image-fit relative mr-1 h-12 w-12 flex-none">
                                            <img className="rounded-full" src="dist/images/fakers/profile-13.jpg" alt="Midone Tailwind HTML Admin Template" />
                                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success dark:border-darkmode-600">
                                            </div>
                                        </div>
                                        <div className="ml-2 overflow-hidden">
                                            <div className="flex items-center">
                                                <a className="mr-5 truncate font-medium" href="">
                                                    Christian Bale
                                                </a>
                                                <div className="ml-auto whitespace-nowrap text-xs text-slate-400">
                                                    05:09 AM
                                                </div>
                                            </div>
                                            <div className="mt-0.5 w-full truncate text-slate-500">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="relative" ref={dropdownRef}>
                                <div className="flex items-center cursor-pointer transition duration-200 ease-in-out bg-gray-100 hover:bg-gray-200 hover:text-gray-800 rounded-lg py-1 px-3 " onClick={toggleDropdown}>
                                    <div className="flex items-center justify-center bg-gray-400 text-white font-bold w-8 h-8 rounded-full">
                                        {user?.profile?.photo && user?.profile?.photo ? (<img src={`${API_URL}/${user?.profile?.photo}`} alt="Img" className="w-8 h-8 rounded-full" />) : (<div classNspaname="rounded-full-black">{user.profile.name?.slice(0, 1).toUpperCase()}</div>)}
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-bold">{user.profile.role === "utilizador" ? "Pessoal" : "Administrador"}</div>
                                        <div className="text-xs text-gray-500">{user.profile.name}</div>
                                    </div>
                                    <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                                <div
                                    className={`absolute right-0 mt-2 w-56 rounded-md border border-gray-100 shadow-lg bg-white p-2 transform transition-all duration-300 ease-in-out 
                                    ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                                >
                                    <div className="ml-3 p-2">
                                        <div className="font-medium">{user.profile.name}</div>
                                        <div>{user.profile.email}</div>
                                    </div>
                                    <div className="h-px my-2 bg-black/[0.08]"></div>
                                    <Link to="/user-profile" className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        <span className="ml-2">Profile</span>
                                    </Link>
                                    <Link to="/update-profile" className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dark:bg-darkmode-600 dark:hover:bg-darkmode-400 dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                        <span className="ml-2">Definições da conta</span>
                                    </Link>
                                    <Link to="/chat" className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-200/60 dropdown-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                        <span className="ml-2">Conversa</span>
                                    </Link>
                                    <div className="h-px my-2 bg-black/[0.08]"></div>
                                    <Link className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out rounded-md hover:bg-slate-300/60 dropdown-item" onClick={handleLogout}>
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
            </div>
        </>
    );
});
