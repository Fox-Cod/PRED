import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserChats, getMessages, sendMessage } from "../../Config/api/deviceAPI";
import { API_URL } from "../../Config/api";
import { Context } from "../../Config/contexts/context";
import { io } from 'socket.io-client';

const socket = io({ API_URL });

export const getTimeAgo = (date) => {
    const now = new Date();
    const publishDate = new Date(date);

    const seconds = Math.floor((now - publishDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds} segundo(s) atrás`;
    } else if (minutes < 60) {
        return `${minutes} minuto(s) atrás`;
    } else if (hours < 24) {
        return `${hours} hora(s) atrás`;
    } else if (days < 7) {
        return `${days} dia(s) atrás`;
    } else if (weeks < 5) {
        return `${weeks} semana(s) atrás`;
    } else if (months < 12) {
        return `${months} mês(es) atrás`;
    } else {
        return `${years} ano(s) atrás`;
    }
};

const SortTime = ({ date }) => {
    return (
        <span>{getTimeAgo(date)}</span>
    );
};

export default SortTime;

export const ServerError = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/');
    };

    const handleImmunity = () => {
        const tenMinutesFromNow = new Date(new Date().getTime() + 10 * 60000).toISOString();
        Cookies.set('immunity', 'true', { expires: new Date(tenMinutesFromNow) });
        alert('Imunidade ativada! Você pode navegar pelo site sem problemas por 10 minutos.');
    };

    return (
        <div className="md:max-w-auto min-h-screen min-w-0 max-w-full flex-1 rounded-[1.3rem] bg-slate-100 px-4 pb-10 shadow-sm before:block before:h-px before:w-full before:content-[''] dark:bg-darkmode-700 md:px-[22px]">
            <div className="flex items-center justify-center p-9">
                <div className="text-center p-6">
                    <h1 className="text-2xl text-red-500 mb-4">Sem resposta do servidor</h1>
                    <p className="mb-4">Parece que não conseguimos conectar ao servidor. Verifique sua conexão e tente novamente mais tarde.</p>
                    <details className="mb-4">
                        <summary className="cursor-pointer">Algumas soluções para este problema</summary>
                        <span className="font-bold">1. Recarregar a aplicação ou a página</span> - pode ajudar a refrescar a ligação. <br />
                        <span className="font-bold">2. Verifique a ligação à Internet</span> - assegure-se de que está conectado à Internet. <br />
                        <span className="font-bold">3. Verifique as configurações do firewall</span> — elas podem estar a bloquear o acesso. <br />
                        <span className="font-extrabold">4. O servidor pode estar indisponível</span> - tente aceder mais tarde.
                    </details>
                    <button
                        onClick={handleRetry}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Tentar novamente
                    </button>
                    <p className="mt-4">Os nossos contactos: <span className="font-medium">predinc01@gmail.com</span><br /><span className="text-xs">SupportPRED 2024™</span></p>
                    <a
                        role="button"
                        onClick={handleImmunity}
                        className="mt-2 text-green-500 text-xs  hover:text-green-600 transition">
                        Pré-visualização do site
                    </a>
                </div>
            </div>
        </div>
    );
};

export const FormatFileSize = ({ bytes }) => {
    if (bytes === 0) return <span>0 Bytes</span>;

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, i)).toFixed(2);

    return <span>{`${size} ${sizes[i]}`}</span>;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const getPaginationNumbers = () => {
        const paginationNumbers = [];

        if (totalPages <= 3) {
            return pageNumbers;
        }

        if (currentPage === 1) {
            paginationNumbers.push(1, 2, 3);
        } else if (currentPage === totalPages) {
            paginationNumbers.push(totalPages - 2, totalPages - 1, totalPages);
        } else {
            paginationNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        }

        return paginationNumbers;
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <div className="flex justify-center items-center mt-4">
            <ul className="inline-flex space-x-1">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`border border-gray-100 p-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-300'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                </li>
                {paginationNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`border border-gray-100 px-3 py-1 pt-2 rounded-md ${currentPage === number ? 'bg-white text-dark' : 'hover:bg-gray-300'}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`border border-gray-100 p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-300'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export const ChatRoom = ({ chatToken }) => {
    const { user } = useContext(Context)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                console.log("Fetching messages for chatToken:", chatToken); 
                const response = await getMessages(chatToken);
                setMessages(response);
            } catch (err) {
                console.log("Error fetching messages:", err);
            }
        };

        if (chatToken) { 
            fetchMessages();
        } else {
            console.error("No chatToken provided");
        }
    }, [chatToken]);

    const idTeacher = user?.profile?.idTeacher

    // useEffect(() => {
    //     socket.on('receiveMessage', (newMessage) => {
    //         setMessages((prevMessages) => [...prevMessages, newMessage]);
    //     });

    //     return () => {
    //         socket.off('receiveMessage');
    //     };
    // }, []);

    // const sendMessage = async () => {
    //     if (message.trim()) {
    //         const messageData = {
    //             senderId: userId,
    //             receiverId: friendId,
    //             content: message,
    //             chatId: 4
    //         };

    //         socket.emit('sendMessage', messageData);

    //         try {
    //             await sendMessage(messageData);
    //             setMessages((prevMessages) => [...prevMessages, messageData]);
    //         } catch (error) {
    //             console.error("Failed to save message", error);
    //         }

    //         setMessage('');
    //     }
    // };

    return (
        <>
            <div className="scrollbar-hidden flex-1 overflow-y-scroll px-5 pt-5">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex max-w-[100%] items-end mb-2 ${msg.idSender === idTeacher ? "justify-end" : "justify-start"
                            }`}
                    >
                        {msg.idSender !== idTeacher && (
                            <div className="image-fit relative mr-5 hidden h-10 w-10 flex-none sm:block">

                            </div>
                        )}

                        <div
                            className={`px-4 py-3 rounded-t-md ${msg.senderId === idTeacher
                                ? "rounded-l-md bg-primary text-white"
                                : "rounded-r-md bg-slate-100 text-slate-500 dark:bg-darkmode-400"
                                }`}
                        >
                            <strong>{msg.senderId === idTeacher ? "Вы" : "Друг"}:</strong> {msg.message}
                            <div className="mt-1 text-xs text-opacity-80">

                            </div>
                        </div>

                        {msg.idSender === idTeacher && (
                            <div className="image-fit relative ml-5 hidden h-10 w-10 flex-none sm:block">

                            </div>
                        )}
                    </div>
                ))}
                <div className="clear-both" />
            </div>

            <div className="flex items-center border-t border-slate-200/60 pb-10 pt-4 dark:border-darkmode-400 sm:py-4">
                <textarea
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Messagem..."
                    className="w-full h-[46px] resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0 rounded-md text-sm placeholder:text-slate-400/90 dark:bg-darkmode-600"
                />
                <button onClick={sendMessage} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white sm:h-10 sm:w-10 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                        <path d="m21.854 2.147-10.94 10.939" />
                    </svg>
                </button>
            </div>
        </>
    );
};


